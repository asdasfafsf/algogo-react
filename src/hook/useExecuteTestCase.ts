import { useCallback } from "react";
import useMeStore from "@zustand/MeStore";
import useCodeEditorStore from "../zustand/CodeEditorStore";
import useTestCaseListStore from "../zustand/TestCaseListStore";
import { useExecuteSocketStore } from "../zustand/ExecuteSocketStore";
import useAlertModal from "./useAlertModal";
import useModal from "../plugins/modal/useModal";
import useCodeResultPanelStore from "../zustand/CodeResultPanelStore";
import { buildExecutionRequest } from "@/domain/editor/execution";
import {
  canStartExecution,
  executeWithAuthenticationRetry,
} from "@/application/editor/execute";
import { toExecutionFailureResult } from "@/domain/execute/error";

export default function useExecuteTestCase() {
  const setRunning = useTestCaseListStore((state) => state.setRunning);
  const handleExecute = useTestCaseListStore((state) => state.handleExecute);
  const handleRun = useTestCaseListStore((state) => state.handleRun);

  const state = useExecuteSocketStore((state) => state.state);
  const setSelectedIndex = useCodeResultPanelStore(
    (state) => state.setSelectedIndex,
  );
  const refresh = useMeStore((state) => state.refresh);
  const [alert] = useAlertModal();
  const modal = useModal();

  const handleTest = useCallback(async () => {
    const { connect } = useExecuteSocketStore.getState();
    if (!canStartExecution(state)) {
      await alert("실행 중 입니다. 잠시만 기다려주세요");
      return;
    }

    const { run, execute } = useExecuteSocketStore.getState();

    const showFailure = (failure: ResponseExecuteResult) => {
      const { testCaseList } = useTestCaseListStore.getState();
      testCaseList.forEach((_testCase, seq) => {
        handleExecute({ ...failure, seq });
      });
    };

    try {
      const result = await executeWithAuthenticationRetry(
        state,
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
          subscribe: (isRetry) => {
            if (isRetry) setRunning();
            execute(handleExecute);
          },
          run,
        },
        () => {
          if (modal?.top()?.key === "TESTCASE") modal.pop();
          setSelectedIndex(2);
          setRunning();
        },
      );

      if (result.code === "9002") {
        handleRun(result);
      } else if (result.code !== "0000") {
        showFailure(result);
        await alert(result.result);
      }
    } catch (error) {
      const failure = toExecutionFailureResult(error);
      showFailure(failure);
      await alert(failure.result);
    }
  }, [state]);

  return {
    state,
    handleTest,
  };
}
