import type { ModalComponentProps } from "@plugins/modal/ModalController";
import { Button } from "@components/ui/button";
import { DialogDescription } from "@components/ui/dialog";
import {
  ModalBody,
  ModalFooter,
  ModalSurface,
} from "@components/ui/modal-surface";

export interface ConfirmModalOptions {
  title?: string;
  cancelText?: string;
  confirmText?: string;
  variant?: "default" | "destructive";
}

interface Props extends ModalComponentProps<boolean>, ConfirmModalOptions {
  content: string;
}
export default function ConfirmModal({
  content,
  title = "확인",
  cancelText = "취소",
  confirmText = "확인",
  variant = "default",
  resolve,
}: Props) {
  const finish = (value: boolean) => resolve(value);
  return (
    <ModalSurface
      open
      onOpenChange={(open) => {
        if (!open) finish(false);
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
        <Button variant="outline" onClick={() => finish(false)}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={() => finish(true)}>
          {confirmText}
        </Button>
      </ModalFooter>
    </ModalSurface>
  );
}
