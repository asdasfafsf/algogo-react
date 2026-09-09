import { useCallback } from 'react';
import TestCaseModal from '@components/problem/TestCaseModal';
import useModal from '../plugins/modal/useModal';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import useConfirmModal from './useConfirmModal';
import defaultCodeFromLanguage from '../constant/Code';
import { getResetEditorCode } from '@/domain/editor/state';

export default function useCodeControlPanel() {
  const modal = useModal();
  const [confirm] = useConfirmModal();

  const handleClickReset = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      const isOk = await confirm('초기화 하시겠습니까?');

      if (!isOk) {
        return;
      }
      const { language, setCode } = useCodeEditorStore.getState();
      const initializedCode = getResetEditorCode(
        defaultCodeFromLanguage,
        language,
      );
      setCode(initializedCode);
    },
    [],
  );

  const handleClickAddTestCase = useCallback(async () => {
    modal.push("TESTCASE", TestCaseModal, {});
  }, []);

  return {
    handleClickAddTestCase,
    handleClickReset,
  };
}
