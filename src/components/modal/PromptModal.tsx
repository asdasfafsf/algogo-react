import { useState } from "react";
import { ClipboardList } from "lucide-react";
import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { DialogDescription } from "@components/ui/dialog";
import {
  ModalBody,
  ModalFooter,
  ModalSurface,
} from "@components/ui/modal-surface";
import {
  pasteTextWithFeedback,
  type ClipboardFeedback,
  type ClipboardReadText,
} from "@lib/clipboard";
import useExclusiveAsync from "@hook/useExclusiveAsync";
interface Props extends ModalComponentProps<string | boolean> {
  content: string;
  defaultValue?: string | boolean;
  title?: string;
  clipboardReader?: ClipboardReadText | null;
}
export default function PromptModal({
  title = "입력",
  defaultValue = "",
  content,
  resolve,
  clipboardReader,
}: Props) {
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const [pasteFeedback, setPasteFeedback] = useState<ClipboardFeedback | null>(
    null,
  );
  const { isPending: isPastePending, runExclusive } = useExclusiveAsync();
  const finish = (result: string | boolean) => resolve(result);
  const handlePaste = async () => {
    const attempt = await runExclusive(() =>
      pasteTextWithFeedback(clipboardReader),
    );
    if (!attempt.started) return;

    const result = attempt.value;
    if (result.status === "success") {
      setValue(result.value);
    }
    setPasteFeedback(result.feedback);
  };
  return (
    <ModalSurface
      open
      onOpenChange={(open) => {
        if (!open) finish(false);
      }}
      size="sm"
      title={title}
    >
      <ModalBody className="space-y-4">
        <DialogDescription className="break-words leading-6">
          {content}
        </DialogDescription>
        <div className="relative">
          <label htmlFor="prompt-value" className="sr-only">
            {title} 입력
          </label>
          <Input
            id="prompt-value"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                finish(value || defaultValue);
              }
            }}
            className="pr-10"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="클립보드에서 붙여넣기"
                  aria-busy={isPastePending}
                  disabled={isPastePending}
                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                  onClick={handlePaste}
                >
                  <ClipboardList />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPastePending ? "붙여넣는 중" : "붙여넣기"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {pasteFeedback ? (
          <p
            aria-live="polite"
            className={`text-sm ${
              pasteFeedback.variant === "success"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-destructive"
            }`}
          >
            {pasteFeedback.message}
          </p>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={() => finish(false)}>
          취소
        </Button>
        <Button onClick={() => finish(value || defaultValue)}>확인</Button>
      </ModalFooter>
    </ModalSurface>
  );
}
