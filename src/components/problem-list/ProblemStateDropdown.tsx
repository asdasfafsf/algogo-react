import React from "react";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  ListChecks,
  LogIn,
  X,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import useProblemStateDropdown from "@hook/problem-list/useProblemStateDropdown";
import { PROBLEM_STATE } from "@constant/problem.state.constant";
import { cn } from "@lib/utils";
import useMeStore from "@zustand/MeStore";

const STATE_STYLE = {
  [PROBLEM_STATE.NONE]: {
    icon: Circle,
    selectedClassName: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
  [PROBLEM_STATE.SOLVED]: {
    icon: CheckCircle2,
    selectedClassName: "bg-green-600/10 text-green-700 dark:text-green-400",
    iconClassName: "text-green-600 dark:text-green-400",
  },
  [PROBLEM_STATE.FAILED]: {
    icon: XCircle,
    selectedClassName: "bg-destructive/10 text-destructive",
    iconClassName: "text-destructive",
  },
} as const;

function ProblemStateDropdown() {
  const {
    isOpen,
    handleOpenChange,
    problemStateList,
    handleClick,
    handleReset,
  } = useProblemStateDropdown();
  const me = useMeStore((state) => state.me);
  const selectedStates = problemStateList.filter(
    ({ isSelected }) => isSelected,
  );
  const selectedLabel =
    selectedStates.length === 1
      ? selectedStates[0].name
      : selectedStates.length > 1
        ? `상태 (${selectedStates.length})`
        : "상태";

  React.useEffect(() => {
    if (!me && selectedStates.length > 0) {
      handleReset();
    }
  }, [handleReset, me, selectedStates.length]);

  if (!me) {
    return (
      <Button
        asChild
        variant="outline"
        className="h-10 w-full justify-between gap-2 bg-background px-4 text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-accent/60 hover:text-foreground sm:w-[200px]"
      >
        <Link
          to="/login?destination=/problem"
          aria-label="상태 필터, 로그인 필요"
        >
          <span className="flex min-w-0 items-center gap-2">
            <ListChecks aria-hidden className="size-4 shrink-0 opacity-50" />
            <span className="truncate text-sm font-medium">
              상태 · 로그인 필요
            </span>
          </span>
          <LogIn aria-hidden className="size-3.5 shrink-0 opacity-50" />
        </Link>
      </Button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 w-full justify-between gap-2 px-4 transition-all duration-200 sm:w-[200px]",
            "hover:border-foreground/30 hover:bg-accent/60",
            selectedStates.length > 0
              ? "border-green-600/40 bg-green-600/5 text-foreground shadow-sm hover:border-green-600/60 hover:bg-green-600/10"
              : "bg-background",
          )}
          aria-label={
            selectedStates.length > 0
              ? `상태 필터, ${selectedStates.length}개 선택됨`
              : "상태 필터"
          }
        >
          <span className="flex min-w-0 items-center gap-2">
            <ListChecks
              aria-hidden
              className={cn(
                "size-4 shrink-0 transition-colors",
                selectedStates.length > 0
                  ? "text-green-600 dark:text-green-400"
                  : "opacity-50",
              )}
            />
            <span className="truncate text-sm font-medium">
              {selectedLabel}
            </span>
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-3.5 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
              selectedStates.length > 0 ? "opacity-70" : "opacity-40",
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[min(220px,calc(100vw-2rem))] border-border/60 p-0 shadow-lg"
        aria-label="상태 선택"
      >
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              상태 선택
            </span>
            {selectedStates.length > 0 && (
              <span className="rounded-full bg-green-600/10 px-2 py-0.5 text-xs font-medium tabular-nums text-green-700 dark:text-green-400">
                {selectedStates.length}
              </span>
            )}
          </div>
          {selectedStates.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/5 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              초기화
              <X aria-hidden className="size-3.5" />
            </button>
          )}
        </div>

        <div className="p-2" role="group" aria-label="상태 필터">
          {problemStateList.map(({ isSelected, name, value }) => {
            const style = STATE_STYLE[value];
            const Icon = style.icon;
            return (
              <button
                key={value}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => handleClick(value)}
                className={cn(
                  "flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  isSelected
                    ? cn(style.selectedClassName, "font-medium")
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "size-4 shrink-0",
                    isSelected
                      ? style.iconClassName
                      : "text-muted-foreground/50",
                  )}
                />
                <span>{name}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(ProblemStateDropdown);
