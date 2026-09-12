import { StrictMode, useCallback, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ClipboardWithTooltip } from "@components/common";
import type { ClipboardWriteText } from "@lib/clipboard";
import PromptModal from "@components/modal/PromptModal";
import CodeResultInput from "@components/problem/CodeResultInput";
import CodeResultOutput from "@components/problem/CodeResultOutput";
import useCodeResultPanel from "@hook/useCodeResultPanel";
import ModalProvider from "@plugins/modal/ModalProvider";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import { Button } from "@components/ui/button";
import "../../src/index.css";

const sampleContent = "  첫 줄  \n둘째 줄\n\n끝 공백 ";

useCodeEditorStore.setState({
  input: "실패해도 보존할 실행 입력",
  output: {
    seq: 1,
    processTime: 12,
    memory: 34,
    code: "0000",
    result: "실행 결과 원문",
    detail: "상세 원문",
  },
});

const waitForPendingState = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 400);
  });

function CodeResultClipboardFixture() {
  const pasteAttempts = useRef(0);
  const copyAttempts = useRef(0);
  const [copiedOutput, setCopiedOutput] = useState("아직 복사하지 않음");

  const clipboardReader = useCallback(async () => {
    await waitForPendingState();
    pasteAttempts.current += 1;
    if (pasteAttempts.current === 1) {
      throw new Error("fixture input paste failure");
    }
    return "fixture에서 붙여넣은 입력";
  }, []);

  const clipboardWriter = useCallback(async (content: string) => {
    await waitForPendingState();
    copyAttempts.current += 1;
    if (copyAttempts.current === 1) {
      throw new Error("fixture output copy failure");
    }
    setCopiedOutput(JSON.stringify(content));
  }, []);

  const {
    input,
    output,
    inputTextAreaRef,
    handleChangeInput,
    handleClickPasteInput,
    handleClickCopyOutput,
    handleClickResetOutput,
    isInputPastePending,
    isOutputCopyPending,
  } = useCodeResultPanel({ clipboardReader, clipboardWriter });

  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold">실행 패널 클립보드</h2>
      <p>각 동작은 첫 시도에 실패하고, 같은 값을 보존한 뒤 재시도됩니다.</p>
      <div className="grid min-h-52 grid-cols-2 gap-3 rounded border">
        <CodeResultInput
          input={input}
          inputTextAreaRef={inputTextAreaRef}
          onInputChange={handleChangeInput}
          onPaste={handleClickPasteInput}
          onRun={() => undefined}
          pastePending={isInputPastePending}
        />
        <CodeResultOutput
          isPending={false}
          copyPending={isOutputCopyPending}
          handleClickCopy={handleClickCopyOutput}
          handleClickReset={handleClickResetOutput}
          handleClickRun={() => undefined}
          output={output}
        />
      </div>
      <output aria-label="실행 결과 복사 원문">{copiedOutput}</output>
    </section>
  );
}

function PromptClipboardFixture() {
  const pasteAttempts = useRef(0);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("아직 확인하지 않음");

  const clipboardReader = useCallback(async () => {
    await waitForPendingState();
    pasteAttempts.current += 1;
    if (pasteAttempts.current === 1) {
      throw new Error("fixture prompt paste failure");
    }
    return "fixture에서 붙여넣은 Prompt 값";
  }, []);

  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold">Prompt 붙여넣기</h2>
      <p>첫 시도 실패 시 기존 값을 보존하고, 두 번째 시도에 교체합니다.</p>
      <Button className="w-fit" onClick={() => setOpen(true)}>
        Prompt 열기
      </Button>
      <output aria-label="Prompt 확인 결과">{result}</output>
      {open ? (
        <PromptModal
          clipboardReader={clipboardReader}
          content="Prompt fixture 입력"
          defaultValue="보존할 Prompt 값"
          reject={() => setOpen(false)}
          resolve={(value) => {
            setResult(JSON.stringify(value));
            setOpen(false);
          }}
          title="Prompt 클립보드 검증"
        />
      ) : null}
    </section>
  );
}

function ClipboardFixture() {
  const failedAttempts = useRef(0);
  const [actualCopyResult, setActualCopyResult] =
    useState("아직 복사하지 않음");
  const [retryCopyResult, setRetryCopyResult] = useState("아직 복사하지 않음");

  const failOnceWriter: ClipboardWriteText = async (content) => {
    await waitForPendingState();
    failedAttempts.current += 1;

    if (failedAttempts.current === 1) {
      throw new Error("fixture clipboard write failure");
    }

    setRetryCopyResult(JSON.stringify(content));
  };

  return (
    <main className="mx-auto grid max-w-2xl gap-6 p-8">
      <section className="grid gap-3">
        <h1 className="text-xl font-semibold">클립보드 툴팁 검증</h1>
        <p>
          공백과 줄바꿈 기호는 표시용이며, 복사할 때는 아래 원문을 변경하지
          않습니다.
        </p>
        <code className="rounded bg-muted p-3" data-testid="clipboard-source">
          {JSON.stringify(sampleContent)}
        </code>
        <ClipboardWithTooltip
          ariaLabel="실제 클립보드 복사"
          content={sampleContent}
          handleCopyCallback={(content) =>
            setActualCopyResult(JSON.stringify(content))
          }
        />
        <output aria-label="실제 복사 원문" data-testid="actual-copy-result">
          {actualCopyResult}
        </output>
      </section>

      <section className="grid gap-3">
        <h2 className="text-lg font-semibold">실패 후 재시도</h2>
        <p>첫 클릭은 실패하고, 두 번째 클릭은 같은 원문을 복사합니다.</p>
        <ClipboardWithTooltip
          ariaLabel="실패 후 재시도 복사"
          clipboardWriter={failOnceWriter}
          content={sampleContent}
        />
        <output aria-label="재시도 복사 원문" data-testid="retry-copy-result">
          {retryCopyResult}
        </output>
      </section>
      <CodeResultClipboardFixture />
      <PromptClipboardFixture />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <ClipboardFixture />
    </ModalProvider>
  </StrictMode>,
);
