import ProblemSection from "@layout/problem/ProblemSection";
import useProblemPage from "@hook/problem/useProblemPage";
import Header from "@layout/Header";
import ProblemPageErrorState from "@components/problem/ProblemPageErrorState";

export default function ProblemPage() {
  const { problem, error, isLoading, retry } = useProblemPage();

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      {problem?.style && <style>{problem.style}</style>}
      <Header />
      <main className="min-h-0 flex-1 overflow-hidden">
        {error ? (
          <ProblemPageErrorState error={error} onRetry={retry} />
        ) : (
          <ProblemSection problem={isLoading ? undefined : problem} />
        )}
      </main>
    </div>
  );
}
