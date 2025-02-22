import { useCallback, useMemo } from 'react';
import useMeStore from '@zustand/MeStore';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';
import useAlertModal from './useAlertModal';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';

export default function useExecute() {
  const setSelectedIndex = useCodeResultPanelStore((state) => state.setSelectedIndex);
  const setOutput = useCodeEditorStore((state) => state.setOutput);
  const socketState = useExecuteSocketStore((state) => state.state);
  const run = useExecuteSocketStore((state) => state.run);
  const execute = useExecuteSocketStore((state) => state.execute);
  const connect = useExecuteSocketStore((state) => state.connect);

  const [alert] = useAlertModal();

  const handleExecute = useCallback(async () => {
    if (socketState === 'PENDING') {
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

    let currentState: SocketState = socketState;

    if (currentState === 'DISCONNECTED') {
      const result = await connect();
      currentState = result;
    }

    if (currentState === 'JWT_EXPIRED') {
      await useMeStore.getState().refresh();
      currentState = await connect();
    }

    setOutput({
      seq: 0,
      processTime: 0,
      memory: 0,
      code: '',
      result: '',
      detail: '',
    });
    execute((executeResult) => {
      setOutput(executeResult);
    });
    let result = await run(requestData);

    if (result.code === 'JWT_EXPIRED') {
      await useMeStore.getState().refresh();
      const connectResult = await connect();

      if (connectResult === 'WAITING') {
        execute((executeResult) => {
          setOutput(executeResult);
        });
        result = await run(requestData);
      }
    }

    if (result.code !== '0000') {
      if (result.code === '9999') {
        await alert('실행 중 오류가 발생했습니다.');
        return;
      }
      setOutput(result);
    }
  }, [socketState]);

  return useMemo(() => ({
    handleExecute,
  }), [socketState, handleExecute]);
}
