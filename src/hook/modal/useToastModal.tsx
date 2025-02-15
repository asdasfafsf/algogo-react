import { useCallback } from 'react';
import useModal from '@plugins/modal/useModal';
import ToastModal from '@components/modal/ToastModal';

export default function useToastModal() {
  const modal = useModal();
  const toast = useCallback(
    async (content: string, duration?: number) => modal.push('Toast', ToastModal, { content, duration }),
    [modal],
  );
  return { toast };
}
