import { useCallback } from 'react';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';
import useConfirmModal from './useConfirmModal';
import * as CODE_MAP from '../constant/Code';
import TestCaseModal from '../organism/TestCaseModal';
import useModal from '../plugins/modal/useModal';

export default function useCodeDropUp() {
  const [confirm] = useConfirmModal();
  const modal = useModal();
  const handleClickAddTestCase = useCallback(async () => {
    modal.push('testCase', TestCaseModal, {});
  }, [modal]);

  const { language, setCode, codeFromLanguage } = useCodeEditorStore((state) => ({
    language: state.language,
    setCode: state.setCode,
    codeFromLanguage: state.codeFromLanguage,
  }));

  const handleClickReset = useCallback(async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.currentTarget.blur();
    const isOk = await confirm('초기화 하시겠습니까?');

    if (!isOk) {
      return;
    }

    const initializedCode = CODE_MAP[language];
    setCode(initializedCode);
    codeFromLanguage[language] = initializedCode;
  }, [language]);

  return [handleClickAddTestCase, handleClickReset] as const;
}
