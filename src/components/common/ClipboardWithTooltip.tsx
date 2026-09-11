import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Typography, Tooltip } from "@components/common/index";
import {
  Check,
  Copy,
  CornerDownLeft as EnterIcon,
  Space as SpaceIcon,
} from "lucide-react";
import { writeTextToClipboard, type ClipboardWriteText } from "@lib/clipboard";

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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  }, []);

  const resetFeedback = useCallback(() => {
    setCopyStatus("idle");
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
    clearFeedbackTimer();
    setCopyStatus("copying");

    try {
      await writeTextToClipboard(content, clipboardWriter);
      setCopyStatus("success");
      setTooltipOpen(true);
      scheduleFeedbackReset();
      void Promise.resolve()
        .then(() => handleCopyCallback(content))
        .catch(() => undefined);
    } catch {
      setCopyStatus("error");
      setTooltipOpen(true);
      scheduleFeedbackReset();
    }
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
    copyStatus === "success"
      ? "입출력 예시를 복사했습니다."
      : copyStatus === "error"
        ? "입출력 예시를 복사하지 못했습니다. 다시 시도해 주세요."
        : copyStatus === "copying"
          ? "입출력 예시를 복사하고 있습니다."
          : "";

  return (
    <>
      <Tooltip
        content={tooltipContent}
        open={tooltipOpen}
        onOpenChange={setTooltipOpen}
      >
        <Button
          variant="ghost"
          onClick={handleClick}
          aria-label={ariaLabel}
          aria-busy={copyStatus === "copying"}
          disabled={copyStatus === "copying"}
          className={`h-auto whitespace-normal flex justify-start items-center gap-x-3 px-4 py-2.5 w-full cursor-pointer focus:outline-hidden bg-black text-white border rounded-md ${className}`}
        >
          <div className="w-full">
            {content.split(/\r?\n/).map((elem, contentIndex, contentArr) => (
              <div
                key={`${elem}-${contentIndex}`}
                className="flex flex-wrap whitespace-normal wrap-break-word w-[calc(100%-10px)]"
              >
                {elem.split(" ").map((text, index, arr) => (
                  <React.Fragment key={`${text}-${index}`}>
                    <Typography
                      className="text-base text-white font-D2Coding"
                      variant="paragraph"
                    >
                      {text}
                    </Typography>

                    {index < arr.length - 1 ? (
                      <div className="flex items-center justify-center text-blue-500">
                        <SpaceIcon className="w-4 h-4 font-bold" />
                      </div>
                    ) : null}
                  </React.Fragment>
                ))}
                {contentIndex < contentArr.length - 1 ? (
                  <div className="flex items-center justify-center text-blue-500">
                    <EnterIcon className="w-4 h-4" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {copyStatus === "success" ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <Copy className="w-4 h-4 text-white" />
          )}
        </Button>
      </Tooltip>
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
    </>
  );
}
