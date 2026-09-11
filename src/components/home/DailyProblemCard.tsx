import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@components/ui/carousel";
import {
  ProblemCategoryBadgeList,
  ProblemLevelChip,
  ProblemStateChip,
} from "@components/Chip";
import type { TodayProblem } from "@/type/Problem.type";
import { formatProblemLevel } from "@/domain/problems/problemPresentation";

const AUTOPLAY_DELAY = 5000;

interface DailyProblemCardProps {
  problems: TodayProblem[];
}

export default function DailyProblemCard({ problems }: DailyProblemCardProps) {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const pauseAutoplay = useRef(false);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const defaultIndex = useMemo(
    () =>
      Math.max(
        0,
        problems.findIndex((problem) => problem.state !== "SOLVED"),
      ),
    [problems],
  );

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveSlide(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (
      !api ||
      problems.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      if (!pauseAutoplay.current) api.scrollNext();
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [api, problems.length]);

  const openProblem = useCallback(
    (problemUuid: string) => navigate(`/problem/${problemUuid}`),
    [navigate],
  );

  return (
    <div
      className="group/daily h-[170px] overflow-hidden rounded-lg border border-primary/15 bg-card shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/25 hover:shadow-md sm:col-span-2"
      aria-label="오늘의 문제"
      onMouseEnter={() => {
        pauseAutoplay.current = true;
      }}
      onMouseLeave={(event) => {
        pauseAutoplay.current = !event.currentTarget.contains(
          document.activeElement,
        );
      }}
      onFocusCapture={() => {
        pauseAutoplay.current = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          pauseAutoplay.current = false;
      }}
    >
      <div className="flex items-center justify-between px-4 pb-0 pt-3.5 sm:px-5 sm:pt-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          오늘의 문제
        </span>
        <button
          type="button"
          onClick={() => navigate("/problem/today")}
          className="inline-flex items-center gap-0.5 rounded-md bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-muted/80"
        >
          전체보기
          <ChevronRight size={11} className="opacity-50" />
        </button>
      </div>

      <Carousel
        opts={{ align: "start", loop: true, startIndex: defaultIndex }}
        setApi={setApi}
      >
        <CarouselContent className="ml-0">
          {problems.map((problem, index) => {
            return (
              <CarouselItem key={problem.uuid} className="pl-0">
                <button
                  type="button"
                  tabIndex={index === activeSlide ? 0 : -1}
                  onClick={() => openProblem(problem.uuid)}
                  aria-label={`오늘의 문제 ${index + 1}/${problems.length}: ${problem.title}`}
                  className="flex w-full flex-col gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring active:bg-muted/70 sm:px-5 sm:py-4"
                >
                  <h3 className="line-clamp-1 text-base font-semibold leading-snug sm:text-lg">
                    {problem.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <ProblemLevelChip
                      level={formatProblemLevel(
                        problem.level,
                        problem.levelText,
                      )}
                    />
                    {problem.typeList?.length ? (
                      <ProblemCategoryBadgeList categories={problem.typeList} />
                    ) : null}
                    {problem.state !== "NONE" && (
                      <ProblemStateChip state={problem.state} showNoneState />
                    )}
                    <span className="text-xs text-muted-foreground">
                      정답률 {problem.answerRate}%
                    </span>
                  </div>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {problems.length > 1 && problems.length <= 9 && (
        <div
          className="flex items-center justify-center gap-0.5 pb-3 pt-1"
          role="group"
          aria-label="문제 선택"
        >
          {problems.map((problem, index) => (
            <button
              ref={(element) => {
                dotRefs.current[index] = element;
              }}
              key={problem.uuid}
              type="button"
              aria-label={`문제 ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => api?.scrollTo(index)}
              onKeyDown={(event) => {
                let targetIndex: number | null = null;
                const selectedIndex = api?.selectedScrollSnap() ?? index;
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  targetIndex =
                    (selectedIndex - 1 + problems.length) % problems.length;
                } else if (event.key === "ArrowRight") {
                  event.preventDefault();
                  targetIndex = (selectedIndex + 1) % problems.length;
                }
                if (targetIndex !== null) {
                  api?.scrollTo(targetIndex);
                  dotRefs.current[targetIndex]?.focus();
                }
              }}
              className="flex size-7 items-center justify-center rounded-md transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-muted"
            >
              <span
                className={
                  index === activeSlide
                    ? "h-1.5 w-3.5 rounded-full bg-primary"
                    : "size-1.5 rounded-full bg-muted-foreground/30"
                }
              />
            </button>
          ))}
        </div>
      )}
      {problems.length > 9 && (
        <span
          role="status"
          aria-live="polite"
          className="mx-auto flex px-2 pb-3 pt-1 text-xs tabular-nums text-muted-foreground"
          aria-label={`문제 ${activeSlide + 1}/${problems.length}`}
        >
          {activeSlide + 1}/{problems.length}
        </span>
      )}
    </div>
  );
}
