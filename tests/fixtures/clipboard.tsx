import { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ClipboardWithTooltip } from "@components/common";
import type { ClipboardWriteText } from "@lib/clipboard";
import "../../src/index.css";

const sampleContent = "  첫 줄  \n둘째 줄\n\n끝 공백 ";

function ClipboardFixture() {
  const failedAttempts = useRef(0);
  const [actualCopyResult, setActualCopyResult] =
    useState("아직 복사하지 않음");
  const [retryCopyResult, setRetryCopyResult] = useState("아직 복사하지 않음");

  const failOnceWriter: ClipboardWriteText = async (content) => {
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
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClipboardFixture />
  </StrictMode>,
);
