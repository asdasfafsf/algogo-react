import { useCallback, useEffect } from 'react';
import useModal from '../plugins/modal/useModal';
import { useTestCaseListStore } from '../zustand/TestCaseListStore';

export default function useTestCase(initialTestCaseList: TestCase[]) {
  const modal = useModal();
  const { testCaseList, setTestCaseList } = useTestCaseListStore((state) => state);

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
    setTestCaseList(newTestCaseList);
  }, [testCaseList]);

  const handleClickTest = useCallback(() => {

  }, [testCaseList]);

  const removeTestCase = useCallback((testCaseIndex: number) => {
    const newTestCaseList = testCaseList.filter((elem, index) => testCaseIndex !== index);
    setTestCaseList(newTestCaseList);
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
