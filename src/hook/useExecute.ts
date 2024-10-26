import { useCallback } from 'react';
import useCodeEditorStore from '../zustand/CodeEditorStore';
import { useExecuteSocketStore } from '../zustand/ExecuteSocketStore';
import useAlertModal from './useAlertModal';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';

export default function useExecute() {
  const { language, code } = useCodeEditorStore(
    ({ language, code }) => ({ language, code }),
  );
  const { state, run, execute } = useExecuteSocketStore(
    ({ state, run, execute }) => ({ run, execute, state }),
  );

  const { setSelectedIndex } = useCodeResultPanelStore(
    ({ setSelectedIndex }) => ({ setSelectedIndex }),
  );

  const { input, setOutput } = useCodeEditorStore(
    ({ setOutput, input }) => ({ setOutput, input }),
  );

  const [alert] = useAlertModal();

  const handleExecute = useCallback(async () => {
    if (state !== 'WAITING') {
      await alert('실행 중 입니다. 잠시만 기다려주세요');
      return;
    }

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
  }, [state, language, code, input]);

  return {
    state,
    handleExecute,
  };
}
