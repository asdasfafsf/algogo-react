import { useCallback } from 'react';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import useTestCaseListStore from '../zustand/TestCaseListStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';
import useAlertModal from './useAlertModal';
import useModal from '../plugins/modal/useModal';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';

export function useExecute() {
  const {
    setRunning, testCaseList, handleExecute, handleRun,
  } = useTestCaseListStore(
    ({
      testCaseList, setRunning, handleExecute, handleRun,
    }) => ({
      testCaseList, setRunning, handleExecute, handleRun,
    }),
  );
  const { language, code } = useCodeEditorStore(
    ({ language, code }) => ({ language, code }),
  );
  const { state, run, execute } = useExecuteSocketStore(
    ({ state, run, execute }) => ({ run, execute, state }),
  );

  const { setSelectedIndex } = useCodeResultPanelStore(
    ({ setSelectedIndex }) => ({ setSelectedIndex }),
  );

  const [alert] = useAlertModal();
  const modal = useModal();

  const handleTest = useCallback(async () => {
    if (state !== 'WAITING') {
      await alert('실행 중 입니다. 잠시만 기다려주세요');
      return;
    }

    if (modal?.top()?.key === 'TESTCASE') {
      modal.pop();
    }

    setSelectedIndex(2);
    setRunning();
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
  }, [testCaseList, state]);

  return {
    state,
    handleTest,
  };
}
