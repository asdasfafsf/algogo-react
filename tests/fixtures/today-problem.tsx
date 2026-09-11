import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import apiClient from "@api/apiClient";
import TodayProblem from "@/page/TodayProblem";
import { Button } from "@/components/ui/button";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";
import type { TodayProblem as TodayProblemItem } from "@/type/Problem.type";
import "../../src/index.css";

type FixtureMode = "data" | "empty" | "error" | "loading";

let fixtureMode: FixtureMode = "data";
let shouldFailTodayRequest = false;

const sampleTodayProblems = [
  {
    uuid: "today-sample-1",
    title: "두 수의 합",
    level: 4,
    levelText: "Bronze II",
    answerRate: 72.4,
    submitCount: 120,
    answerCount: 86,
    answerPeopleCount: 80,
    source: "BOJ",
    sourceId: "1000",
    sourceUrl: "https://www.acmicpc.net/problem/1000",
    typeList: ["수학", "구현"],
    difficulty: "BRONZE",
    state: PROBLEM_STATE.SOLVED,
  },
  {
    uuid: "today-sample-2",
    title: "최단 경로",
    level: 13,
    levelText: "Gold III",
    answerRate: 41.2,
    submitCount: 210,
    answerCount: 90,
    answerPeopleCount: 75,
    source: "BOJ",
    sourceId: "1753",
    sourceUrl: "https://www.acmicpc.net/problem/1753",
    typeList: ["그래프 이론", "최단 경로"],
    difficulty: "GOLD",
    state: PROBLEM_STATE.FAILED,
  },
  {
    uuid: "today-sample-3",
    title: "문자열 압축",
    level: 18,
    levelText: "Platinum III",
    answerRate: 33.1,
    submitCount: 340,
    answerCount: 112,
    answerPeopleCount: 95,
    source: "BOJ",
    sourceId: "1662",
    sourceUrl: "https://www.acmicpc.net/problem/1662",
    typeList: ["문자열"],
    difficulty: "PLATINUM",
    state: PROBLEM_STATE.NONE,
  },
] satisfies TodayProblemItem[];

const sampleContents: Record<string, string> = {
  "today-sample-1":
    "두 수를 입력받아 합을 출력하세요. 각 입력은 공백으로 구분됩니다.",
  "today-sample-2": "주어진 시작점에서 모든 정점까지의 최단 거리를 구하세요.",
  "today-sample-3": "괄호와 숫자로 압축된 문자열의 실제 길이를 계산하세요.",
};

apiClient.defaults.adapter = async (config) => {
  if (config.url?.includes("/api/v2/problems/today?")) {
    if (fixtureMode === "loading") {
      await new Promise<never>(() => undefined);
    }

    if (shouldFailTodayRequest) {
      shouldFailTodayRequest = false;
      return {
        data: {
          statusCode: 503,
          errorCode: "FIXTURE_UNAVAILABLE",
          errorMessage: "오늘의 문제를 가져올 수 없습니다.",
          data: null,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    }

    return {
      data: {
        statusCode: 200,
        errorCode: "0000",
        errorMessage: "",
        data: fixtureMode === "empty" ? [] : sampleTodayProblems,
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  }

  const problemUuid = config.url?.split("/").pop() ?? "";

  return {
    data: {
      statusCode: 200,
      errorCode: "0000",
      errorMessage: "",
      data: {
        content: sampleContents[problemUuid] ?? "문제 설명을 준비하고 있어요.",
      },
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  };
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 0 } },
});

function FixtureToolbar({
  onModeChange,
}: {
  onModeChange: (mode: FixtureMode) => void;
}) {
  return (
    <aside
      className="sticky top-0 z-50 border-b bg-background/95 py-3 backdrop-blur"
      aria-label="fixture 화면 전환"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8">
        <span className="mr-1 text-xs font-semibold text-muted-foreground">
          오늘의 문제 화면
        </span>
        {(["data", "empty", "error", "loading"] as const).map((mode) => (
          <Button
            key={mode}
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={() => onModeChange(mode)}
          >
            {mode}
          </Button>
        ))}
      </div>
    </aside>
  );
}

function Fixture() {
  const [renderKey, setRenderKey] = useState(0);

  const changeMode = (nextMode: FixtureMode) => {
    fixtureMode = nextMode;
    shouldFailTodayRequest = nextMode === "error";
    queryClient.clear();
    setRenderKey((current) => current + 1);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/problem/today"]}>
        <FixtureToolbar onModeChange={changeMode} />
        <TodayProblem key={renderKey} />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Fixture />);
