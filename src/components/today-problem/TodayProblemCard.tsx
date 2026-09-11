import { ArrowRight } from "lucide-react";
import { ProblemCategoryBadgeList, ProblemLevelChip } from "@/components/Chip";
import ProblemStateChip from "@/components/Chip/ProblemStateChip";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";
import { formatProblemLevel } from "@/domain/problems/problemPresentation";
import type { TodayProblem } from "@/type/Problem.type";

interface TodayProblemCardProps {
  problem: TodayProblem;
  index: number;
  content?: string;
  isContentLoading: boolean;
}

function getContentPreview(
  content: string | undefined,
  isLoading: boolean,
): string {
  if (isLoading) return "문제 설명을 불러오는 중입니다.";
  if (!content) return "문제 설명이 제공되지 않았습니다.";

  const document = new DOMParser().parseFromString(content, "text/html");
  const text = document.body.textContent?.replace(/\s+/g, " ").trim();
  return text || "문제 설명이 제공되지 않았습니다.";
}

function problemPath(uuid: string): string {
  return `/problem/${uuid}`;
}

export function TodayProblemCard({
  problem,
  index,
  content,
  isContentLoading,
}: TodayProblemCardProps) {
  const preview = getContentPreview(content, isContentLoading);

  return (
    <a
      href={problemPath(problem.uuid)}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${problem.title} 문제 새 창에서 열기`}
    >
      <article className="cursor-pointer rounded-lg border border-primary/10 bg-card px-5 py-4 shadow-sm transition-all duration-150 hover:border-primary/20 hover:shadow-md sm:px-6 sm:py-5">
        <div className="flex items-baseline gap-2">
          <span className="shrink-0 font-mono text-sm font-bold tabular-nums text-foreground/25">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {problem.title}
          </h2>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <ProblemLevelChip
            level={formatProblemLevel(problem.level, problem.levelText)}
          />
          {problem.typeList?.length ? (
            <ProblemCategoryBadgeList categories={problem.typeList} />
          ) : null}
          {problem.state !== PROBLEM_STATE.NONE && (
            <ProblemStateChip state={problem.state} showIcon={false} />
          )}
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {preview}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>
            <span className="font-medium tabular-nums text-foreground/70">
              {problem.answerRate}%
            </span>{" "}
            정답률
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <span className="font-medium tabular-nums text-foreground/70">
              {problem.submitCount.toLocaleString()}
            </span>{" "}
            제출
          </span>
        </div>
      </article>
    </a>
  );
}

interface TodayProblemRosterProps {
  problems: TodayProblem[];
  currentIndex: number;
  onProblemSelect: (index: number) => void;
}

export function TodayProblemRoster({
  problems,
  currentIndex,
  onProblemSelect,
}: TodayProblemRosterProps) {
  return (
    <div>
      <p className="mb-2 px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        전체 문제
      </p>
      <div
        className="rounded-lg border border-border/50 p-1.5"
        role="listbox"
        aria-label="문제 목록"
      >
        {problems.map((problem, index) => (
          <ProblemRosterRow
            key={problem.uuid}
            problem={problem}
            index={index}
            selected={index === currentIndex}
            onSelect={() => onProblemSelect(index)}
            onArrowSelect={(direction) =>
              onProblemSelect(
                direction === "next"
                  ? (index + 1) % problems.length
                  : (index - 1 + problems.length) % problems.length,
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

function ProblemRosterRow({
  problem,
  index,
  selected,
  onSelect,
  onArrowSelect,
}: {
  problem: TodayProblem;
  index: number;
  selected: boolean;
  onSelect?: () => void;
  onArrowSelect?: (direction: "previous" | "next") => void;
}) {
  return (
    <div
      role="option"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={`group/row flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        selected ? "bg-primary/10" : "cursor-pointer hover:bg-muted/40"
      }`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" && onArrowSelect) {
          event.preventDefault();
          onArrowSelect("next");
          return;
        }
        if (event.key === "ArrowUp" && onArrowSelect) {
          event.preventDefault();
          onArrowSelect("previous");
          return;
        }
        if ((event.key === "Enter" || event.key === " ") && onSelect) {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <RosterStateIcon state={problem.state} />
      <span className="w-5 shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={`flex-1 truncate text-sm ${selected ? "font-medium text-foreground" : "text-foreground/80"}`}
      >
        {problem.title}
      </span>
      <ProblemLevelChip
        level={formatProblemLevel(problem.level, problem.levelText)}
        className="shrink-0"
      />
      {problem.typeList?.length ? (
        <ProblemCategoryBadgeList
          categories={problem.typeList}
          className="shrink-0"
        />
      ) : null}
      <a
        href={problemPath(problem.uuid)}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded p-1 text-muted-foreground/40 transition-colors hover:bg-muted/60 hover:text-foreground sm:opacity-0 sm:group-hover/row:opacity-100 sm:focus-visible:opacity-100"
        aria-label={`${problem.title} 문제 새 창에서 열기`}
        onClick={(event) => event.stopPropagation()}
      >
        <ArrowRight size={14} />
      </a>
    </div>
  );
}

function RosterStateIcon({ state }: { state: TodayProblem["state"] }) {
  if (state === PROBLEM_STATE.SOLVED) {
    return (
      <span className="grid size-4 shrink-0 place-items-center rounded-full border border-green-500/50 bg-green-50 text-green-600">
        <span className="text-[10px] font-bold">✓</span>
      </span>
    );
  }
  if (state === PROBLEM_STATE.FAILED) {
    return (
      <span className="grid size-4 shrink-0 place-items-center rounded-full border border-red-500/50 bg-red-50 text-red-600">
        <span className="text-[10px] font-bold">×</span>
      </span>
    );
  }
  return (
    <span className="size-4 shrink-0 rounded-full border border-foreground/15 bg-foreground/5" />
  );
}
