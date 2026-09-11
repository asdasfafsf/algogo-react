import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ToastModal from "@components/modal/ToastModal";
import CodeResultOutput from "@components/problem/CodeResultOutput";
import { Card } from "@components/ui/card";
import { problemUpdateFailureMessage } from "@/application/problems/updateProblem";
import {
  templateLoadFailureMessage,
  templateMutationFailureMessage,
} from "@/domain/editor/templateForm";
import { decodeExecuteResult } from "@/domain/execute/decode";
import "../../src/index.css";

const serviceFailure = decodeExecuteResult({
  errorCode: "EXECUTOR_UNAVAILABLE",
  errorMessage: "ECONNREFUSED executor.internal:3002",
});

const compilerFailure = decodeExecuteResult({
  errorCode: "0000",
  errorMessage: "",
  data: {
    code: "9002",
    result: "Main.java:3: error: ';' expected",
    detail: "3 | System.out.println(1)\n  |                      ^",
  },
});

function ErrorCopyFixture() {
  return (
    <main className="mx-auto min-h-dvh max-w-5xl space-y-8 p-5 sm:p-10">
      <header>
        <p className="text-sm font-medium text-blue-600">문제 풀이 오류 안내</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          사용자가 해결할 수 있는 말로 안내합니다
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          서비스 내부 오류는 짧은 복구 안내로 보여주고, 코드의 컴파일 결과는
          원문을 유지합니다.
        </p>
      </header>

      <section aria-labelledby="service-errors-title">
        <h2 id="service-errors-title" className="text-lg font-semibold">
          서비스 오류
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ["문제 업데이트", problemUpdateFailureMessage],
            ["템플릿 불러오기", templateLoadFailureMessage],
            ["템플릿 수정", templateMutationFailureMessage("update")],
            ["코드 실행", serviceFailure.result],
          ].map(([title, message]) => (
            <Card key={title} className="p-4">
              <h3 className="font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {message}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="compiler-output-title">
        <h2 id="compiler-output-title" className="text-lg font-semibold">
          컴파일 결과
        </h2>
        <Card className="mt-3 h-64 overflow-hidden">
          <CodeResultOutput
            output={compilerFailure}
            handleClickReset={() => undefined}
            handleClickCopy={() => undefined}
            handleClickRun={() => undefined}
          />
        </Card>
      </section>

      <ToastModal
        content={serviceFailure.result}
        duration={3_600_000}
        variant="fail"
        resolve={() => undefined}
        reject={() => undefined}
      />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorCopyFixture />
  </StrictMode>,
);
