import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Carousel from "@components/Carousel/Carousel";
import { TodayProblemNavigationTabs } from "@components/today-problem";
import {
  Carousel as PrimitiveCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@components/ui/carousel";
import { Tabs, TabsContent } from "@components/ui/tabs";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";
import type { TodayProblem } from "@/type/Problem.type";
import "../../src/index.css";

const sampleTodayProblems = [
  {
    uuid: "sample-solved",
    title: "두 수의 합",
    level: 4,
    levelText: "Bronze I",
    answerRate: 72,
    submitCount: 120,
    answerCount: 86,
    answerPeopleCount: 80,
    source: "fixture",
    sourceId: "1",
    sourceUrl: "#",
    difficulty: "BRONZE",
    state: PROBLEM_STATE.SOLVED,
  },
  {
    uuid: "sample-failed",
    title: "최단 경로",
    level: 13,
    levelText: "Gold III",
    answerRate: 41,
    submitCount: 210,
    answerCount: 90,
    answerPeopleCount: 75,
    source: "fixture",
    sourceId: "2",
    sourceUrl: "#",
    difficulty: "GOLD",
    state: PROBLEM_STATE.FAILED,
  },
  {
    uuid: "sample-none",
    title: "문자열 압축",
    level: 18,
    levelText: "Platinum III",
    answerRate: 33,
    submitCount: 340,
    answerCount: 112,
    answerPeopleCount: 95,
    source: "fixture",
    sourceId: "3",
    sourceUrl: "#",
    difficulty: "PLATINUM",
    state: PROBLEM_STATE.NONE,
  },
] satisfies TodayProblem[];

const slides = ["첫 번째", "두 번째", "세 번째"];

function NavigationTabsFixture() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProblem = sampleTodayProblems[currentIndex];

  return (
    <Tabs
      value={currentProblem.uuid}
      onValueChange={(problemUuid) => {
        const nextIndex = sampleTodayProblems.findIndex(
          (problem) => problem.uuid === problemUuid,
        );
        if (nextIndex >= 0) setCurrentIndex(nextIndex);
      }}
    >
      <TodayProblemNavigationTabs
        problems={sampleTodayProblems}
        currentIndex={currentIndex}
      />
      {sampleTodayProblems.map((problem) => (
        <TabsContent
          key={problem.uuid}
          value={problem.uuid}
          className="rounded-xl border bg-card p-5"
        >
          <h2 className="font-semibold">{problem.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            선택한 문제: {problem.levelText}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function slideContent(label: string, index: number) {
  return (
    <div className="grid h-64 place-items-center bg-slate-900 px-16 text-white">
      <div className="text-center">
        <strong className="block text-2xl">{label} 슬라이드</strong>
        {index === 0 && (
          <label className="mt-5 block text-sm">
            텍스트 입력
            <input
              aria-label="캐러셀 안 텍스트 입력"
              defaultValue="가나다"
              className="ml-2 w-28 rounded border border-white/30 bg-white px-2 py-1 text-slate-950"
            />
          </label>
        )}
      </div>
    </div>
  );
}

function AppCarouselFixture() {
  return (
    <Carousel
      aria-label="수동 비반복 캐러셀"
      autoplay={false}
      loop={false}
      className="rounded-xl"
    >
      {slides.map(slideContent)}
    </Carousel>
  );
}

function AutoplayCarouselFixture() {
  return (
    <Carousel
      aria-label="자동 재생 반복 캐러셀"
      autoplay
      autoplayDelay={1200}
      loop
      className="rounded-xl"
    >
      {slides.map((label, index) => (
        <div
          key={label}
          className="grid h-64 place-items-center bg-primary text-2xl font-semibold text-primary-foreground"
        >
          자동 재생 {index + 1} / {slides.length}
        </div>
      ))}
    </Carousel>
  );
}

function VerticalCarouselFixture() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const updateCurrent = () => setCurrent(api.selectedScrollSnap());
    updateCurrent();
    api.on("select", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <div className="grid gap-3">
      <p className="text-center text-sm" aria-live="polite">
        세로 현재 슬라이드: {current + 1} / {slides.length}
      </p>
      <PrimitiveCarousel
        aria-label="세로 비반복 캐러셀"
        orientation="vertical"
        opts={{ loop: false, duration: 10 }}
        setApi={setApi}
        className="mx-auto h-48 w-full max-w-sm"
      >
        <CarouselContent className="h-48">
          {slides.map((label) => (
            <CarouselItem key={label} className="h-48">
              <div className="grid h-full place-items-center rounded-xl bg-muted text-lg font-semibold">
                {label} 세로 슬라이드
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </PrimitiveCarousel>
    </div>
  );
}

function Fixture() {
  return (
    <main className="mx-auto grid max-w-4xl gap-16 p-8 pb-20">
      <section className="grid gap-4">
        <h1 className="text-xl font-semibold">오늘의 문제 탭</h1>
        <NavigationTabsFixture />
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">입력 컨트롤 포함 캐러셀</h2>
        <AppCarouselFixture />
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">자동 재생 캐러셀</h2>
        <p className="text-sm text-muted-foreground">
          시스템의 동작 줄이기 설정이 켜져 있으면 자동 재생이 멈춥니다.
        </p>
        <AutoplayCarouselFixture />
      </section>

      <section className="grid gap-14 pb-12">
        <h2 className="text-xl font-semibold">세로 캐러셀</h2>
        <VerticalCarouselFixture />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Fixture />
  </StrictMode>,
);
