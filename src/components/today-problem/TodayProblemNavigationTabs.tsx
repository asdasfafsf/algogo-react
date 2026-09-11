import { Fragment } from "react";
import { Check, X } from "lucide-react";
import { TabsList, TabsTrigger } from "@components/ui/tabs";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";
import type { TodayProblem } from "@/type/Problem.type";

interface TodayProblemNavigationTabsProps {
  problems: TodayProblem[];
  currentIndex: number;
}

function difficultyRing(level: number): string {
  if (level >= 26) return "ring-ruby/30";
  if (level >= 21) return "ring-diamond/30";
  if (level >= 16) return "ring-platinum/30";
  if (level >= 11) return "ring-gold/30";
  if (level >= 6) return "ring-silver/30";
  if (level >= 1) return "ring-bronze/30";
  return "ring-muted-foreground/20";
}

function circleClass(problem: TodayProblem, selected: boolean): string {
  if (problem.state === PROBLEM_STATE.SOLVED) {
    return selected
      ? "scale-110 border-green-500 bg-green-50 text-green-600 ring-2 ring-green-500/30 data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
      : "border-green-500/50 bg-green-50 text-green-600";
  }
  if (problem.state === PROBLEM_STATE.FAILED) {
    return selected
      ? "scale-110 border-red-500 bg-red-50 text-red-600 ring-2 ring-red-500/30 data-[state=active]:bg-red-50 data-[state=active]:text-red-600"
      : "border-red-500/50 bg-red-50 text-red-600";
  }
  if (selected) {
    return "scale-110 border-primary bg-primary/20 text-primary ring-2 ring-primary/30 data-[state=active]:bg-primary/20 data-[state=active]:text-primary";
  }
  return `border-foreground/12 bg-foreground/5 text-foreground/40 ring-1 ${difficultyRing(problem.level)}`;
}

export function TodayProblemNavigationTabs({
  problems,
  currentIndex,
}: TodayProblemNavigationTabsProps) {
  return (
    <TabsList
      className="flex h-auto items-center justify-center rounded-none bg-transparent p-0 text-inherit"
      aria-label="문제 탐색"
    >
      {problems.map((problem, index) => {
        const isSelected = index === currentIndex;
        return (
          <Fragment key={problem.uuid}>
            {index > 0 && (
              <span
                className={`h-px w-5 transition-colors duration-200 sm:w-7 ${
                  problems[index - 1].state === PROBLEM_STATE.SOLVED
                    ? "bg-green-500/40"
                    : "bg-foreground/8"
                }`}
                aria-hidden="true"
              />
            )}
            <TabsTrigger
              value={problem.uuid}
              aria-label={`문제 ${index + 1}: ${problem.title}`}
              className={`size-8 cursor-pointer rounded-full border p-0 transition-all duration-200 focus-visible:ring-offset-2 data-[state=active]:shadow-none sm:size-9 ${circleClass(problem, isSelected)}`}
            >
              {problem.state === PROBLEM_STATE.SOLVED ? (
                <Check size={14} strokeWidth={3} />
              ) : problem.state === PROBLEM_STATE.FAILED ? (
                <X size={14} strokeWidth={3} />
              ) : (
                <span className="text-xs font-semibold">{index + 1}</span>
              )}
            </TabsTrigger>
          </Fragment>
        );
      })}
    </TabsList>
  );
}
