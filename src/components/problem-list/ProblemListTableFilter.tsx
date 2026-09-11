import React from "react";
import useProblemTableFilter from "@hook/problem-list/useProblemTableFilter";
import { CheckCircle2, Circle, Signal, Tag, X, XCircle } from "lucide-react";
import { PROBLEM_STATE } from "@constant/problem.state.constant";
import { cn } from "@lib/utils";

const STATUS_STYLE: Record<string, { icon: typeof Circle; className: string }> =
  {
    [PROBLEM_STATE.NONE]: {
      icon: Circle,
      className:
        "border-amber-600/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    },
    [PROBLEM_STATE.SOLVED]: {
      icon: CheckCircle2,
      className:
        "border-green-600/20 bg-green-600/10 text-green-700 dark:text-green-400",
    },
    [PROBLEM_STATE.FAILED]: {
      icon: XCircle,
      className: "border-destructive/20 bg-destructive/10 text-destructive",
    },
  };

function ProblemListTableFilter() {
  const {
    problemOptionList,
    resetProblemOptions: handleReset,
    removeProblemOption: handleRemoveOption,
  } = useProblemTableFilter();
  const selectedOptions = problemOptionList
    .map((option, index) => ({ ...option, index }))
    .filter((option) => option.isSelected);

  if (selectedOptions.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="활성 필터"
    >
      {selectedOptions.map(({ type, name, value, index }) => {
        const statusStyle = type === "상태" ? STATUS_STYLE[value] : undefined;
        const Icon =
          type === "난이도"
            ? Signal
            : type === "유형"
              ? Tag
              : (statusStyle?.icon ?? Tag);
        return (
          <button
            key={`${type}_${name}`}
            type="button"
            onClick={() => handleRemoveOption(index)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-full border px-2 text-xs font-medium transition-colors hover:brightness-95 active:brightness-90 dark:hover:brightness-110 dark:active:brightness-125",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              type === "난이도"
                ? "border-tier-gold/25 bg-tier-gold/10 text-tier-gold"
                : type === "유형"
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : (statusStyle?.className ??
                    "border-border bg-muted text-muted-foreground"),
            )}
            aria-label={`${name} 필터 제거`}
          >
            <Icon aria-hidden className="size-3.5 shrink-0" />
            <span>{name}</span>
            <X aria-hidden className="size-3.5 shrink-0 opacity-60" />
          </button>
        );
      })}
      {selectedOptions.length > 1 && (
        <button
          type="button"
          onClick={handleReset}
          className="ml-1 inline-flex h-7 items-center gap-1.5 border-l border-border/50 pl-3 text-xs text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:text-destructive/80"
          aria-label="필터 전체 초기화"
        >
          전체 초기화
          <X aria-hidden className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export default React.memo(ProblemListTableFilter);
