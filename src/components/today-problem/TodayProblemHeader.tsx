import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";
import {
  canNavigateToNextDay,
  formatUtcMidnightCountdown,
  millisecondsUntilNextUtcMidnight,
  nextDayOffset,
  previousDayOffset,
} from "@/domain/problems";
import type { TodayProblem } from "@/type/Problem.type";
import {
  dayOffsetFromDateInput,
  normalizeTodayProblemDay,
  TODAY_PROBLEM_MIN_DAY,
} from "@/domain/problems/todayProblemPage";

interface TodayProblemHeaderProps {
  problems: TodayProblem[];
}

function dateForOffset(dayOffset: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  return date;
}

function dateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>{formatUtcMidnightCountdown(millisecondsUntilNextUtcMidnight(now))}</>
  );
}

export function TodayProblemHeader({ problems }: TodayProblemHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawDay = searchParams.get("day");
  const day = normalizeTodayProblemDay(rawDay, new Date());
  const selectedDate = useMemo(() => dateForOffset(day), [day]);
  const isToday = day === 0;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const solvedCount = problems.filter(
    (problem) => problem.state === PROBLEM_STATE.SOLVED,
  ).length;
  const weekday = new Intl.DateTimeFormat("ko-KR", {
    weekday: "long",
  }).format(selectedDate);

  const moveToDay = (nextDay: number) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (nextDay === 0) next.delete("day");
      else next.set("day", String(nextDay));
      return next;
    });
  };

  useEffect(() => {
    if (rawDay === null || rawDay === String(day)) return;

    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (day === 0) next.delete("day");
      else next.set("day", String(day));
      return next;
    });
  }, [day, rawDay, setSearchParams]);

  const selectDate = (value: string) => {
    const nextDay = dayOffsetFromDateInput(value, new Date());
    if (nextDay === null || nextDay < TODAY_PROBLEM_MIN_DAY || nextDay > 0) {
      return;
    }
    moveToDay(nextDay);
    setIsCalendarOpen(false);
  };

  return (
    <header className="animate-fade-in pb-6 pt-8 text-center sm:pb-8 sm:pt-10">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex size-5 cursor-pointer items-center justify-center rounded text-muted-foreground/40 transition-colors hover:bg-muted/30 hover:text-foreground/60"
                aria-label="날짜 선택"
              >
                <CalendarDays size={13} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="center">
              <label
                htmlFor="today-problem-date"
                className="block text-xs font-medium text-popover-foreground"
              >
                날짜 선택
              </label>
              <input
                id="today-problem-date"
                type="date"
                value={dateInputValue(selectedDate)}
                min={dateInputValue(dateForOffset(TODAY_PROBLEM_MIN_DAY))}
                max={dateInputValue(new Date())}
                onChange={(event) => selectDate(event.target.value)}
                className="mt-2 h-9 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </PopoverContent>
          </Popover>
          <p className="text-[13px] font-medium tracking-[0.06em] text-muted-foreground/60">
            {isToday ? "오늘의 문제" : "지난 문제"}
          </p>
        </div>
      </div>

      <div className="mt-4 text-center sm:mt-5">
        {!isToday && (
          <p className="mb-1 font-mono text-[11px] tracking-[0.15em] text-muted-foreground/30">
            {selectedDate.getFullYear()}
          </p>
        )}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => moveToDay(previousDayOffset(day))}
            disabled={day <= TODAY_PROBLEM_MIN_DAY}
            className="size-9 shrink-0 cursor-pointer text-muted-foreground/25 transition-colors hover:bg-transparent hover:text-muted-foreground/50"
            aria-label="이전 날짜"
          >
            <ChevronLeft size={18} />
          </Button>
          <span className="text-[28px] font-semibold tracking-[-0.015em] text-foreground sm:text-[32px]">
            {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => moveToDay(nextDayOffset(day))}
            disabled={!canNavigateToNextDay(day)}
            className="size-9 shrink-0 text-muted-foreground/25 transition-colors hover:bg-transparent hover:text-muted-foreground/50 disabled:cursor-not-allowed"
            aria-label="다음 날짜"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground/50">{weekday}</p>
        {!isToday && (
          <button
            type="button"
            onClick={() => moveToDay(0)}
            className="mt-2.5 cursor-pointer text-xs font-medium text-primary/70 transition-colors hover:text-primary"
          >
            오늘로 이동
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground/45 sm:mt-5">
        <span>
          <span className="font-mono font-medium tabular-nums text-foreground/60">
            {solvedCount}
          </span>
          <span className="font-mono tabular-nums">/{problems.length}</span>{" "}
          완료
        </span>
        {!isToday && <span>{Math.abs(day)}일 전</span>}
        <span className="font-mono tabular-nums">
          다음 갱신 <Countdown />
        </span>
      </div>
    </header>
  );
}
