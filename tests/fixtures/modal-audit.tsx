import { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { Button } from "@components/ui/button";
import AlertModal from "@components/modal/AlertModal";
import ConfirmModal from "@components/modal/ConfirmModal";
import LoadingModal from "@components/modal/LoadingModal";
import PromptModal from "@components/modal/PromptModal";
import ToastModal from "@components/modal/ToastModal";
import CodeEditorSettingsModal from "@components/problem/CodeEditorSettingsModal";
import CodeTemplateAddModal from "@components/problem/CodeTemplateAddModal";
import CompilerInfoModal from "@components/problem/CompilerInfoModal";
import ModalProvider from "@plugins/modal/ModalProvider";
import type { ModalHandle } from "@plugins/modal/ModalController";
import useModal from "@plugins/modal/useModal";
import "../../src/index.css";

declare global {
  interface Window {
    modalAuditRoot?: Root;
  }
}

const longMessage =
  "아주 긴 안내 문구가 들어와도 제목과 본문, 작업 버튼이 서로 겹치지 않고 읽기 좋은 폭으로 줄바꿈되어야 합니다. 작은 화면에서도 마지막 문장과 버튼을 모두 확인할 수 있어야 합니다.";

function ModalAuditLauncher() {
  const modal = useModal();
  const loadingRef = useRef<ModalHandle<void> | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [result, setResult] = useState("아직 실행한 작업이 없습니다.");

  const record = (label: string, value: unknown) => {
    setResult(`${label}: ${String(value)}`);
  };

  const openLoading = () => {
    if (loadingRef.current) return;
    const handle = modal.open<{ message: string }, void>(
      "fixture-loading",
      LoadingModal,
      {
        message: "컴파일 결과를 불러오는 중입니다",
      },
    );
    loadingRef.current = handle;
    window.setTimeout(() => {
      handle.resolve(undefined);
      loadingRef.current = null;
      record("로딩", "완료");
    }, 4000);
  };

  return (
    <main className="min-h-dvh bg-muted/30 p-4 text-foreground sm:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-background p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight">모달 점검</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          공통 모달과 에디터 모달의 반응형 표면, 스크롤, 버튼 위계를 확인합니다.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            variant="outline"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
              setIsDark((value) => !value);
            }}
          >
            {isDark ? "밝은 테마로 전환" : "어두운 테마로 전환"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void modal
                .push("fixture-alert", AlertModal, {
                  title: "긴 안내",
                  content: longMessage,
                })
                .then((value) => record("알림", value));
            }}
          >
            알림 열기
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void modal
                .push<
                  {
                    title: string;
                    content: string;
                    confirmText: string;
                    variant: "destructive";
                  },
                  boolean
                >("fixture-confirm", ConfirmModal, {
                  title: "템플릿 삭제",
                  content: "삭제한 템플릿은 복구할 수 없습니다.",
                  confirmText: "삭제",
                  variant: "destructive",
                })
                .then((value) => record("확인", value));
            }}
          >
            위험 확인 열기
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void modal
                .push("fixture-prompt", PromptModal, {
                  title: "템플릿 이름",
                  content: longMessage,
                  defaultValue: "긴 이름의 기본 템플릿",
                  clipboardReader: null,
                })
                .then((value) => record("입력", value));
            }}
          >
            입력 열기
          </Button>
          <Button variant="outline" onClick={openLoading}>
            로딩 열기
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void modal
                .push<
                  {
                    content: string;
                    duration: number;
                    variant: "fail";
                  },
                  boolean
                >("Toast", ToastModal, {
                  content: longMessage,
                  duration: 5000,
                  variant: "fail",
                })
                .then((value) => record("토스트", value));
            }}
          >
            오류 토스트 열기
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void modal
                .push("fixture-editor-settings", CodeEditorSettingsModal, {})
                .then((value) => record("화면 설정", value));
            }}
          >
            화면 설정 열기
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void modal
                .push("fixture-template", CodeTemplateAddModal, {
                  title: "아주 긴 이름의 코드 템플릿 수정",
                  isEdit: true,
                  uuid: "fixture-template",
                  name: "긴 템플릿 이름이 입력 너비 안에서 표시되는지 확인",
                  description: longMessage,
                  content:
                    "function solve(input) {\n  return input.trim();\n}\n",
                })
                .then((value) => record("템플릿", value));
            }}
          >
            템플릿 수정 열기
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              void modal
                .push("fixture-compiler-info", CompilerInfoModal, {})
                .then((value) => record("컴파일러 정보", value));
            }}
          >
            컴파일러 정보 열기
          </Button>
        </div>

        <output
          aria-label="마지막 모달 결과"
          className="mt-6 block rounded-lg bg-muted px-4 py-3 text-sm"
        >
          {result}
        </output>
      </div>
    </main>
  );
}

const root =
  window.modalAuditRoot ?? createRoot(document.getElementById("root")!);
window.modalAuditRoot = root;

root.render(
  <StrictMode>
    <ModalProvider>
      <ModalAuditLauncher />
    </ModalProvider>
  </StrictMode>,
);
