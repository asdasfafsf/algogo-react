import type { RefObject } from "react";
import { ClipboardPaste, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
interface CodeResultInputProps {
  inputTextAreaRef: RefObject<HTMLTextAreaElement | null>;
  input: string;
  onInputChange: (value: string) => void;
  onRun: () => void | Promise<void>;
  onPaste: () => void | Promise<void>;
}
export default function CodeResultInput({
  inputTextAreaRef,
  input,
  onInputChange,
  onRun,
  onPaste,
}: CodeResultInputProps) {
  return (
    <div className="flex h-full flex-col p-3">
      <nav
        aria-label="테스트 입력 도구"
        className="mb-2 flex items-center justify-between"
      >
        <span className="text-xs text-muted-foreground">표준 입력</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-emerald-600 dark:text-emerald-400"
            aria-label="입력으로 실행"
            onClick={onRun}
          >
            <Play />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label="입력 붙여넣기"
            onClick={onPaste}
          >
            <ClipboardPaste />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-destructive"
            aria-label="입력 지우기"
            onClick={() => onInputChange("")}
          >
            <Trash2 />
          </Button>
        </div>
      </nav>
      <Textarea
        ref={inputTextAreaRef}
        aria-label="테스트 입력"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            void onRun();
          }
        }}
        placeholder="테스트 입력"
        className="min-h-0 flex-1 resize-none border-border bg-muted/20 font-mono text-foreground"
      />
    </div>
  );
}
