import { useCallback } from 'react';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import useTestCaseListStore from '../zustand/TestCaseListStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';
import useAlertModal from './useAlertModal';
import useModal from '../plugins/modal/useModal';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';

export default function useExecuteTestCase() {
  const setRunning = useTestCaseListStore((state) => state.setRunning);
  const handleExecute = useTestCaseListStore((state) => state.handleExecute);
  const handleRun = useTestCaseListStore((state) => state.handleRun);

  const state = useExecuteSocketStore((state) => state.state);
  const run = useExecuteSocketStore((state) => state.run);
  const execute = useExecuteSocketStore((state) => state.execute);

  const setSelectedIndex = useCodeResultPanelStore((state) => state.setSelectedIndex);

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

    const { testCaseList } = useTestCaseListStore.getState();
    const { code, language } = useCodeEditorStore.getState();

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
  }, [state]);

  return {
    state,
    handleTest,
  };
}
