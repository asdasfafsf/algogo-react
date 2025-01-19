import { useCallback, useMemo } from 'react';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';
import useAlertModal from './useAlertModal';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';
import useMeStore from '@zustand/MeStore';


export default function useExecute() {
  const setSelectedIndex = useCodeResultPanelStore((state) => state.setSelectedIndex);
  const setOutput = useCodeEditorStore((state) => state.setOutput);

  const [alert] = useAlertModal();
  // const state = useExecuteSocketStore((state) => state.state);

  const handleExecute = useCallback(async () => {
    const {
      state, run, execute, connect,
    } = useExecuteSocketStore.getState();
    if (state === 'PENDING') {
      await alert('실행 중 입니다. 잠시만 기다려주세요');
      return;
    }

    const { language, code, input } = useCodeEditorStore.getState();
    setSelectedIndex(1);
    const requestData = {
      provider: language,
      code,
      inputList: [{
        seq: 0,
        input,
      }],
    };

    let currentState = state;
    if (currentState !== 'WAITING') {
      currentState = await connect();

      if (currentState === 'TOKEN_EXPIRED') {
        await useMeStore.getState().refresh();
      }
      currentState = await connect();
    }

    setOutput({
      seq: 0,
      processTime: 0,
      memory: 0,
      code: '',
      result: ''
    });
    execute((executeResult) => {
      console.log(executeResult)
      setOutput(executeResult);
    });
    const result = await run(requestData);

    if (result.code === 'JWT_EXPIRED') {
      await useMeStore.getState().refresh();
      await connect();
      await run(requestData);
      execute((executeResult) => {
        setOutput(executeResult);
      });
    }

  }, [setOutput]);

  return useMemo(() => ({
    handleExecute,
  }), [handleExecute]);
}
