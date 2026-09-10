import { useCallback, useMemo } from "react";
import useMeStore from "@zustand/MeStore";
import useCodeEditorStore from "../zustand/CodeEditorStore";
import { useExecuteSocketStore } from "../zustand/ExecuteSocketStore";
import useAlertModal from "./useAlertModal";
import useCodeResultPanelStore from "../zustand/CodeResultPanelStore";
import {
  buildExecutionRequest,
  emptyExecutionResult,
} from "@/domain/editor/execution";
import {
  canStartExecution,
  executeWithAuthenticationRetry,
} from "@/application/editor/execute";
import { toExecutionFailureResult } from "@/domain/execute/error";

export default function useExecute() {
  const setSelectedIndex = useCodeResultPanelStore(
    (state) => state.setSelectedIndex,
  );
  const setOutput = useCodeEditorStore((state) => state.setOutput);
  const socketState = useExecuteSocketStore((state) => state.state);
  const run = useExecuteSocketStore((state) => state.run);
  const execute = useExecuteSocketStore((state) => state.execute);
  const connect = useExecuteSocketStore((state) => state.connect);

  const [alert] = useAlertModal();

  const handleExecute = useCallback(async () => {
    if (!canStartExecution(socketState)) {
      await alert("실행 중 입니다. 잠시만 기다려주세요");
      return;
    }

    const { language, code, input } = useCodeEditorStore.getState();
    setSelectedIndex(1);
    const requestData = buildExecutionRequest({ language, code }, [input]);

    try {
      const result = await executeWithAuthenticationRetry(
        socketState,
        () => requestData,
        {
          connect,
          refreshAuthentication: () => useMeStore.getState().refresh(),
          subscribe: () => {
            execute((executeResult) => {
              setOutput(executeResult);
            });
          },
          run,
        },
        () => setOutput(emptyExecutionResult()),
      );

      if (result.code !== "0000") {
        setOutput(result);
        if (result.code === "9999") {
          await alert("실행 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      const failure = toExecutionFailureResult(error);
      setOutput(failure);
      await alert(failure.result);
    }
  }, [socketState]);

  return useMemo(
    () => ({
      handleExecute,
    }),
    [socketState, handleExecute],
  );
}
