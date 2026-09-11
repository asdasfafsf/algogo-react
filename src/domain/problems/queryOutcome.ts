import type { ProblemSummaryList, TodayProblem } from "@/type/Problem.type";

type ProblemQueryResponse<T> = {
  statusCode: number;
  errorCode: string;
  data: T | null | undefined;
};

export type ProblemQueryOutcome<T> =
  { type: "success"; data: T } | { type: "failure"; message: string };

export const problemListLoadFailureMessage =
  "문제 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.";

export const todayProblemsLoadFailureMessage =
  "오늘의 문제를 가져오지 못했어요. 잠시 후 다시 시도해 주세요.";

const failure = <T>(message: string): ProblemQueryOutcome<T> => ({
  type: "failure",
  message,
});

export const problemListQueryOutcome = (
  response: ProblemQueryResponse<ProblemSummaryList>,
): ProblemQueryOutcome<ProblemSummaryList> => {
  const { data } = response;
  if (
    response.statusCode !== 200 ||
    !data ||
    !Array.isArray(data.problemList) ||
    typeof data.totalCount !== "number"
  ) {
    return failure(problemListLoadFailureMessage);
  }

  return { type: "success", data };
};

export const todayProblemsQueryOutcome = (
  response: ProblemQueryResponse<TodayProblem[]>,
): ProblemQueryOutcome<TodayProblem[]> =>
  response.statusCode === 200 &&
  response.errorCode === "0000" &&
  Array.isArray(response.data)
    ? { type: "success", data: response.data }
    : failure(todayProblemsLoadFailureMessage);
