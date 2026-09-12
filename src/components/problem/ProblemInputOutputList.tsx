import React from "react";
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
  const legendId = React.useId();

  return (
    <section className="min-w-0">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        입출력 예시
      </h2>
      <div
        id={legendId}
        className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
      >
        <span className="sr-only">공백 문자 범례:</span>
        <span className="inline-flex items-center gap-1.5">
          <code className="font-D2Coding text-sky-600 dark:text-sky-300">
            ·
          </code>
          공백
        </span>
        <span className="inline-flex items-center gap-1.5">
          <code className="font-D2Coding text-sky-600 dark:text-sky-300">
            ⇥
          </code>
          탭
        </span>
        <span className="inline-flex items-center gap-1.5">
          <code className="font-D2Coding text-sky-600 dark:text-sky-300">
            ↵
          </code>
          줄바꿈
        </span>
        <span className="inline-flex items-center gap-1.5">
          <code className="bg-amber-400/15 font-D2Coding text-amber-700 underline decoration-amber-600/70 underline-offset-4 dark:text-amber-300">
            ·
          </code>
          줄 끝 공백
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="font-D2Coding text-muted-foreground italic">
            빈 줄
          </span>
          내용 없는 줄
        </span>
      </div>
      <div className="grid min-w-0 gap-4">
        {inputOutputList.map((example, index) => (
          <article
            key={`example-${index}`}
            className="min-w-0 rounded-xl border border-border bg-muted/25 p-4"
          >
            <p className="mb-3 text-xs font-bold leading-snug text-muted-foreground">
              예시 {index + 1}
            </p>
            <div className="grid min-w-0 gap-4">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-bold leading-snug text-muted-foreground">
                  입력
                </p>
                <ClipboardWithTooltip
                  handleCopyCallback={() => setSelectedIndex(0)}
                  content={example.input}
                  ariaLabel={`입력 예시 ${index + 1} 복사`}
                  ariaDescribedBy={legendId}
                />
              </div>
              <div className="min-w-0">
                <p className="mb-2 text-xs font-bold leading-snug text-muted-foreground">
                  출력
                </p>
                <ClipboardWithTooltip
                  content={example.output}
                  ariaLabel={`출력 예시 ${index + 1} 복사`}
                  ariaDescribedBy={legendId}
                />
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
