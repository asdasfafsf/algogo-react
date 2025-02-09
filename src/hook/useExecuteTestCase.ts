import { useCallback } from 'react';
import useMeStore from '@zustand/MeStore';
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
  const socket = useExecuteSocketStore((state) => state.socket);

  const setSelectedIndex = useCodeResultPanelStore((state) => state.setSelectedIndex);
  const refresh = useMeStore((state) => state.refresh);
  const [alert] = useAlertModal();
  const modal = useModal();

  const handleTest = useCallback(async () => {
    const { connect } = useExecuteSocketStore.getState();
    if (state === 'PENDING') {
      await alert('실행 중 입니다. 잠시만 기다려주세요');
      return;
    }

    let currentState:SocketState = state;

    if (currentState === 'DISCONNECTED') {
      currentState = await connect();
    }

    if (currentState === 'JWT_EXPIRED') {
      await refresh();
      currentState = await connect();
    }
    const { run, execute } = useExecuteSocketStore.getState();

    if (modal?.top()?.key === 'TESTCASE') {
      modal.pop();
    }

    const { testCaseList } = useTestCaseListStore.getState();
    const { code, language } = useCodeEditorStore.getState();

    setSelectedIndex(2);
    setRunning();
    execute(handleExecute);
    const data: RequestExecuteList = {
      code,
      provider: language,
      inputList: testCaseList.map((testCase, index) => ({
        seq: index,
        input: testCase.input,
      })),
    };

    let result = await run(data);

    if (result.code === 'JWT_EXPIRED') {
      await refresh();
      currentState = await connect();

      if (currentState === 'WAITING') {
        setRunning();
        execute(handleExecute);
        result = await run(data);
      }
    }

    if (result.code === '9002') {
      handleRun(result);
    }
  }, [state, socket]);

  return {
    state,
    handleTest,
  };
}
