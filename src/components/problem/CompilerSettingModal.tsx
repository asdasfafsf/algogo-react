import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IconButton } from "@components/Button/index";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Typography } from "@components/common/index";

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
            <div className="w-1/2">
              <Typography variant="h6">컴파일러 세팅</Typography>
            </div>
            <div className="flex items-start justify-end w-1/2">
              <IconButton onClick={() => resolve(false)} className="w-5 h-5">
                <XMarkIcon className="w-5 h-5 text-white" />
              </IconButton>
            </div>
          </header>
          <section />
        </div>
      </DialogContent>
    </Dialog>
  );
}
