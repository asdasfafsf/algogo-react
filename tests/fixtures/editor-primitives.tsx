import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import CodeEditorSettingsModal from "@/components/problem/CodeEditorSettingsModal";
import CodeTemplateAddModal from "@/components/problem/CodeTemplateAddModal";
import CodeTestCaseTable from "@/components/problem/CodeTestCaseTable";
import CompilerInfoModal from "@/components/problem/CompilerInfoModal";
import CompilerSettingModal from "@/components/problem/CompilerSettingModal";
import ProblemNavbar from "@/components/problem/ProblemNavbar";
import TestCaseModal from "@/components/problem/TestCaseModal";
import ModalProvider from "@/plugins/modal/ModalProvider";
import useModal from "@/plugins/modal/useModal";
import useCodeEditorStore from "@/zustand/CodeEditorStore";
import { useExecuteSocketStore } from "@/zustand/ExecuteSocketStore";
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

function EditorPrimitivesFixture() {
  const modal = useModal();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    useExecuteSocketStore.setState({
      state: isPending ? "PENDING" : "WAITING",
    });
  }, [isPending]);

  return (
    <main className="mx-auto grid max-w-4xl gap-5 p-8">
      <div>
        <h1 className="text-xl font-semibold">문제 풀이 컨트롤 검증</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          실제 모달과 편집 컨트롤의 버튼, 입력, 체크박스 상태를 확인합니다.
        </p>
      </div>

      <section className="flex flex-wrap gap-3 rounded-lg border p-5">
        <Button
          onClick={() =>
            void modal.push("CODE_EDITOR_SETTINGS", CodeEditorSettingsModal, {})
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
            void modal.push("CODE_TEMPLATE_EDIT_MODAL", CodeTemplateAddModal, {
              isEdit: true,
              uuid: "fixture-template",
              name: "수정용 fixture",
              content: "print(1)",
            })
          }
        >
          템플릿 수정 열기
        </Button>
        <Button
          onClick={() => void modal.push("CompilerInfo", CompilerInfoModal, {})}
        >
          컴파일러 정보 열기
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            void modal.push("COMPILER_SETTINGS", CompilerSettingModal, {})
          }
        >
          컴파일러 설정 열기
        </Button>
        <Button onClick={() => void modal.push("TESTCASE", TestCaseModal, {})}>
          테스트 케이스 열기
        </Button>
      </section>

      <section className="grid gap-3 rounded-lg border p-5">
        <h2 className="font-semibold">실제 문제 도구</h2>
        <div className="flex items-center gap-3">
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
        </div>
        <div className="h-12 bg-gray-900">
          <ProblemNavbar />
        </div>
        <CodeTestCaseTable executeResultList={executeResultList} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <EditorPrimitivesFixture />
    </ModalProvider>
  </StrictMode>,
);
