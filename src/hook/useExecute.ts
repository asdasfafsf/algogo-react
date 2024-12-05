import { useCallback } from 'react';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';
import useAlertModal from './useAlertModal';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';

export default function useExecute() {
  const setSelectedIndex = useCodeResultPanelStore((state) => state.setSelectedIndex);
  const setOutput = useCodeEditorStore((state) => state.setOutput);

  const [alert] = useAlertModal();

  const handleExecute = useCallback(async () => {
    const { state, run, execute } = useExecuteSocketStore.getState();
    if (state !== 'WAITING') {
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

    setOutput({
      seq: 0,
      processTime: 0,
      memory: 0,
      code: '',
      result: '',
    });
    execute((executeResult) => {
      setOutput(executeResult);
    });
    run(requestData, (response) => {
      if (response.code !== '0000') {
        setOutput({
          seq: 0,
          processTime: 0,
          memory: 0,
          code: '',
          result: response.result,
        });
      }
    });
  }, []);

  return {
    handleExecute,
  };
}
