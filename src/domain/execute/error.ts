export const EXECUTE_SOCKET_ERROR_CODE = {
  connectionTimeout: "SOCKET_CONNECTION_TIMEOUT",
  disconnected: "SOCKET_DISCONNECTED",
  ackTimeout: "SOCKET_ACK_TIMEOUT",
  unavailable: "SOCKET_UNAVAILABLE",
  busy: "SOCKET_BUSY",
  authFailed: "AUTH_FAILED",
  unknown: "EXECUTION_FAILED",
} as const;

export class ExecuteSocketError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ExecuteSocketError";
  }
}

export const toExecutionFailureResult = (
  error: unknown,
): ResponseExecuteResult => {
  const code =
    error instanceof ExecuteSocketError
      ? error.code
      : EXECUTE_SOCKET_ERROR_CODE.unknown;
  const result =
    error instanceof Error && error.message
      ? error.message
      : "코드 실행 중 알 수 없는 오류가 발생했습니다.";

  return {
    seq: 0,
    processTime: 0,
    memory: 0,
    code,
    result,
    detail: "",
  };
};
