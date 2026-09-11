import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import ProblemCategoryViewer from "@components/problem/ProblemCategoryViewer";
import CodeResultOutput from "@components/problem/CodeResultOutput";
import ProblemInputOutputList from "@components/problem/ProblemInputOutputList";
import ProblemLevelViewer from "@components/problem/ProblemLevelViewer";
import "../../src/index.css";

function ProblemDisplayFixture() {
  const [action, setAction] = useState("아직 실행하지 않음");

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-3xl gap-8 p-8">
      <header>
        <h1 className="text-xl font-semibold">문제 표시 컴포넌트 검증</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          태그와 난이도 공개, 입출력 복사, 실행 결과 동작을 확인합니다.
        </p>
      </header>

      <section className="rounded-xl border bg-card p-5">
        <div className="flex flex-wrap items-center gap-4">
          <ProblemLevelViewer intialState="hide" level="골드 3" />
          <ProblemCategoryViewer
            initialState="hide"
            categoryList={["구현", "문자열"]}
          />
        </div>
      </section>

      <ProblemInputOutputList
        inputOutputList={[
          {
            order: 1,
            input: "hello world\n42",
            output: "world hello",
            content: "",
          },
        ]}
      />

      <section className="h-64 overflow-hidden rounded-xl border bg-card">
        <CodeResultOutput
          output={{
            seq: 1,
            processTime: 12,
            memory: 256,
            code: "0",
            result: "실행 결과",
            detail: "추가 정보",
          }}
          handleClickRun={() => setAction("실행")}
          handleClickCopy={() => setAction("복사")}
          handleClickReset={() => setAction("지우기")}
        />
      </section>
      <output aria-label="마지막 실행 결과" data-testid="result-action">
        {action}
      </output>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProblemDisplayFixture />
  </StrictMode>,
);
