import {
  Circle,
  CircleAlert,
  CircleCheck,
  CircleX,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import {
  ProblemCategoryBadgeList,
  ProblemCategoryChip,
  ProblemLevelChip,
} from "@components/Chip";
import useProblemListTable from "@hook/problem-list/useProblemListTable";
import ProblemThSort from "./ProblemListThSort";
import ProblemListTableSkeleton from "./ProblemListTableSkeleton";
import {
  PROBLEM_SORT_ANSWER_RATE_ASC,
  PROBLEM_SORT_ANSWER_RATE_DESC,
  PROBLEM_SORT_LEVEL_ASC,
  PROBLEM_SORT_LEVEL_DESC,
  PROBLEM_SORT_TITLE_ASC,
  PROBLEM_SORT_TITLE_DESC,
} from "@constant/ProblemSort";
import { PROBLEM_STATE } from "@constant/problem.state.constant";
import type { ProblemState } from "@/type/Problem.type";
import {
  formatProblemLevel,
  formatProblemNumber,
} from "@/domain/problems/problemPresentation";

function ProblemStateIcon({ state }: { state: ProblemState }) {
  if (state === PROBLEM_STATE.SOLVED) {
    return (
      <CircleCheck
        className="mx-auto size-5 text-green-600"
        aria-label="해결"
      />
    );
  }
  if (state === PROBLEM_STATE.FAILED) {
    return (
      <CircleX className="mx-auto size-5 text-destructive" aria-label="실패" />
    );
  }
  return (
    <Circle
      className="mx-auto size-5 text-muted-foreground/50"
      aria-label="미해결"
    />
  );
}

export default function ProblemListTable() {
  const {
    error,
    isFetching,
    problemList,
    problemSort,
    problemHidden,
    handleClickProblem,
    handleClickProblemTh,
    handleRetryProblemList,
  } = useProblemListTable();

  if (isFetching) return <ProblemListTableSkeleton />;

  if (error) {
    return (
      <div
        role="alert"
        className="flex h-64 flex-col items-center justify-center px-6 text-center"
      >
        <CircleAlert className="size-5 text-destructive" aria-hidden />
        <p className="mt-3 font-medium">문제 목록을 가져오지 못했어요</p>
        <p className="mt-1 text-sm text-muted-foreground">
          잠시 후 다시 시도해 주세요.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 hover:border-foreground/30 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/80"
          onClick={handleRetryProblemList}
        >
          <RefreshCw />
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <TooltipProvider delayDuration={100}>
        <Table className="min-w-[640px] table-fixed sm:min-w-[950px]">
          <colgroup>
            <col className="w-12 sm:w-[80px]" />
            <col className="w-16 sm:w-[100px]" />
            <col className="w-[180px] sm:w-[280px]" />
            <col className="w-[100px] sm:w-[130px]" />
            <col className="w-[120px] sm:w-[160px]" />
            <col className="w-20 sm:w-[110px]" />
            <col className="hidden w-[110px] sm:table-column" />
            <col className="w-12 sm:w-[80px]" />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">상태</TableHead>
              <TableHead className="whitespace-nowrap text-center">
                번호
              </TableHead>
              <ProblemThSort
                onClick={() => handleClickProblemTh("제목")}
                sort={
                  problemSort === PROBLEM_SORT_TITLE_ASC
                    ? 1
                    : problemSort === PROBLEM_SORT_TITLE_DESC
                      ? 2
                      : 0
                }
              >
                제목
              </ProblemThSort>
              <ProblemThSort
                onClick={() => handleClickProblemTh("난이도")}
                className="text-center"
                align="center"
                sort={
                  problemSort === PROBLEM_SORT_LEVEL_ASC
                    ? 1
                    : problemSort === PROBLEM_SORT_LEVEL_DESC
                      ? 2
                      : 0
                }
              >
                난이도
              </ProblemThSort>
              <TableHead className="text-center">카테고리</TableHead>
              <ProblemThSort
                onClick={() => handleClickProblemTh("정답률")}
                className="text-center"
                align="center"
                sort={
                  problemSort === PROBLEM_SORT_ANSWER_RATE_ASC
                    ? 1
                    : problemSort === PROBLEM_SORT_ANSWER_RATE_DESC
                      ? 2
                      : 0
                }
              >
                정답률
              </ProblemThSort>
              <ProblemThSort
                onClick={() => handleClickProblemTh("제출")}
                className="hidden text-center sm:table-cell"
                align="center"
                sort={problemSort === 40 ? 1 : problemSort === 41 ? 2 : 0}
              >
                제출
              </ProblemThSort>
              <TableHead className="text-center">출처</TableHead>
            </TableRow>
          </TableHeader>

          {problemList.length === 0 ? (
            <TableBody>
              <TableRow className="h-64 hover:bg-transparent">
                <TableCell colSpan={8} className="text-center">
                  <p className="font-medium">
                    조건에 맞는 문제를 찾지 못했어요
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    검색어나 선택한 조건을 바꿔 보세요.
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {problemList.map((problem) => {
                return (
                  <TableRow
                    key={problem.uuid}
                    tabIndex={0}
                    aria-label={`${problem.title} 문제 열기`}
                    className="cursor-pointer transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring active:bg-muted/70"
                    onClick={() => handleClickProblem(problem.uuid)}
                    onKeyDown={(event) => {
                      if (
                        event.currentTarget === event.target &&
                        event.key === "Enter"
                      ) {
                        event.preventDefault();
                        handleClickProblem(problem.uuid);
                      }
                    }}
                  >
                    <TableCell className="text-center">
                      <ProblemStateIcon state={problem.state} />
                    </TableCell>
                    <TableCell
                      className="truncate whitespace-nowrap text-center text-muted-foreground"
                      title={problem.sourceId}
                    >
                      {formatProblemNumber(problem.sourceId)}
                    </TableCell>
                    <TableCell className="break-keep whitespace-normal">
                      <span className="font-medium">{problem.title}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex min-w-[88px] justify-center">
                        <ProblemLevelChip
                          level={
                            problemHidden["난이도"]
                              ? "숨김"
                              : formatProblemLevel(
                                  problem.level,
                                  problem.levelText,
                                )
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      className="text-center"
                      title={
                        problemHidden["카테고리"]
                          ? undefined
                          : problem.typeList?.join(", ")
                      }
                    >
                      {problemHidden["카테고리"] ? (
                        <ProblemCategoryChip category="알고리즘 유형 숨김" />
                      ) : !problem.typeList?.length ? (
                        <span className="text-muted-foreground">-</span>
                      ) : (
                        <ProblemCategoryBadgeList
                          categories={problem.typeList}
                          className="max-w-full"
                        />
                      )}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {problem.answerRate}%
                    </TableCell>
                    <TableCell className="hidden text-center text-muted-foreground sm:table-cell">
                      {problem.submitCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            disabled={!problem.sourceUrl}
                            aria-label={`${problem.source} 출처 새 창에서 열기`}
                            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                            onClick={(event) => {
                              event.stopPropagation();
                              window.open(
                                problem.sourceUrl,
                                "_blank",
                                "noopener,noreferrer",
                              );
                            }}
                          >
                            <ExternalLink size={14} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>{problem.source}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TooltipProvider>
    </div>
  );
}
