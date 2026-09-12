import { useCallback } from "react";
import useMeStore from "@zustand/MeStore";
import useCodeEditorStore from "../zustand/CodeEditorStore";
import useTestCaseListStore from "../zustand/TestCaseListStore";
import { useExecuteSocketStore } from "../zustand/ExecuteSocketStore";
import useCodeResultPanelStore from "../zustand/CodeResultPanelStore";
import { buildExecutionRequest } from "@/domain/editor/execution";
import {
  canStartExecution,
  executeWithAuthenticationRetry,
  isExecutionBusyError,
} from "@/application/editor/execute";
import { toExecutionFailureResult } from "@/domain/execute/error";

export default function useExecuteTestCase(onExecutionStarted?: () => void) {
  const setRunning = useTestCaseListStore((state) => state.setRunning);
  const handleExecute = useTestCaseListStore((state) => state.handleExecute);
  const handleRun = useTestCaseListStore((state) => state.handleRun);

  const state = useExecuteSocketStore((state) => state.state);
  const setSelectedIndex = useCodeResultPanelStore(
    (state) => state.setSelectedIndex,
  );
  const refresh = useMeStore((state) => state.refresh);

  const handleTest = useCallback(async () => {
    const { state: currentState, connect } = useExecuteSocketStore.getState();
    if (!canStartExecution(currentState)) return;

    const { run, execute } = useExecuteSocketStore.getState();

    const showFailure = (failure: ResponseExecuteResult) => {
      const { testCaseList } = useTestCaseListStore.getState();
      testCaseList.forEach((_testCase, seq) => {
        handleExecute({ ...failure, seq });
      });
    };

    onExecutionStarted?.();
    setSelectedIndex(2);
    setRunning();

    try {
      const result = await executeWithAuthenticationRetry(
        currentState,
        () => {
          const { testCaseList } = useTestCaseListStore.getState();
          const { code, language } = useCodeEditorStore.getState();
          return buildExecutionRequest(
            { code, language },
            testCaseList.map((testCase) => testCase.input),
          );
        },
        {
          connect,
          refreshAuthentication: refresh,
          subscribe: () => execute(handleExecute),
          run,
        },
      );

      if (result.code === "9002") {
        handleRun(result);
      } else if (result.code !== "0000") {
        showFailure(result);
      }
    } catch (error) {
      if (isExecutionBusyError(error)) return;

      const failure = toExecutionFailureResult(error);
      setSelectedIndex(2);
      showFailure(failure);
    }
  }, [
    handleExecute,
    handleRun,
    onExecutionStarted,
    refresh,
    setRunning,
    setSelectedIndex,
    state,
  ]);

  return {
    state,
    handleTest,
  };
}
