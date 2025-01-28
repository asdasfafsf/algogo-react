import { useCallback, useEffect } from 'react';
import useModal from '../plugins/modal/useModal';
import { useTestCaseListStore } from '../zustand/TestCaseListStore';

export default function useTestCase() {
  const modal = useModal();
  const testCaseList = useTestCaseListStore((state) => state.testCaseList);
  const setTestCaseList = useTestCaseListStore((state) => state.setTestCaseList);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          modal.top()?.resolve(false);
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
    const newTestCase: TestCase = {
      input: '',
      output: '',
      expected: '',
      state: '실행 전',
      readOnly: false,
    };

    const newTestCaseList = [...testCaseList.map((elem) => {
      const newElem = { ...elem };
      elem.expected = '실행 전';
      return newElem;
    }), newTestCase];

    setTestCaseList(newTestCaseList);
  }, [testCaseList]);

  const removeTestCase = useCallback((testCaseIndex: number) => {
    const newTestCaseList = testCaseList.filter((_e, index) => testCaseIndex !== index);
    setTestCaseList(newTestCaseList);
  }, [testCaseList]);

  const handleClickClose = useCallback(() => {
    modal.top()?.resolve(false);
  }, [modal]);

  const handleChangeInput = useCallback((index:number, value: string) => {
    const newTestCaseList = [...testCaseList];
    newTestCaseList[index].input = value;
    newTestCaseList[index].state = '실행 전';
    setTestCaseList(newTestCaseList);
  }, [testCaseList]);

  const handleChangeOutput = useCallback((index:number, value: string) => {
    const newTestCaseList = [...testCaseList];
    newTestCaseList[index].expected = value;
    newTestCaseList[index].state = '실행 전';
    setTestCaseList(newTestCaseList);
  }, [testCaseList]);

  return {
    testCaseList,
    handleClickAddTestCase,
    removeTestCase,
    handleClickClose,
    handleChangeInput,
    handleChangeOutput,
  };
}
