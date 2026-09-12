import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CodeControlPanel from "@/components/problem/CodeControlPanel";
import CodeEditorSettingsModal from "@/components/problem/CodeEditorSettingsModal";
import CodeTemplateAddModal from "@/components/problem/CodeTemplateAddModal";
import CodeTestCaseTable from "@/components/problem/CodeTestCaseTable";
import MonacoEditor from "@/components/problem/MonacoEditor";
import CompilerInfoModal from "@/components/problem/CompilerInfoModal";
import ProblemHeader from "@/layout/problem/ProblemHeader";
import TestCaseModal from "@/components/problem/TestCaseModal";
import ModalProvider from "@/plugins/modal/ModalProvider";
import useModal from "@/plugins/modal/useModal";
import useCodeEditorStore from "@/zustand/CodeEditorStore";
import { useExecuteSocketStore } from "@/zustand/ExecuteSocketStore";
import type { Problem } from "@/type/Problem.type";
import "../../src/index.css";
import "../../src/loader/MonacoLoader";

useCodeEditorStore.setState({
  language: "Python",
  code: "print('editor primitives fixture')",
  templates: { defaultList: [], summaryList: [] },
});

const executeResultList: TestCase[] = [
  {
    input: "1 2",
    output: "3",
    expected: "3",
    state: "일치",
  },
  {
    input: "2 2",
    output: "5",
    expected: "4",
    state: "불일치",
  },
];

const headerProblem = {
  title:
    "아주 긴 문제 제목에서도 현재 경로를 놓치지 않는 반응형 breadcrumb 헤더 검증",
  sourceId: "12015",
  sourceUrl: "https://www.acmicpc.net/problem/12015",
  updatedAt: new Date(0),
} as Problem;

function EditorPrimitivesFixture() {
  const modal = useModal();
  const [isPending, setIsPending] = useState(false);
  const [lastToolbarAction, setLastToolbarAction] =
    useState("아직 실행한 동작이 없습니다");
  const themePreference = useCodeEditorStore((state) => state.themePreference);

  useEffect(() => {
    useExecuteSocketStore.setState({
      state: isPending ? "PENDING" : "WAITING",
    });
  }, [isPending]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ProblemHeader problem={headerProblem} />
      <main className="mx-auto grid max-w-4xl gap-5 p-4 sm:p-8">
        <div>
          <h2 className="text-xl font-semibold">문제 풀이 컨트롤 검증</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            실제 모달과 편집 컨트롤의 버튼, 입력, 체크박스 상태를 확인합니다.
          </p>
        </div>

        <section className="flex flex-wrap gap-3 rounded-lg border p-5">
          <Button
            onClick={() =>
              void modal.push(
                "CODE_EDITOR_SETTINGS",
                CodeEditorSettingsModal,
                {},
              )
            }
          >
            화면 설정 열기
          </Button>
          <Button
            onClick={() =>
              void modal.push("CODE_TEMPLATE_ADD_MODAL", CodeTemplateAddModal, {
                content: "print(1)",
              })
            }
          >
            템플릿 열기
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              void modal.push(
                "CODE_TEMPLATE_EDIT_MODAL",
                CodeTemplateAddModal,
                {
                  isEdit: true,
                  uuid: "fixture-template",
                  name: "수정용 fixture",
                  content: "print(1)",
                },
              )
            }
          >
            템플릿 수정 열기
          </Button>
          <Button
            onClick={() =>
              void modal.push("CompilerInfo", CompilerInfoModal, {})
            }
          >
            컴파일러 정보 열기
          </Button>
          <Button
            onClick={() => void modal.push("TESTCASE", TestCaseModal, {})}
          >
            테스트 케이스 열기
          </Button>
        </section>

        <section className="grid gap-3 rounded-lg border p-5">
          <h2 className="font-semibold">실제 문제 도구</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              aria-pressed={isPending}
              onClick={() => setIsPending((current) => !current)}
            >
              {isPending ? "실행 대기 해제" : "실행 대기 상태로 전환"}
            </Button>
            <output aria-live="polite">
              {isPending ? "테스트 버튼 비활성" : "테스트 버튼 활성"}
            </output>
            <Button
              variant="outline"
              onClick={() => document.documentElement.classList.remove("dark")}
            >
              사이트 라이트
            </Button>
            <Button
              variant="outline"
              onClick={() => document.documentElement.classList.add("dark")}
            >
              사이트 다크
            </Button>
            <output aria-live="polite">에디터 테마: {themePreference}</output>
          </div>
          <CodeControlPanel
            isPending={isPending}
            onReset={() => setLastToolbarAction("초기화")}
            onExecute={() => setLastToolbarAction("실행")}
            onTest={() => setLastToolbarAction("테스트")}
            onSubmit={() => setLastToolbarAction("제출")}
            onOpenCompilerInfo={() =>
              void modal.push("CompilerInfo", CompilerInfoModal, {})
            }
            onOpenSettings={() =>
              void modal.push(
                "CODE_EDITOR_SETTINGS",
                CodeEditorSettingsModal,
                {},
              )
            }
          />
          <output aria-live="polite">
            최근 도구 동작: {lastToolbarAction}
          </output>
          <div className="h-64 overflow-hidden rounded-lg border">
            <MonacoEditor />
          </div>
          <CodeTestCaseTable executeResultList={executeResultList} />
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/problem/fixture-workspace"]}>
      <ModalProvider>
        <EditorPrimitivesFixture />
      </ModalProvider>
    </MemoryRouter>
  </StrictMode>,
);
