import { useCallback, useRef } from "react";
import useModal from "@plugins/modal/useModal";
import type { ModalHandle } from "@plugins/modal/ModalController";
import { LoadingModal } from "@components/modal";

const LOADING_MODAL_ID = "loading-modal";

export default function useLoadingModal() {
  const modal = useModal();
  const loadingModal = useRef<ModalHandle<void> | null>(null);
  const startLoading = useCallback(
    (message?: string) => {
      if (loadingModal.current) return;
      loadingModal.current = modal.open(LOADING_MODAL_ID, LoadingModal, {
        message,
      });
    },
    [modal],
  );

  const endLoading = useCallback(() => {
    loadingModal.current?.resolve();
    loadingModal.current = null;
  }, []);

  return { startLoading, endLoading };
}
