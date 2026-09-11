import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { ModalComponentProps } from "@plugins/modal/ModalController";

export default function CompilerSettingModal({
  resolve,
}: ModalComponentProps<boolean>) {
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) resolve(false);
      }}
    >
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>컴파일러 설정</DialogTitle>
          <DialogDescription>컴파일러 설정 화면입니다.</DialogDescription>
        </DialogHeader>
        <div className="min-h-64 h-auto rounded-md bg-gray-900 w-full">
          <header className="flex items-center w-full p-4">
            <h2 className="w-1/2 text-base font-semibold">컴파일러 세팅</h2>
            <div className="flex items-start justify-end w-1/2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="컴파일러 설정 닫기"
                onClick={() => resolve(false)}
                className="size-8 text-white hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden className="size-5 text-white" />
              </Button>
            </div>
          </header>
          <section />
        </div>
      </DialogContent>
    </Dialog>
  );
}
