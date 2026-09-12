import ProblemBreadcrumbs from "@components/problem/ProblemBreadcrumbs";
import ProblemNavbar from "@components/problem/ProblemNavbar";
import { PROBLEM_HEADER_HEIGHT } from "../../constant/Size";
import { formatProblemNumber } from "@/domain/problems/problemPresentation";
import type { Problem } from "@/type/Problem.type";

interface ProblemHeaderProps {
  problem?: Problem;
}

export default function ProblemHeader({ problem }: ProblemHeaderProps) {
  const problemNumber = formatProblemNumber(problem?.sourceId);
  const title = problem?.title ?? "문제를 불러오는 중";

  return (
    <header
      style={{
        height: `${PROBLEM_HEADER_HEIGHT}px`,
      }}
      className="z-30 flex w-full min-w-0 shrink-0 items-center border-b border-border bg-card/95 text-card-foreground shadow-[0_1px_0_hsl(var(--border))] backdrop-blur supports-[backdrop-filter]:bg-card/90"
    >
      <div className="flex h-full min-w-0 flex-1 items-center gap-1 px-2 sm:gap-2 sm:px-3">
        <ProblemBreadcrumbs
          number={problemNumber === "-" ? undefined : problemNumber}
          title={title}
        />
        <ProblemNavbar problem={problem} />
      </div>
    </header>
  );
}
