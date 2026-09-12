import { useCallback, useMemo } from "react";
import useMeStore from "@zustand/MeStore";
import useCodeEditorStore from "../zustand/CodeEditorStore";
import { useExecuteSocketStore } from "../zustand/ExecuteSocketStore";
import useCodeResultPanelStore from "../zustand/CodeResultPanelStore";
import {
  buildExecutionRequest,
  emptyExecutionResult,
} from "@/domain/editor/execution";
import {
  canStartExecution,
  executeWithAuthenticationRetry,
  isExecutionBusyError,
} from "@/application/editor/execute";
import { toExecutionFailureResult } from "@/domain/execute/error";

export default function useExecute() {
  const setSelectedIndex = useCodeResultPanelStore(
    (state) => state.setSelectedIndex,
  );
  const setOutput = useCodeEditorStore((state) => state.setOutput);
  const handleExecute = useCallback(async () => {
    const { state, run, execute, connect } = useExecuteSocketStore.getState();
    if (!canStartExecution(state)) return;

    const { language, code, input } = useCodeEditorStore.getState();
    setSelectedIndex(1);
    const requestData = buildExecutionRequest({ language, code }, [input]);

    try {
      const result = await executeWithAuthenticationRetry(
        state,
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
      }
    } catch (error) {
      if (isExecutionBusyError(error)) return;

      const failure = toExecutionFailureResult(error);
      setSelectedIndex(1);
      setOutput(failure);
    }
  }, [setOutput, setSelectedIndex]);

  return useMemo(
    () => ({
      handleExecute,
    }),
    [handleExecute],
  );
}
