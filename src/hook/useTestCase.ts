import { useCallback, useEffect } from 'react';
import useModal from '../plugins/modal/useModal';
import { useTestCaseListStore } from '../zustand/TestCaseListStore';
import { useExecuteResultListStore } from '../zustand/ExecuteResultListStore';

export default function useTestCase(initialTestCaseList: TestCase[]) {
  const modal = useModal();
  const { testCaseList, setTestCaseList } = useTestCaseListStore((state) => state);
  const { executeResultList, setExecuteResultList } = useExecuteResultListStore((state) => state);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          modal.top()?.reject(false);
          break;
        default:
          break;
      }
    };

    if (!modal.top()) {
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  const handleClickAddTestCase = useCallback(() => {
    const newTestCaseList = [...testCaseList, {
      input: '',
      output: '',
      readOnly: false,
    }];
    const newExecuteResultList = [...executeResultList, {
      input: '',
      output: '',
      expected: '',
      state: Math.random() > 0.5 ? '일치' : '불일치',
    } as ExecuteResult];
    setTestCaseList(newTestCaseList);
    setExecuteResultList(newExecuteResultList);
  }, [testCaseList]);

  const handleClickTest = useCallback(() => {

  }, [testCaseList]);

  const removeTestCase = useCallback((testCaseIndex: number) => {
    const newTestCaseList = testCaseList.filter((elem, index) => testCaseIndex !== index);
    const newExecuteResultList = executeResultList.filter((elem, index) => testCaseIndex !== index);
    setTestCaseList(newTestCaseList);
    setExecuteResultList(newExecuteResultList);
  }, [testCaseList]);

  const handleClickClose = useCallback(() => {
    modal.top()?.reject(false);
  }, [modal]);

  return [testCaseList,
    handleClickAddTestCase,
    handleClickTest,
    removeTestCase,
    handleClickClose] as const;
}
