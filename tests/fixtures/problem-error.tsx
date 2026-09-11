import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import ProblemPageErrorState from "@components/problem/ProblemPageErrorState";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { normalizeProblemPageError } from "@/domain/problems/problemPageError";
import "../../src/index.css";

type FixtureResponse = {
  statusCode: number;
  errorMessage: string;
  data: { title: string } | null;
};

const errorResponses = {
  unavailable: {
    statusCode: 503,
    errorMessage: "upstream timeout at problem-service.internal",
    data: null,
  },
  notFound: {
    statusCode: 404,
    errorMessage: "ProblemEntity problem-secret-uuid not found",
    data: null,
  },
} satisfies Record<string, FixtureResponse>;

const successResponse = {
  statusCode: 200,
  errorMessage: "",
  data: { title: "A + B" },
} satisfies FixtureResponse;

function ProblemErrorFixture() {
  const [response, setResponse] = useState<FixtureResponse>(
    errorResponses.unavailable,
  );
  const [isLoading, setIsLoading] = useState(false);

  const retry = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      setResponse(successResponse);
      setIsLoading(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-4 p-5 sm:p-10">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="min-h-72 w-full flex-1" />
      </main>
    );
  }

  if (response.statusCode === 200 && response.data) {
    return (
      <main className="grid min-h-dvh place-items-center p-5">
        <section aria-label="문제 불러오기 성공" className="w-full max-w-lg">
          <p className="text-sm text-muted-foreground">문제를 불러왔어요</p>
          <h1 className="mt-2 text-3xl font-semibold">{response.data.title}</h1>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => setResponse(errorResponses.unavailable)}
          >
            일시 오류 다시 보기
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh">
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setResponse(errorResponses.notFound)}
        >
          404 보기
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setResponse(errorResponses.unavailable)}
        >
          일시 오류 보기
        </Button>
      </div>
      <div className="h-dvh">
        <ProblemPageErrorState
          error={normalizeProblemPageError(response.statusCode)}
          onRetry={retry}
        />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter>
      <ProblemErrorFixture />
    </MemoryRouter>
  </StrictMode>,
);
