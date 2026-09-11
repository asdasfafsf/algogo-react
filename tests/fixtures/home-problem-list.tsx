import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import apiClient from "@api/apiClient";
import { MainCarousel } from "@components/Carousel";
import QuickNavStrip from "@components/home/QuickNavStrip";
import ProblemListCard from "@components/problem-list/ProblemListCard";
import { Button } from "@components/ui/button";
import { PROBLEM_STATE } from "@constant/problem.state.constant";
import useProblemListStore from "@zustand/ProblemListStore";
import useMeStore from "@zustand/MeStore";
import type { ProblemSummary, TodayProblem } from "@/type/Problem.type";
import "../../src/index.css";

type FixtureMode = "data" | "empty" | "error";

let problemListMode: FixtureMode = "data";
let todayProblemMode: FixtureMode = "data";

const sampleMe: Me = {
  uuid: "fixture-user",
  name: "샘플 사용자",
  profilePhoto: "",
  email: "fixture@example.invalid",
  socialList: [],
  oauthList: [],
};

const sampleProblems = [
  {
    uuid: "problem-1000",
    title: "A+B",
    levelText: "Bronze V",
    answerCount: 215000,
    answerRate: 39.8,
    submitCount: 547000,
    answerPeopleCount: 178000,
    source: "BOJ",
    sourceId: "1000",
    sourceUrl: "https://www.acmicpc.net/problem/1000",
    level: 1,
    typeList: ["수학", "구현"],
    state: PROBLEM_STATE.SOLVED,
  },
  {
    uuid: "problem-1753",
    title: "최단경로",
    levelText: "Gold IV",
    answerCount: 64000,
    answerRate: 27.4,
    submitCount: 238000,
    answerPeopleCount: 53000,
    source: "BOJ",
    sourceId: "1753",
    sourceUrl: "https://www.acmicpc.net/problem/1753",
    level: 12,
    typeList: ["그래프 이론", "최단 경로"],
    state: PROBLEM_STATE.FAILED,
  },
  {
    uuid: "problem-local",
    title: "문자열 기록 비교",
    levelText: "Silver III",
    answerCount: 82,
    answerRate: 51.2,
    submitCount: 160,
    answerPeopleCount: 73,
    source: "Algogo",
    sourceId: "local-109",
    sourceUrl: "",
    level: 8,
    typeList: ["문자열"],
    state: PROBLEM_STATE.NONE,
  },
] satisfies ProblemSummary[];

const sampleTodayProblems = sampleProblems.slice(0, 2).map((problem) => ({
  ...problem,
  difficulty: problem.levelText.split(" ")[0].toUpperCase(),
})) satisfies TodayProblem[];

function fixtureResponse(mode: FixtureMode, today: boolean) {
  if (mode === "error") {
    return {
      statusCode: 503,
      errorCode: "FIXTURE_ERROR",
      errorMessage: today
        ? "오늘의 문제 응답을 확인할 수 없습니다."
        : "문제 목록 응답을 확인할 수 없습니다.",
      data: null,
    };
  }

  if (today) {
    return {
      statusCode: 200,
      errorCode: "0000",
      errorMessage: "",
      data: mode === "empty" ? [] : sampleTodayProblems,
    };
  }

  return {
    statusCode: 200,
    errorCode: "0000",
    errorMessage: "",
    data: {
      problemList: mode === "empty" ? [] : sampleProblems,
      totalCount: mode === "empty" ? 0 : 41,
      pageNo: useProblemListStore.getState().pagingInfo.pageNo,
      pageSize: useProblemListStore.getState().pagingInfo.pageSize,
    },
  };
}

apiClient.interceptors.request.use((config) => {
  if (config.url?.startsWith("/api/v2/problems/today")) {
    config.adapter = async () => ({
      data: fixtureResponse(todayProblemMode, true),
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });
  } else if (config.url?.startsWith("/api/v2/problems?")) {
    config.adapter = async () => ({
      data: fixtureResponse(problemListMode, false),
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });
  }
  return config;
});

useMeStore.setState({ me: sampleMe });

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 0 } },
});

function FixtureToolbar() {
  const showProblemListMode = (mode: FixtureMode) => {
    problemListMode = mode;
    const { pagingInfo, fetchProblemList } = useProblemListStore.getState();
    void fetchProblemList(pagingInfo, []);
  };

  const showTodayProblemMode = (mode: FixtureMode) => {
    todayProblemMode = mode;
    void queryClient.resetQueries({ queryKey: ["todayProblems", 0] });
  };

  return (
    <aside
      className="sticky top-0 z-50 mb-8 border-b bg-background/95 py-3 backdrop-blur"
      aria-label="fixture 상태 전환"
    >
      <div className="flex flex-wrap gap-2">
        <span className="mr-1 self-center text-xs font-semibold text-muted-foreground">
          문제 목록
        </span>
        {(["data", "empty", "error"] as const).map((mode) => (
          <Button
            key={`list-${mode}`}
            size="sm"
            variant="outline"
            onClick={() => showProblemListMode(mode)}
          >
            {mode}
          </Button>
        ))}
        <span className="ml-3 mr-1 self-center text-xs font-semibold text-muted-foreground">
          오늘의 문제
        </span>
        {(["data", "empty", "error"] as const).map((mode) => (
          <Button
            key={`today-${mode}`}
            size="sm"
            variant="outline"
            onClick={() => showTodayProblemMode(mode)}
          >
            {mode}
          </Button>
        ))}
      </div>
    </aside>
  );
}

function Fixture() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-16">
      <FixtureToolbar />
      <div className="space-y-10">
        <MainCarousel />
        <section className="space-y-4">
          <h1 className="text-lg font-semibold tracking-tight">빠른 탐색</h1>
          <QuickNavStrip />
        </section>
        <ProblemListCard />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Fixture />
      </MemoryRouter>
    </QueryClientProvider>
  </StrictMode>,
);
