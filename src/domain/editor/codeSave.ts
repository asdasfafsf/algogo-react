export type CodeSaveResult =
  | { type: "success" }
  | { type: "unauthenticated" }
  | { type: "failure"; statusCode: number }
  | { type: "request-failed" };

export type CodeSaveNotification = {
  message: string;
  variant: "success" | "fail";
};

export const classifyCodeSaveResponse = (response: {
  statusCode: number;
}): CodeSaveResult => {
  if (response.statusCode === 200) return { type: "success" };
  if (response.statusCode === 401) return { type: "unauthenticated" };
  return { type: "failure", statusCode: response.statusCode };
};

export const codeSaveRequestFailed = (): CodeSaveResult => ({
  type: "request-failed",
});

export const getCodeSaveNotification = (
  result: CodeSaveResult,
): CodeSaveNotification => {
  switch (result.type) {
    case "success":
      return { message: "코드를 저장했습니다.", variant: "success" };
    case "unauthenticated":
      return {
        message: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
        variant: "fail",
      };
    case "failure":
      return {
        message: "코드를 저장하지 못했습니다. 다시 시도해 주세요.",
        variant: "fail",
      };
    case "request-failed":
      return {
        message: "저장 중 문제가 생겼습니다. 다시 시도해 주세요.",
        variant: "fail",
      };
  }
};
