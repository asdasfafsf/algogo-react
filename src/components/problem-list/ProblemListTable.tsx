import { Circle, CircleCheck, CircleX, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { ProblemLevelChip } from "@components/Chip";
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
  formatProblemCategory,
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
    isSearching,
    isFetching,
    problemList,
    problemSort,
    problemHidden,
    handleClickProblem,
    handleClickProblemTh,
    handleClickProblemCollectModal,
  } = useProblemListTable();

  if (isFetching) return <ProblemListTableSkeleton />;

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
                onClick={(event) => handleClickProblemTh(event, "제목")}
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
                onClick={(event) => handleClickProblemTh(event, "난이도")}
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
                onClick={(event) => handleClickProblemTh(event, "정답률")}
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
                onClick={(event) => handleClickProblemTh(event, "제출")}
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
                  <p className="text-sm text-muted-foreground">
                    조건에 맞는 문제가 없습니다.
                  </p>
                  <button
                    type="button"
                    disabled={isSearching}
                    onClick={handleClickProblemCollectModal}
                    className="mt-3 text-sm font-medium text-primary hover:underline disabled:opacity-50"
                  >
                    문제 추가하기
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {problemList.map((problem) => {
                const category = formatProblemCategory(problem.typeList);
                return (
                  <TableRow
                    key={problem.uuid}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={(event) => handleClickProblem(event, problem.uuid)}
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
                      <button
                        type="button"
                        className="w-full text-left focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClickProblem(event, problem.uuid);
                        }}
                      >
                        {problem.title}
                      </button>
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
                      title={problem.typeList?.join(", ")}
                    >
                      {problemHidden["카테고리"] ? (
                        <Badge variant="secondary">카테고리 숨김</Badge>
                      ) : category === "-" ? (
                        <span className="text-muted-foreground">-</span>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="max-w-full truncate"
                        >
                          {category}
                        </Badge>
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
                            className="inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
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
