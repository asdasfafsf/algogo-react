import React from "react";
import { Clock, HardDrive, Send, Target, UserRoundCheck } from "lucide-react";
import { formatProblemLevel } from "@/domain/problems/problemPresentation";
import ProblemLevelViewer from "./ProblemLevelViewer";

interface ProblemInfoProps {
  level: number;
  levelText: string;
  submitCount: number;
  answerCount: number;
  answerRate: number;
  timeout: number;
  memoryLimit: number;
  answerPeopleCount: number;
}
function ProblemInfo({
  level,
  levelText,
  submitCount,
  answerCount,
  answerPeopleCount,
  answerRate,
  memoryLimit,
  timeout,
}: ProblemInfoProps) {
  const numberFormatter = new Intl.NumberFormat("ko-KR");
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground">
      <ProblemLevelViewer
        intialState="hide"
        level={formatProblemLevel(level, levelText)}
      />
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" />
        시간 {numberFormatter.format(timeout)} ms
      </span>
      <span className="inline-flex items-center gap-1.5">
        <HardDrive className="size-3.5" />
        메모리 {numberFormatter.format(memoryLimit)} MB
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Send className="size-3.5" />
        제출 {numberFormatter.format(submitCount)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Target className="size-3.5" />
        정답 {numberFormatter.format(answerCount)} ·{" "}
        {answerRate.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}%
      </span>
      <span className="inline-flex items-center gap-1.5">
        <UserRoundCheck className="size-3.5" />
        맞힌 사람 {numberFormatter.format(answerPeopleCount)}
      </span>
    </div>
  );
}

export default React.memo(ProblemInfo);
