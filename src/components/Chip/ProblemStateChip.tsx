import { CircleCheck, CircleX, Clock } from "lucide-react";
import { ProblemState } from "@/type/Problem.type";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";

interface ProblemStateChipProps {
  state: ProblemState;
  showNoneState?: boolean;
  showIcon?: boolean;
}

export default function ProblemStateChip({
  state,
  showNoneState = true,
  showIcon = true,
}: ProblemStateChipProps) {
  // showNoneState가 false이고 상태가 NONE이면 아무것도 렌더링하지 않음
  if (!showNoneState && state === PROBLEM_STATE.NONE) {
    return null;
  }

  switch (state) {
    case PROBLEM_STATE.SOLVED:
      return (
        <div className="flex items-center justify-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full border border-green-200">
          {showIcon && <CircleCheck className="w-3.5 h-3.5 text-green-600" />}
          <span className="text-xs font-medium text-green-700">성공</span>
        </div>
      );
    case PROBLEM_STATE.FAILED:
      return (
        <div className="flex items-center justify-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-full border border-red-200">
          {showIcon && <CircleX className="w-3.5 h-3.5 text-red-600" />}
          <span className="text-xs font-medium text-red-700">실패</span>
        </div>
      );
    case PROBLEM_STATE.NONE:
    default:
      return showNoneState ? (
        <div className="flex items-center justify-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200">
          {showIcon && <Clock className="w-3.5 h-3.5 text-amber-600" />}
          <span className="text-xs font-medium text-amber-700">미해결</span>
        </div>
      ) : null;
  }
}
