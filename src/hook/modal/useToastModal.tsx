import { useCallback } from 'react';
import useModal from '@plugins/modal/useModal';
import ToastModal from '@components/modal/ToastModal';

export default function useToastModal() {
  const modal = useModal();
  const toast = useCallback(
    async (content: string, duration?: number, variant?: 'default' | 'success' | 'fail') => {
      const modalKey = Math.random().toString(36).substring(2, 15);
      const result = await modal.push(`Toast-${modalKey}`, ToastModal, {
        content, duration, variant, modalKey,
      });
      return result;
    },
    [modal],
  );
  return { toast };
}
