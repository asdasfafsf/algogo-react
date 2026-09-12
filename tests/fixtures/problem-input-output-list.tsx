import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import ProblemInputOutputList from "@/components/problem/ProblemInputOutputList";
import useCodeResultPanelStore from "@/zustand/CodeResultPanelStore";
import "../../src/index.css";

const examples = [
  {
    order: 1,
    input:
      "10  20\t30  \n\n긴_줄_" + "1234567890".repeat(12) + "\n마지막 줄\t ",
    output: "60\n결과  값\t\n",
    content: "",
  },
  {
    order: 2,
    input: "\t\n  \n끝",
    output: "빈 줄과 탭을 확인합니다.  ",
    content: "",
  },
];

useCodeResultPanelStore.setState({ selectedIndex: 1 });

function ProblemInputOutputFixture() {
  const [isNarrow, setIsNarrow] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const selectedIndex = useCodeResultPanelStore((state) => state.selectedIndex);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    return () => document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <main className="mx-auto grid max-w-5xl gap-5 p-4 sm:p-8">
      <div>
        <h1 className="text-xl font-semibold">입출력 예시 공백 표시 검증</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          입력을 복사하면 결과 패널 선택 값이 0으로 유지되는지도 확인합니다.
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
        <button
          type="button"
          className="rounded border px-3 py-2 text-sm"
          onClick={() => setIsDark((current) => !current)}
        >
          {isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        </button>
        <output aria-live="polite">결과 패널 선택 값: {selectedIndex}</output>
      </div>

      <div
        className="transition-[width]"
        style={{ width: isNarrow ? 320 : "100%", maxWidth: "100%" }}
      >
        <ProblemInputOutputList inputOutputList={examples} />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <ProblemInputOutputFixture />,
);
