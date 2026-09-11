export const getSubmissionUrl = (problem: {
  source: string;
  sourceId: string | number;
}) =>
  problem.source === "BOJ"
    ? `https://www.acmicpc.net/submit/${problem.sourceId}`
    : null;

export type SubmissionResult =
  | { type: "problem-unavailable" }
  | { type: "empty-code" }
  | {
      type: "completed";
      page: "opened" | "unsupported" | "blocked";
      clipboard: "copied" | "failed";
    };

export type SubmissionFeedback = {
  message: string;
  variant: "default" | "success" | "fail";
};

export const getSubmissionFeedback = (
  result: SubmissionResult,
): SubmissionFeedback => {
  if (result.type === "problem-unavailable") {
    return {
      message: "문제 정보를 불러온 뒤 다시 시도해 주세요.",
      variant: "fail",
    };
  }

  if (result.type === "empty-code") {
    return {
      message: "제출할 코드를 먼저 입력해 주세요.",
      variant: "default",
    };
  }

  if (result.page === "opened") {
    return result.clipboard === "copied"
      ? {
          message: "제출 페이지를 열고 코드를 복사했어요.",
          variant: "success",
        }
      : {
          message: "제출 페이지를 열었어요. 코드는 직접 복사해 주세요.",
          variant: "default",
        };
  }

  if (result.page === "unsupported") {
    return result.clipboard === "copied"
      ? {
          message:
            "이 문제는 제출 페이지를 바로 열 수 없어요. 코드는 복사해 두었어요.",
          variant: "default",
        }
      : {
          message:
            "이 문제는 제출 페이지를 바로 열 수 없어요. 코드를 직접 복사해 주세요.",
          variant: "fail",
        };
  }

  return result.clipboard === "copied"
    ? {
        message:
          "새 창을 열지 못했어요. 팝업을 허용한 뒤 다시 눌러 주세요. 코드는 복사해 두었어요.",
        variant: "default",
      }
    : {
        message:
          "새 창과 코드 복사가 모두 막혔어요. 브라우저 설정을 확인한 뒤 다시 눌러 주세요.",
        variant: "fail",
      };
};
