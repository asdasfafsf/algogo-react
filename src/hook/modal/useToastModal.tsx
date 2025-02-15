import { useCallback } from 'react';
import useModal from '@plugins/modal/useModal';
import ToastModal from '@components/modal/ToastModal';

export default function useToastModal() {
  const modal = useModal();
  const toast = useCallback(
    async (content: string, duration?: number, variant?: 'default' | 'success' | 'fail') => modal.push('Toast', ToastModal, { content, duration, variant }),
    [modal],
  );
  return { toast };
}
