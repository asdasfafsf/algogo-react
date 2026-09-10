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
  cancelText?: string;
  confirmText?: string;
}
export default function ConfirmModal({
  content,
  title = "확인",
  cancelText = "취소",
  confirmText = "확인",
}: Props) {
  const modal = useModal();
  const finish = (value: boolean) => modal.top()?.resolve(value);
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
          <DialogDescription className="min-h-16 pt-3 text-[15px] leading-relaxed">
            {content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => finish(false)}>
            {cancelText}
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => finish(true)}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
