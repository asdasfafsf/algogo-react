import { useCallback } from 'react';
import useModal from '@plugins/modal/useModal';
import { PromptModal } from '@components/modal';

export default function usePromptModal() {
  const modal = useModal();
  const prompt = useCallback(
    async (content: string, defaultValue?: string | boolean, title?: string) => modal.push('Prompt', PromptModal, { content, title, defaultValue }),
    [modal],
  );

  return [prompt];
}
