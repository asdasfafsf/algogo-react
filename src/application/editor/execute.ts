import {
  EXECUTE_SOCKET_ERROR_CODE,
  ExecuteSocketError,
} from "@/domain/execute/error";

export type ExecutionPorts = {
  connect: () => Promise<SocketState>;
  refreshAuthentication: () => Promise<unknown>;
  subscribe: (isRetry: boolean) => void;
  run: (request: RequestExecuteList) => Promise<ResponseExecuteResult>;
};

let executionInProgress = false;

export const canStartExecution = (state: SocketState) =>
  !executionInProgress && state !== "PENDING" && state !== "CONNECTING";

export const isExecutionBusyError = (error: unknown) =>
  error instanceof ExecuteSocketError &&
  error.code === EXECUTE_SOCKET_ERROR_CODE.busy;

const connectWithAuthenticationRefresh = async (
  initialState: SocketState,
  ports: ExecutionPorts,
) => {
  let currentState = initialState;
  let refreshed = false;

  if (currentState === "JWT_EXPIRED") {
    await ports.refreshAuthentication();
    refreshed = true;
  }

  if (currentState !== "WAITING") currentState = await ports.connect();

  if (currentState === "JWT_EXPIRED" && !refreshed) {
    await ports.refreshAuthentication();
    currentState = await ports.connect();
  }

  if (currentState !== "WAITING") {
    throw new ExecuteSocketError(
      currentState === "AUTH_FAILED"
        ? EXECUTE_SOCKET_ERROR_CODE.authFailed
        : EXECUTE_SOCKET_ERROR_CODE.unavailable,
      "코드 실행 서버 인증을 완료하지 못했습니다.",
    );
  }
};

export const executeWithAuthenticationRetry = async (
  initialState: SocketState,
  createRequest: () => RequestExecuteList,
  ports: ExecutionPorts,
  onReady: () => void = () => undefined,
) => {
  if (executionInProgress) {
    throw new ExecuteSocketError(
      EXECUTE_SOCKET_ERROR_CODE.busy,
      "이미 코드 실행 요청을 처리하고 있습니다.",
    );
  }

  executionInProgress = true;
  try {
    await connectWithAuthenticationRefresh(initialState, ports);

    onReady();
    const request = createRequest();
    ports.subscribe(false);
    let result = await ports.run(request);
    if (result.code === "JWT_EXPIRED") {
      await ports.refreshAuthentication();
      await connectWithAuthenticationRefresh("DISCONNECTED", ports);
      ports.subscribe(true);
      result = await ports.run(request);
    }
    return result;
  } finally {
    executionInProgress = false;
  }
};
