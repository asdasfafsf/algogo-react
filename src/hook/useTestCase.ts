import { useCallback, useEffect } from 'react';
import useModal from '../plugins/modal/useModal';
import { useTestCaseListStore } from '../zustand/TestCaseListStore';
import { useExecuteResultListStore } from '../zustand/ExecuteResultListStore';

export default function useTestCase(initialTestCaseList: TestCase[]) {
  const modal = useModal();
  const { testCaseList, setTestCaseList } = useTestCaseListStore((state) => state);
  const { executeResultList, setExecuteResultList } = useExecuteResultListStore((state) => state);

  useEffect(() => {
    setTestCaseList(initialTestCaseList);
  }, []);

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
    modal.top()?.resolve(false);
  }, [modal]);

  const handleInputChange = useCallback((index:number, value: string) => {
    const newTestCaseList = [...testCaseList];
    const newExecuteResultList = [...executeResultList];

    newTestCaseList[index].input = value;
    newExecuteResultList[index].input = value;

    setTestCaseList(newTestCaseList);
    setExecuteResultList(newExecuteResultList);
  }, [testCaseList]);

  const handleOutputChange = useCallback((index:number, value: string) => {
    const newTestCaseList = [...testCaseList];
    const newExecuteResultList = [...executeResultList];

    newTestCaseList[index].output = value;
    newExecuteResultList[index].output = value;

    setTestCaseList(newTestCaseList);
    setExecuteResultList(newExecuteResultList);
  }, [testCaseList]);

  return [testCaseList,
    handleClickAddTestCase,
    handleClickTest,
    removeTestCase,
    handleClickClose,
    handleInputChange,
    handleOutputChange] as const;
}
