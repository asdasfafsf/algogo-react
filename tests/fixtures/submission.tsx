import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { submitCode, type SubmissionPorts } from "@/application/editor/submit";
import { getSubmissionFeedback } from "@/domain/editor/submission";
import { Button } from "@components/ui/button";
import useToastModal from "@hook/modal/useToastModal";
import ModalProvider from "@plugins/modal/ModalProvider";
import "../../src/index.css";

type Scenario =
  "success" | "copy-failed" | "popup-blocked" | "unsupported" | "empty";

const scenarioLabels: Record<Scenario, string> = {
  success: "정상 제출",
  "copy-failed": "복사 실패",
  "popup-blocked": "팝업 차단",
  unsupported: "미지원 출처",
  empty: "빈 코드",
};

function SubmissionFixture() {
  const { toast } = useToastModal();
  const [result, setResult] = useState("아직 제출하지 않음");

  const runScenario = (scenario: Scenario) => {
    const ports: SubmissionPorts = {
      openPage: () => scenario !== "popup-blocked",
      copyText: async () => {
        if (scenario === "copy-failed") {
          throw new Error("fixture clipboard failure");
        }
      },
    };

    void submitCode(
      {
        problem: {
          source: scenario === "unsupported" ? "OTHER" : "BOJ",
          sourceId: 1000,
        },
        code: scenario === "empty" ? " \n\t " : "print(1)\n",
      },
      ports,
    ).then((submissionResult) => {
      const feedback = getSubmissionFeedback(submissionResult);
      setResult(`${scenarioLabels[scenario]}: ${feedback.message}`);
      return toast(feedback.message, 5000, feedback.variant);
    });
  };

  return (
    <main className="mx-auto grid max-w-2xl gap-5 p-8">
      <div className="grid gap-2">
        <h1 className="text-xl font-semibold">제출 흐름 검증</h1>
        <p className="text-sm text-muted-foreground">
          각 결과의 사용자 안내와 알림 모양을 확인합니다.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(scenarioLabels) as Scenario[]).map((scenario) => (
          <Button key={scenario} onClick={() => runScenario(scenario)}>
            {scenarioLabels[scenario]}
          </Button>
        ))}
      </div>
      <output
        aria-live="polite"
        className="rounded-md border bg-muted p-4 text-sm"
      >
        {result}
      </output>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <SubmissionFixture />
    </ModalProvider>
  </StrictMode>,
);
