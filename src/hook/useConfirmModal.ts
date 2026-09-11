import { useCallback } from "react";
import useModal from "@plugins/modal/useModal";
import { ConfirmModal } from "@components/modal/index";
import type { ConfirmModalOptions } from "@components/modal/ConfirmModal";

export default function useConfirmModal() {
  const modal = useModal();
  const confirm = useCallback(
    async (content: string, options: ConfirmModalOptions = {}) =>
      modal.push("Confirm", ConfirmModal, { content, ...options }),
    [modal],
  );
  return [confirm] as const;
}
