import { Link } from "react-router-dom";
import { List, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProblemPageError } from "@/domain/problems/problemPageError";

interface ProblemPageErrorStateProps {
  error: ProblemPageError;
  onRetry: () => void;
}

export default function ProblemPageErrorState({
  error,
  onRetry,
}: ProblemPageErrorStateProps) {
  return (
    <section
      aria-live="polite"
      className="flex h-full items-center bg-background px-5 py-12 sm:px-10"
    >
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {error.title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          {error.description}
        </p>
        <div className="mt-7 flex flex-col gap-2 min-[440px]:flex-row">
          <Button onClick={onRetry} className="active:translate-y-px">
            <RefreshCw aria-hidden="true" />
            다시 시도
          </Button>
          <Button asChild variant="outline" className="active:translate-y-px">
            <Link to="/problem">
              <List aria-hidden="true" />
              문제 목록
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
