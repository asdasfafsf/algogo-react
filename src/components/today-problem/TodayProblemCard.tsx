import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { ProblemCategoryBadgeList, ProblemLevelChip } from "@/components/Chip";
import ProblemStateChip from "@/components/Chip/ProblemStateChip";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";
import { formatProblemLevel } from "@/domain/problems/problemPresentation";
import type { TodayProblem } from "@/type/Problem.type";
import {
  getRosterNavigationIndex,
  type RosterNavigationKey,
} from "./rosterNavigation";

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
  if (isLoading) return "문제 내용을 불러오는 중이에요.";
  if (!content) return "문제 설명이 아직 없어요.";

  const document = new DOMParser().parseFromString(content, "text/html");
  const text = document.body.textContent?.replace(/\s+/g, " ").trim();
  return text || "문제 설명이 아직 없어요.";
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
      className="group block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${problem.title} 문제 새 창에서 열기`}
    >
      <article className="cursor-pointer rounded-lg border border-primary/10 bg-card px-5 py-4 shadow-sm transition-[border-color,box-shadow,transform] duration-150 group-hover:-translate-y-px group-hover:border-primary/30 group-hover:shadow-md group-active:translate-y-0 sm:px-6 sm:py-5">
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

        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
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
          <span className="inline-flex shrink-0 items-center gap-1 font-medium text-primary/75 transition-colors group-hover:text-primary">
            문제 보기
            <ArrowRight size={14} aria-hidden="true" />
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
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pendingFocusIndex = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pendingFocusIndex.current !== currentIndex) return;

    optionRefs.current[currentIndex]?.focus();
    pendingFocusIndex.current = null;
  }, [currentIndex]);

  const selectProblem = (index: number) => {
    if (index !== currentIndex) pendingFocusIndex.current = index;
    onProblemSelect(index);
  };

  const selectByKey = (key: RosterNavigationKey) => {
    const nextIndex = getRosterNavigationIndex(
      currentIndex,
      problems.length,
      key,
    );
    if (nextIndex !== null) selectProblem(nextIndex);
  };

  return (
    <div>
      <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">
        오늘의 문제 목록
      </p>
      <ul className="list-none rounded-lg border border-border/50 p-1.5">
        {problems.map((problem, index) => (
          <ProblemRosterRow
            key={problem.uuid}
            problem={problem}
            index={index}
            selected={index === currentIndex}
            optionRef={(element) => {
              optionRefs.current[index] = element;
            }}
            onSelect={() => selectProblem(index)}
            onNavigate={selectByKey}
          />
        ))}
      </ul>
    </div>
  );
}

function ProblemRosterRow({
  problem,
  index,
  selected,
  optionRef,
  onSelect,
  onNavigate,
}: {
  problem: TodayProblem;
  index: number;
  selected: boolean;
  optionRef: (element: HTMLButtonElement | null) => void;
  onSelect?: () => void;
  onNavigate?: (key: RosterNavigationKey) => void;
}) {
  return (
    <li
      className={`group/row flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        selected
          ? "cursor-pointer bg-primary/10 hover:bg-primary/15"
          : "cursor-pointer hover:bg-muted/40"
      }`}
    >
      <button
        ref={optionRef}
        type="button"
        aria-current={selected ? "true" : undefined}
        tabIndex={selected ? 0 : -1}
        className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={onSelect}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === "Home" ||
            event.key === "End"
          ) {
            event.preventDefault();
            onNavigate?.(event.key);
            return;
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect?.();
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
      </button>
      <a
        href={problemPath(problem.uuid)}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded p-1 text-muted-foreground/40 transition-colors hover:bg-muted/60 hover:text-foreground sm:opacity-0 sm:group-hover/row:opacity-100 sm:focus-visible:opacity-100"
        aria-label={`${problem.title} 문제 새 창에서 열기`}
      >
        <ArrowRight size={14} />
      </a>
    </li>
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
