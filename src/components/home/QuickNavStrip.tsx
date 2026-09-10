import { LayoutGrid, LoaderCircle, Shuffle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DailyProblemCard from "./DailyProblemCard";
import useHomeTodayProblems from "@hook/home/useHomeTodayProblems";

function PreparedCard({
  kind,
  label,
}: {
  kind: "random" | "category";
  label: string;
}) {
  const Icon = kind === "random" ? Shuffle : LayoutGrid;
  return (
    <div
      className="flex flex-1 cursor-not-allowed items-center gap-3 rounded-xl border border-border/40 bg-card p-4 transition-colors duration-200 hover:bg-muted/50"
      aria-disabled="true"
      aria-label={`${label}: 준비중`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="ml-auto text-xs text-muted-foreground">준비중</span>
    </div>
  );
}

function DailySlotMessage({ state }: { state: "loading" | "empty" | "error" }) {
  const navigate = useNavigate();
  const text = {
    loading: "오늘의 문제를 불러오는 중입니다",
    empty: "오늘의 문제가 아직 없습니다",
    error: "오늘의 문제를 불러오지 못했습니다",
  }[state];

  return (
    <div
      className="flex h-[170px] flex-col gap-4 rounded-xl border border-border/40 bg-card p-5 sm:col-span-2 sm:p-6"
      role={state === "error" ? "alert" : "status"}
      aria-label={`오늘의 문제: ${text}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          오늘의 문제
        </span>
        <button
          type="button"
          onClick={() => navigate("/problem/today")}
          className="inline-flex items-center gap-0.5 rounded-md bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          전체보기
          <ChevronRight size={11} className="opacity-50" />
        </button>
      </div>
      <div className="flex flex-1 items-center gap-2 text-sm font-medium text-muted-foreground">
        {state === "loading" && (
          <LoaderCircle className="size-4 animate-spin" />
        )}
        {text}
      </div>
    </div>
  );
}

export default function QuickNavStrip() {
  const { data: problems = [], isLoading, isError } = useHomeTodayProblems();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {isLoading ? (
        <DailySlotMessage state="loading" />
      ) : isError ? (
        <DailySlotMessage state="error" />
      ) : problems.length === 0 ? (
        <DailySlotMessage state="empty" />
      ) : (
        <DailyProblemCard problems={problems} />
      )}
      <div className="flex h-[170px] flex-col gap-3">
        <PreparedCard kind="random" label="랜덤 도전" />
        <PreparedCard kind="category" label="유형별 문제" />
      </div>
    </div>
  );
}
