import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
interface Props extends ModalComponentProps<boolean> {
  content: string;
  title?: string;
  confirmText?: string;
}
export default function AlertModal({
  content,
  title = "알림",
  confirmText = "확인",
  resolve,
}: Props) {
  const close = () => resolve(false);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="pt-3 text-[15px] leading-relaxed">
            {content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={close}
            className="min-w-20 bg-blue-600 hover:bg-blue-700"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
