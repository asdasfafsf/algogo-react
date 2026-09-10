import React from "react";
import ProblemContent from "./ProblemContent";

interface ProblemInputOutputProps {
  input: string;
  output: string;
  scale?: number;
}
export function ProblemInputOutput({
  input,
  output,
  scale = 1,
}: ProblemInputOutputProps) {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2
          style={{ zoom: scale }}
          className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          입력 형식
        </h2>
        <ProblemContent scale={scale} content={input} />
      </section>
      <section className="space-y-3">
        <h2
          style={{ zoom: scale }}
          className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          출력 형식
        </h2>
        <ProblemContent scale={scale} content={output} />
      </section>
    </div>
  );
}

export default React.memo(ProblemInputOutput);
