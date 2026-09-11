import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import CodeTestCaseTable from "@/components/problem/CodeTestCaseTable";
import ModalProvider from "@/plugins/modal/ModalProvider";
import useCodeEditorStore from "@/zustand/CodeEditorStore";
import useTestCaseListStore from "@/zustand/TestCaseListStore";
import { useExecuteSocketStore } from "@/zustand/ExecuteSocketStore";
import "../../src/index.css";

const initialTestCases: TestCase[] = [
  {
    input: "1 2",
    output: "첫 번째 실행 결과",
    expected: "첫 번째 실행 결과",
    state: "일치",
  },
  {
    input:
      "두 번째 행의 긴 입력입니다. 공백 없이도 줄바꿈되는지 확인하기위한verylongtestcaseinputvalue1234567890\n다음 줄 입력",
    output: "기존 두 번째 출력\n여러 줄 출력도 표시합니다.",
    expected:
      "두 번째 행의 예상 결과는 실행 후 새 값으로 바뀝니다. verylongexpectedvalue1234567890\n다음 줄 예상 결과",
    state: "불일치",
  },
];

let handleExecutionResult: ((result: ResponseExecuteResult) => void) | null =
  null;

useCodeEditorStore.setState({
  language: "Python",
  code: "print('code test case table fixture')",
});
useTestCaseListStore.setState({ testCaseList: initialTestCases });
useExecuteSocketStore.setState({
  state: "WAITING",
  connect: async () => "WAITING",
  execute: (handler) => {
    handleExecutionResult = handler;
  },
  run: async () => {
    handleExecutionResult?.({
      seq: 0,
      processTime: 1,
      memory: 1,
      code: "0000",
      result: "첫 번째 실행 결과",
      detail: "",
    });
    handleExecutionResult?.({
      seq: 1,
      processTime: 1,
      memory: 1,
      code: "0000",
      result: "실행 후 두 번째 행 결과\n여러 줄 결과를 유지합니다.",
      detail: "",
    });

    return {
      seq: 0,
      processTime: 1,
      memory: 1,
      code: "0000",
      result: "",
      detail: "",
    };
  },
});

function TestCaseTableFixture() {
  const [isNarrow, setIsNarrow] = useState(true);
  const testCaseList = useTestCaseListStore((state) => state.testCaseList);

  return (
    <main className="mx-auto grid max-w-5xl gap-5 p-8">
      <div>
        <h1 className="text-xl font-semibold">테스트 케이스 표 정렬 검증</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          긴 값과 여러 줄 값을 포함한 두 번째 행이 헤더와 같은 열 경계를
          사용하는지 확인합니다.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded border px-3 py-2 text-sm"
          onClick={() => setIsNarrow((current) => !current)}
        >
          {isNarrow ? "넓은 패널로 전환" : "좁은 패널로 전환"}
        </button>
        <output aria-live="polite">
          테스트 케이스 {testCaseList.length}개
        </output>
      </div>

      <section
        aria-label="테스트 케이스 표 패널"
        className={isNarrow ? "h-[420px] w-[360px]" : "h-[420px] w-full"}
      >
        <CodeTestCaseTable executeResultList={testCaseList} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <TestCaseTableFixture />
    </ModalProvider>
  </StrictMode>,
);
