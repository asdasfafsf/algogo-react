import React from "react";
import { ProblemState } from "@/type/Problem.type";
import ProblemStateChip from "../Chip/ProblemStateChip";

interface ProblemTitleProps {
  title: string;
  number?: string;
  scale?: number;
  state?: ProblemState;
}
function ProblemTitle({ title, number, scale = 1, state }: ProblemTitleProps) {
  return (
    <>
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <h1
          style={{ zoom: scale }}
          className="font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl"
        >
          {number ? `${number}. ` : ""}
          {title}
        </h1>
        {state && <ProblemStateChip state={state} showIcon={false} />}
      </div>
    </>
  );
}

export default React.memo(ProblemTitle);
