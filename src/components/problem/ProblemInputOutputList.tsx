import React from "react";
import { CornerDownLeft, Space } from "lucide-react";
import { ClipboardWithTooltip } from "@components/common/index";
import useCodeResultPanelStore from "@zustand/CodeResultPanelStore";
import type { ProblemInputOutput } from "@/type/Problem.type";
import ProblemContent from "./ProblemContent";

interface ProblemInputOutputProps {
  inputOutputList: ProblemInputOutput[];
}

export function ProblemInputOutputList({
  inputOutputList,
}: ProblemInputOutputProps) {
  const setSelectedIndex = useCodeResultPanelStore(
    (state) => state.setSelectedIndex,
  );

  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        입출력 예시
      </h2>
      <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CornerDownLeft className="size-3.5 text-primary" />
          다음 줄
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Space className="size-3.5 text-primary" />
          스페이스
        </span>
      </div>
      <div className="grid gap-4">
        {inputOutputList.map((example, index) => (
          <article
            key={`example-${index}`}
            className="rounded-xl border border-border bg-muted/25 p-4"
          >
            <p className="mb-3 text-xs font-bold leading-snug text-muted-foreground">
              예시 {index + 1}
            </p>
            <div className="grid gap-4 min-[420px]:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold leading-snug text-muted-foreground">
                  입력
                </p>
                <ClipboardWithTooltip
                  handleCopyCallback={() => setSelectedIndex(0)}
                  content={example.input}
                />
              </div>
              <div>
                <p className="mb-2 text-xs font-bold leading-snug text-muted-foreground">
                  출력
                </p>
                <ClipboardWithTooltip content={example.output} />
              </div>
            </div>
            {example.content && (
              <div className="mt-4">
                <ProblemContent content={example.content} />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(ProblemInputOutputList);
