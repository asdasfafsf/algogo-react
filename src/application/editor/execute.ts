export type ExecutionPorts = {
  connect: () => Promise<SocketState>;
  refreshAuthentication: () => Promise<unknown>;
  subscribe: (isRetry: boolean) => void;
  run: (request: RequestExecuteList) => Promise<ResponseExecuteResult>;
};

export const canStartExecution = (state: SocketState) => state !== "PENDING";

export const executeWithAuthenticationRetry = async (
  initialState: SocketState,
  createRequest: () => RequestExecuteList,
  ports: ExecutionPorts,
  onReady: () => void = () => undefined,
) => {
  let currentState = initialState;
  if (currentState === "DISCONNECTED") currentState = await ports.connect();
  if (currentState === "JWT_EXPIRED") {
    await ports.refreshAuthentication();
    currentState = await ports.connect();
  }

  onReady();
  const request = createRequest();
  ports.subscribe(false);
  let result = await ports.run(request);
  if (result.code === "JWT_EXPIRED") {
    await ports.refreshAuthentication();
    currentState = await ports.connect();
    if (currentState === "WAITING") {
      ports.subscribe(true);
      result = await ports.run(request);
    }
  }
  return result;
};
