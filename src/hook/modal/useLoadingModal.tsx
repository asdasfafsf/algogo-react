import { useCallback } from 'react';
import useModal from '@plugins/modal/useModal';
import { LoadingModal } from '@components/modal';

export default function useLoadingModal() {
  const modal = useModal();
  const LOADING_MODAL_ID = 'loading-modal';
  const startLoading = useCallback(
    (message?: string) => {
      modal.push(LOADING_MODAL_ID, LoadingModal, { message });
    },
    [modal],
  );

  const endLoading = useCallback(() => {
    modal.remove(LOADING_MODAL_ID);
  }, [modal]);

  return { startLoading, endLoading };
}
