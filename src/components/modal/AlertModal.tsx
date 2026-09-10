import useModal from "@plugins/modal/useModal";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
interface Props {
  content: string;
  title?: string;
  confirmText?: string;
}
export default function AlertModal({
  content,
  title = "알림",
  confirmText = "확인",
}: Props) {
  const modal = useModal();
  const close = () => modal.top()?.resolve(false);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent
        className="max-w-[400px]"
        onEscapeKeyDown={(e) => e.stopPropagation()}
      >
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
