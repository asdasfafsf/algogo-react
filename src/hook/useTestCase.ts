import { useCallback, useEffect } from 'react';
import useModal from '../plugins/modal/useModal';
import { useTestCaseListStore } from '../zustand/TestCaseListStore';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';

export default function useTestCase() {
  const modal = useModal();
  const {
    testCaseList, setTestCaseList, handleExecute, handleRun,
  } = useTestCaseListStore((state) => state);
  const { language, code } = useCodeEditorStore(
    ({ language, code }) => ({ language, code }),
  );
  const { run, execute } = useExecuteSocketStore(({ run, execute }) => ({ run, execute }));

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
    setTestCaseList([...testCaseList, newTestCase]);
  }, [testCaseList]);

  const handleClickTest = useCallback(async () => {
    const data: RequestExecuteList = {
      code,
      provider: language,
      inputList: testCaseList.map((testCase, index) => ({
        seq: index,
        input: testCase.input,
      })),
    };
    execute(handleExecute);
    run(data, handleRun);
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
    setTestCaseList(newTestCaseList);
  }, [testCaseList]);

  const handleChangeOutput = useCallback((index:number, value: string) => {
    const newTestCaseList = [...testCaseList];
    newTestCaseList[index].output = value;
    setTestCaseList(newTestCaseList);
  }, [testCaseList]);

  return {
    testCaseList,
    handleClickAddTestCase,
    handleClickTest,
    removeTestCase,
    handleClickClose,
    handleChangeInput,
    handleChangeOutput,
  };
}
