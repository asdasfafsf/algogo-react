import ProblemSection from "@layout/problem/ProblemSection";
import useProblemPage from "@hook/problem/useProblemPage";
import Header from "@layout/Header";
import { Button } from "@/components/ui/button";
import { CircleAlert, List, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProblemPage() {
  const { problem, error, isLoading, retry } = useProblemPage();

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      {problem?.style && <style>{problem.style}</style>}
      <Header />
      <main className="min-h-0 flex-1 overflow-hidden">
        {error ? (
          <section
            aria-live="polite"
            className="grid h-full place-items-center bg-muted/20 px-5"
          >
            <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
                <CircleAlert className="size-6" />
              </div>
              <h1 className="text-xl font-semibold">
                문제를 표시할 수 없습니다
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {error}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={retry}>
                  <RefreshCw />
                  다시 시도
                </Button>
                <Button asChild>
                  <Link to="/problem">
                    <List />
                    문제 목록
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <ProblemSection problem={isLoading ? undefined : problem} />
        )}
      </main>
    </div>
  );
}
