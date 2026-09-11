import { useState } from "react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
interface Props extends ModalComponentProps<string | boolean> {
  content: string;
  defaultValue?: string | boolean;
  title?: string;
}
export default function PromptModal({
  title = "입력",
  defaultValue = "",
  content,
  resolve,
}: Props) {
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const finish = (result: string | boolean) => resolve(result);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) finish(false);
      }}
    >
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Input
            autoFocus
            aria-label={content}
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
                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                  onClick={async () =>
                    setValue(await navigator.clipboard.readText())
                  }
                >
                  <ClipboardDocumentListIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>붙여넣기</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => finish(false)}>
            취소
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => finish(value || defaultValue)}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
