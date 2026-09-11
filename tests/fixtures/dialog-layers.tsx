import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import ModalProvider from "@plugins/modal/ModalProvider";
import useModal from "@plugins/modal/useModal";
import useAlertModal from "@hook/useAlertModal";
import useConfirmModal from "@hook/useConfirmModal";
import useToastModal from "@hook/modal/useToastModal";
import useLoadingModal from "@hook/modal/useLoadingModal";
import CodeEditorSettingsModal from "@components/problem/CodeEditorSettingsModal";
import CodeTemplateAddModal from "@components/problem/CodeTemplateAddModal";
import TestCaseModal from "@components/problem/TestCaseModal";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";
import "../../src/index.css";
import "../../src/loader/MonacoLoader";

function DialogLayersFixture() {
  const modal = useModal();
  const [alert] = useAlertModal();
  const [confirm] = useConfirmModal();
  const { toast } = useToastModal();
  const { startLoading, endLoading } = useLoadingModal();
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState("보존할 입력");
  const [results, setResults] = useState<string[]>([]);
  useEffect(
    () => () => {
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
    },
    [],
  );

  return (
    <main className="mx-auto grid max-w-2xl gap-4 p-8">
      <h1 className="text-xl font-semibold">다이얼로그 레이어 검증</h1>
      <p>인증과 서버 요청 없이 실제 모달 컴포넌트를 확인합니다.</p>
      <Button
        onClick={async () => {
          const confirmed = await confirm("확인과 취소 결과를 검사합니다.");
          setResults((current) => [
            ...current,
            confirmed ? "확인 결과 true" : "취소 결과 false",
          ]);
        }}
      >
        확인 결과 검증
      </Button>
      <Button
        onClick={() => {
          void toast("자동으로 닫힐 토스트", 1000);
          void alert("토스트가 끝나도 남을 알림");
        }}
      >
        토스트와 알림 열기
      </Button>
      <Button
        onClick={() => {
          startLoading("닫힘 방지 검증");
          loadingTimer.current = setTimeout(endLoading, 10000);
        }}
      >
        로딩 10초 열기
      </Button>
      <Button
        onClick={() =>
          void modal.push("CODE_EDITOR_SETTINGS", CodeEditorSettingsModal, {})
        }
      >
        화면 설정 열기
      </Button>
      <Button onClick={() => void modal.push("TESTCASE", TestCaseModal, {})}>
        테스트 케이스 열기
      </Button>
      <Button
        onClick={() =>
          void modal.push("CODE_TEMPLATE_ADD_MODAL", CodeTemplateAddModal, {
            modalKey: "CODE_TEMPLATE_ADD_MODAL",
            content: "print(1)",
          })
        }
      >
        템플릿 열기
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button>부모 대화상자 열기</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>부모 대화상자</DialogTitle>
          <DialogDescription>
            자식이 닫혀도 입력과 부모가 유지되어야 합니다.
          </DialogDescription>
          <Input
            aria-label="부모 입력"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Select defaultValue="one">
            <SelectTrigger aria-label="부모 선택 메뉴">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one">첫 번째</SelectItem>
              <SelectItem value="two">두 번째</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => void alert("자식 알림")}>
            자식 알림 열기
          </Button>
          <Button
            onClick={() => {
              void alert("첫 번째 알림").then(() =>
                setResults((current) => [...current, "첫 번째 닫힘"]),
              );
              void alert("두 번째 알림").then(() =>
                setResults((current) => [...current, "두 번째 닫힘"]),
              );
            }}
          >
            알림 두 개 열기
          </Button>
        </DialogContent>
      </Dialog>
      <output aria-label="완료 순서">{results.join(", ") || "없음"}</output>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <DialogLayersFixture />
    </ModalProvider>
  </StrictMode>,
);
