import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import CodeResultOutput from "@/components/problem/CodeResultOutput";
import CodeTestCaseTable from "@/components/problem/CodeTestCaseTable";
import useExecute from "@/hook/useExecute";
import useExecuteTestCase from "@/hook/useExecuteTestCase";
import ModalProvider from "@/plugins/modal/ModalProvider";
import useCodeEditorStore from "@/zustand/CodeEditorStore";
import useCodeResultPanelStore from "@/zustand/CodeResultPanelStore";
import { useExecuteSocketStore } from "@/zustand/ExecuteSocketStore";
import useTestCaseListStore from "@/zustand/TestCaseListStore";
import {
  EXECUTE_SOCKET_ERROR_CODE,
  ExecuteSocketError,
} from "@/domain/execute/error";
import "../../src/index.css";

type ExecutionMode = "pending" | "single-failure" | "test-failure";

const successResult: ResponseExecuteResult = {
  seq: 0,
  processTime: 8,
  memory: 12,
  code: "0000",
  result: "실행이 완료되었습니다.",
  detail: "",
};

useCodeEditorStore.setState({
  language: "Python",
  code: "print('execution feedback fixture')",
  input: "fixture input",
});
useTestCaseListStore.setState({
  testCaseList: [
    { input: "1", output: "", expected: "1", state: "실행 전" },
    { input: "2", output: "", expected: "2", state: "실행 전" },
  ],
});

function ExecutionFeedbackFixture() {
  const { handleExecute } = useExecute();
  const { handleTest } = useExecuteTestCase();
  const output = useCodeEditorStore((state) => state.output);
  const selectedIndex = useCodeResultPanelStore((state) => state.selectedIndex);
  const testCaseList = useTestCaseListStore((state) => state.testCaseList);
  const socketState = useExecuteSocketStore((state) => state.state);
  const isPending = socketState === "CONNECTING" || socketState === "PENDING";
  const [requestCount, setRequestCount] = useState(0);
  const modeRef = useRef<ExecutionMode>("pending");
  const resultHandlerRef = useRef<
    ((result: ResponseExecuteResult) => void) | null
  >(null);
  const finishPendingRef = useRef<
    ((result: ResponseExecuteResult) => void) | null
  >(null);

  useEffect(() => {
    useExecuteSocketStore.setState({
      state: "WAITING",
      connect: async () => "WAITING",
      execute: (handler) => {
        resultHandlerRef.current = handler;
      },
      run: async () => {
        setRequestCount((count) => count + 1);
        useExecuteSocketStore.setState({ state: "PENDING" });

        if (modeRef.current !== "pending") {
          useExecuteSocketStore.setState({ state: "WAITING" });
          throw new ExecuteSocketError(
            EXECUTE_SOCKET_ERROR_CODE.unavailable,
            "fixture transport failure",
          );
        }

        return new Promise((resolve) => {
          finishPendingRef.current = resolve;
        });
      },
    });
  }, []);

  const startSingleExecution = () => {
    modeRef.current = "pending";
    void handleExecute();
  };

  const finishSingleExecution = () => {
    resultHandlerRef.current?.(successResult);
    useExecuteSocketStore.setState({ state: "WAITING" });
    finishPendingRef.current?.(successResult);
    finishPendingRef.current = null;
  };

  const failSingleExecution = () => {
    modeRef.current = "single-failure";
    void handleExecute();
  };

  const failTestExecution = () => {
    modeRef.current = "test-failure";
    void handleTest();
  };

  return (
    <main className="mx-auto grid min-h-dvh max-w-5xl gap-4 bg-background p-6 text-foreground">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={startSingleExecution}>단일 실행 시작</Button>
        <Button variant="outline" onClick={() => void handleExecute()}>
          중복 실행 시도
        </Button>
        <Button variant="outline" onClick={finishSingleExecution}>
          단일 실행 완료
        </Button>
        <Button variant="destructive" onClick={failSingleExecution}>
          단일 실행 즉시 실패
        </Button>
        <Button variant="destructive" onClick={failTestExecution}>
          테스트 실행 실패
        </Button>
      </div>

      <div className="flex gap-4 text-sm">
        <output data-testid="request-count">요청 수: {requestCount}</output>
        <output data-testid="selected-tab">선택 탭: {selectedIndex}</output>
      </div>

      <section className="h-64 overflow-hidden rounded-lg border">
        <CodeResultOutput
          output={output}
          isPending={isPending}
          handleClickRun={() => void handleExecute()}
          handleClickCopy={() => undefined}
          handleClickReset={() => undefined}
        />
      </section>

      <section className="h-80 overflow-hidden rounded-lg border">
        <CodeTestCaseTable executeResultList={testCaseList} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <ExecutionFeedbackFixture />
  </ModalProvider>,
);
