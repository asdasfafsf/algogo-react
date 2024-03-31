import { useCallback } from 'react';
import useModal from '../plugins/modal/useModal';
import AlertModal from '../organism/AlertModal';

export default function useAlert() {
  const modal = useModal();
  const alert = useCallback(async (content: string) => modal.push('Alert', AlertModal, { content }), [modal]);
  return [alert];
}
