import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { copyTextWithFeedback, type ClipboardWriteText } from "@lib/clipboard";
import useExclusiveAsync from "@hook/useExclusiveAsync";
import {
  analyzeSampleWhitespace,
  type SampleWhitespaceToken,
} from "@lib/sampleWhitespace";

const FEEDBACK_DURATION_MS = 2500;

type CopyStatus = "idle" | "copying" | "success" | "error";

interface ClipboardWithTooltipProps {
  content: string;
  handleCopyCallback?: (copied: string) => void | Promise<void>;
  className?: string; // 추가적인 Tailwind 클래스명을 전달받기 위한 props
  clipboardWriter?: ClipboardWriteText | null;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

function WhitespaceToken({ token }: { token: SampleWhitespaceToken }) {
  if (token.type === "text") {
    return token.value;
  }

  const marker = token.type === "space" ? "·" : "⇥";
  const className = token.trailing
    ? "inline-flex justify-center bg-amber-400/15 text-amber-300 underline decoration-amber-300/70 decoration-1 underline-offset-4"
    : "inline-flex justify-center text-sky-300";

  return (
    <span
      className={className}
      style={token.type === "tab" ? { width: `${token.width}ch` } : undefined}
    >
      {marker}
    </span>
  );
}

export default function ClipboardWithTooltip({
  content,
  handleCopyCallback = () => {},
  className = "",
  clipboardWriter,
  ariaLabel = "입출력 예시 복사",
  ariaDescribedBy,
}: ClipboardWithTooltipProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentDescriptionId = React.useId();
  const { isPending: isCopyPending, runExclusive } = useExclusiveAsync();
  const lines = analyzeSampleWhitespace(content);
  const describedBy = [ariaDescribedBy, contentDescriptionId]
    .filter(Boolean)
    .join(" ");

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  }, []);

  const resetFeedback = useCallback(() => {
    setCopyStatus("idle");
    setFeedbackMessage("");
    setTooltipOpen(false);
    feedbackTimerRef.current = null;
  }, []);

  const scheduleFeedbackReset = useCallback(() => {
    clearFeedbackTimer();
    feedbackTimerRef.current = setTimeout(resetFeedback, FEEDBACK_DURATION_MS);
  }, [clearFeedbackTimer, resetFeedback]);

  useEffect(
    () => () => {
      clearFeedbackTimer();
    },
    [clearFeedbackTimer],
  );

  const handleClick = async () => {
    const attempt = await runExclusive(async () => {
      clearFeedbackTimer();
      setCopyStatus("copying");
      return copyTextWithFeedback(content, clipboardWriter);
    });
    if (!attempt.started) return;

    const result = attempt.value;
    setFeedbackMessage(result.feedback.message);

    if (result.status === "success") {
      setCopyStatus("success");
      setTooltipOpen(true);
      scheduleFeedbackReset();
      void Promise.resolve()
        .then(() => handleCopyCallback(content))
        .catch(() => undefined);
      return;
    }

    setCopyStatus("error");
    setTooltipOpen(true);
    scheduleFeedbackReset();
  };

  const tooltipContent =
    copyStatus === "success"
      ? "복사됨"
      : copyStatus === "error"
        ? "복사 실패. 다시 시도해 주세요"
        : copyStatus === "copying"
          ? "복사 중"
          : "복사";

  const liveMessage =
    copyStatus === "copying"
      ? "입출력 예시를 복사하고 있습니다."
      : feedbackMessage;

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={handleClick}
              aria-label={ariaLabel}
              aria-describedby={describedBy}
              aria-busy={isCopyPending}
              disabled={isCopyPending}
              className={`relative block h-auto min-w-0 w-full cursor-pointer overflow-hidden whitespace-nowrap rounded-md border border-slate-800 bg-slate-950 p-0 text-slate-100 hover:bg-slate-900 hover:text-white focus-visible:ring-2 focus-visible:ring-ring ${className}`}
            >
              <span className="block w-full overflow-x-auto pr-11 text-left">
                <code
                  className="block min-w-max py-2 font-D2Coding text-sm leading-6 text-slate-100 sm:text-base"
                  aria-hidden="true"
                >
                  {lines.map((line) => (
                    <span
                      key={line.number}
                      className="grid min-w-full grid-cols-[2.75rem_max-content]"
                    >
                      <span className="sticky left-0 border-r border-slate-700/80 bg-slate-900 px-2 text-right text-xs leading-6 text-slate-400 select-none sm:text-sm">
                        {line.number}
                      </span>
                      <span className="min-w-max px-3">
                        {line.isEmpty ? (
                          <span className="text-slate-500 italic">빈 줄</span>
                        ) : (
                          line.tokens.map((token, index) => (
                            <WhitespaceToken
                              key={`${line.number}-${index}`}
                              token={token}
                            />
                          ))
                        )}
                        {line.hasLineBreak ? (
                          <span className="ml-1 text-sky-300">↵</span>
                        ) : null}
                      </span>
                    </span>
                  ))}
                </code>
              </span>
              <span className="pointer-events-none absolute top-2.5 right-2.5 inline-flex size-7 items-center justify-center rounded border border-slate-700 bg-slate-900/95 text-slate-200 shadow-sm">
                {copyStatus === "success" ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span id={contentDescriptionId} className="sr-only">
        원본 내용: {content.length > 0 ? content : "빈 문자열"}
      </span>
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
    </>
  );
}
