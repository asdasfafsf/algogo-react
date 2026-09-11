import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Button } from "@components/ui/button";
import { DialogDescription } from "@components/ui/dialog";
import {
  ModalBody,
  ModalFooter,
  ModalSurface,
} from "@components/ui/modal-surface";
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
    <ModalSurface
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
      size="sm"
      title={title}
    >
      <ModalBody>
        <DialogDescription className="break-words text-[15px] leading-6 text-foreground/80">
          {content}
        </DialogDescription>
      </ModalBody>
      <ModalFooter>
        <Button onClick={close}>{confirmText}</Button>
      </ModalFooter>
    </ModalSurface>
  );
}
