import { useCallback } from 'react';
import useModal from '@plugins/modal/useModal';
import AlertModal from '@components/modal/AlertModal';

export default function useAlertModal() {
  const modal = useModal();
  const alert = useCallback(async (content: string) => modal.push('Alert', AlertModal, { content }), [modal]);
  return [alert];
}
