import { useCallback } from 'react';
import TestCaseModal from '@components/problem/TestCaseModal';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';
import useConfirmModal from './useConfirmModal';
import defaultCodeFromLanguage from '../constant/Code';
import useModal from '../plugins/modal/useModal';

export default function useCodeDropUp() {
  const [confirm] = useConfirmModal();
  const modal = useModal();
  const handleClickAddTestCase = useCallback(async () => {
    modal.push('TESTCASE', TestCaseModal, {});
  }, [modal]);

  const setCode = useCodeEditorStore((state) => state.setCode);

  const handleClickReset = useCallback(async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.currentTarget.blur();
    const isOk = await confirm('초기화 하시겠습니까?');

    if (!isOk) {
      return;
    }

    const { codeFromLanguage, language } = useCodeEditorStore.getState();
    const initializedCode = defaultCodeFromLanguage[language];
    setCode(initializedCode);
    codeFromLanguage[language] = initializedCode;
  }, []);

  return [handleClickAddTestCase, handleClickReset] as const;
}
