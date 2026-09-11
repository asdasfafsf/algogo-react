export type ProblemPageError = {
  kind: "not-found" | "unavailable";
  title: string;
  description: string;
};

const NOT_FOUND_ERROR: ProblemPageError = {
  kind: "not-found",
  title: "문제를 찾을 수 없어요",
  description: "삭제되었거나 주소가 변경되었을 수 있어요.",
};

const UNAVAILABLE_ERROR: ProblemPageError = {
  kind: "unavailable",
  title: "문제를 불러오지 못했어요",
  description: "잠시 후 다시 시도해 주세요.",
};

export function normalizeProblemPageError(
  statusCode?: number,
): ProblemPageError {
  return statusCode === 404 ? NOT_FOUND_ERROR : UNAVAILABLE_ERROR;
}
