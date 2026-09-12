import ProblemNavbar from "@components/problem/ProblemNavbar";
import { PROBLEM_HEADER_HEIGHT } from "../../constant/Size";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <div className="flex h-full min-w-0 flex-1 items-center gap-2 px-2 sm:gap-3 sm:px-3">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 px-2 text-muted-foreground transition-none hover:bg-accent hover:text-accent-foreground"
              >
                <Link to="/problem" aria-label="문제 목록으로 이동">
                  <ArrowLeft aria-hidden="true" />
                  <span className="hidden sm:inline">문제 목록</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              문제 목록으로 이동
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />

        <div
          className="flex min-w-0 flex-1 items-center gap-2"
          aria-label={
            problemNumber === "-" ? title : `문제 ${problemNumber}, ${title}`
          }
        >
          {problemNumber !== "-" && (
            <span className="hidden shrink-0 rounded-md bg-primary/10 px-2 py-1 font-mono text-[11px] font-semibold leading-none text-primary min-[480px]:inline-flex">
              #{problemNumber}
            </span>
          )}
          <h1
            title={title}
            className="min-w-0 truncate text-sm font-semibold tracking-tight"
          >
            {title}
          </h1>
        </div>

        <ProblemNavbar problem={problem} />
      </div>
    </header>
  );
}
