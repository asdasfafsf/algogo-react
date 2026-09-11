import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import {
  Check,
  Copy,
  CornerDownLeft as EnterIcon,
  Space as SpaceIcon,
} from "lucide-react";
import { copyTextWithFeedback, type ClipboardWriteText } from "@lib/clipboard";
import useExclusiveAsync from "@hook/useExclusiveAsync";

const FEEDBACK_DURATION_MS = 2500;

type CopyStatus = "idle" | "copying" | "success" | "error";

interface ClipboardWithTooltipProps {
  content: string;
  handleCopyCallback?: (copied: string) => void | Promise<void>;
  className?: string; // 추가적인 Tailwind 클래스명을 전달받기 위한 props
  clipboardWriter?: ClipboardWriteText | null;
  ariaLabel?: string;
}

export default function ClipboardWithTooltip({
  content,
  handleCopyCallback = () => {},
  className = "",
  clipboardWriter,
  ariaLabel = "입출력 예시 복사",
}: ClipboardWithTooltipProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isPending: isCopyPending, runExclusive } = useExclusiveAsync();

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
              aria-busy={isCopyPending}
              disabled={isCopyPending}
              className={`h-auto w-full cursor-pointer items-center justify-start gap-x-3 whitespace-normal rounded-md border bg-black px-4 py-2.5 text-white hover:bg-black/85 hover:text-white focus-visible:ring-2 focus-visible:ring-ring ${className}`}
            >
              <code className="w-full text-left text-base font-D2Coding text-white">
                {content.split(/\r?\n/).map((line, lineIndex, lines) => (
                  <span
                    key={`${line}-${lineIndex}`}
                    className="flex w-[calc(100%-10px)] flex-wrap items-center wrap-break-word"
                  >
                    {line.split(" ").map((text, index, words) => (
                      <React.Fragment key={`${text}-${index}`}>
                        <span>{text}</span>
                        {index < words.length - 1 ? (
                          <span className="inline-flex items-center justify-center text-blue-500">
                            <SpaceIcon className="size-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </React.Fragment>
                    ))}
                    {lineIndex < lines.length - 1 ? (
                      <span className="inline-flex items-center justify-center text-blue-500">
                        <EnterIcon className="size-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </span>
                ))}
              </code>
              {copyStatus === "success" ? (
                <Check className="size-4 text-white" aria-hidden="true" />
              ) : (
                <Copy className="size-4 text-white" aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
    </>
  );
}
