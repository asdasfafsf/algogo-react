import { useCallback } from 'react';
import useModal from '@plugins/modal/useModal';
import { ConfirmModal } from '@components/modal/index';

export default function useConfirmModal() {
  const modal = useModal();
  const comfirm = useCallback(async (content: string) => modal.push('Confirm', ConfirmModal, { content }), [modal]);
  return [comfirm];
}
