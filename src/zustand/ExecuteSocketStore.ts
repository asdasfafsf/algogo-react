import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { create } from "zustand";
import { decodeExecuteResult } from "@/domain/execute/decode";
import {
  EXECUTE_SOCKET_ERROR_CODE,
  ExecuteSocketError,
} from "@/domain/execute/error";
import { createExecuteSocketUrl } from "@/domain/execute/socketUrl";

const DEFAULT_CONNECT_TIMEOUT_MS = 10_000;
const DEFAULT_ACK_TIMEOUT_MS = 15_000;

type PayloadHandler = (payload: unknown) => void;
type DisconnectHandler = (reason: string) => void;

export type ExecuteSocketTransport = {
  connect: () => void;
  disconnect: () => void;
  sendAuthentication: (token: string | null) => void;
  sendExecution: (
    data: RequestExecuteList,
    acknowledge: (response: unknown) => void,
  ) => void;
  onAuthentication: (handler: PayloadHandler) => void;
  onConnectError: (handler: PayloadHandler) => void;
  onDisconnect: (handler: DisconnectHandler) => void;
  onExecutionError: (handler: PayloadHandler) => void;
  offExecutionError: (handler: PayloadHandler) => void;
  onExecutionResult: (handler: PayloadHandler) => void;
  offExecutionResult: (handler: PayloadHandler) => void;
};

type ExecuteSocketStore = {
  socket: ExecuteSocketTransport | null;
  state: SocketState;
  connect: () => Promise<SocketState>;
  disconnect: () => void;
  run: (data: RequestExecuteList) => Promise<ResponseExecuteResult>;
  execute: (
    handler: (executeResult: ResponseExecuteResult) => Promise<void> | void,
  ) => void;
};

type ExecuteSocketDependencies = {
  createTransport: () => ExecuteSocketTransport;
  getAccessToken: () => string | null;
  connectTimeoutMs: number;
  ackTimeoutMs: number;
};

const createSocketTransport = (socket: Socket): ExecuteSocketTransport => ({
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),
  sendAuthentication: (token) => {
    socket.emit("auth", { token });
  },
  sendExecution: (data, acknowledge) => {
    socket.emit("execute", data, acknowledge);
  },
  onAuthentication: (handler) => {
    socket.on("auth", handler);
  },
  onConnectError: (handler) => {
    socket.on("connect_error", handler);
  },
  onDisconnect: (handler) => {
    socket.on("disconnect", handler);
  },
  onExecutionError: (handler) => {
    socket.on("error", handler);
  },
  offExecutionError: (handler) => {
    socket.off("error", handler);
  },
  onExecutionResult: (handler) => {
    socket.on("executeResult", handler);
  },
  offExecutionResult: (handler) => {
    socket.off("executeResult", handler);
  },
});

const defaultDependencies: ExecuteSocketDependencies = {
  createTransport: () =>
    createSocketTransport(
      io(createExecuteSocketUrl(import.meta.env.VITE_ENV, location), {
        autoConnect: false,
        transports: ["websocket"],
      }),
    ),
  getAccessToken: () => localStorage.getItem("accessToken"),
  connectTimeoutMs: DEFAULT_CONNECT_TIMEOUT_MS,
  ackTimeoutMs: DEFAULT_ACK_TIMEOUT_MS,
};

const getAuthResponse = (payload: unknown) => {
  if (typeof payload !== "object" || payload === null) return null;

  const { code, errorCode, errorMessage, message } = payload as Record<
    string,
    unknown
  >;
  const responseCode =
    typeof code === "string"
      ? code
      : typeof errorCode === "string"
        ? errorCode
        : null;
  if (!responseCode) return null;

  return {
    code: responseCode,
    message:
      typeof errorMessage === "string"
        ? errorMessage
        : typeof message === "string"
          ? message
          : "",
  };
};

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

export const createExecuteSocketStore = (
  overrides: Partial<ExecuteSocketDependencies> = {},
) => {
  const dependencies = { ...defaultDependencies, ...overrides };
  let connectingPromise: Promise<SocketState> | null = null;
  let cancelConnection: ((error: ExecuteSocketError) => void) | null = null;
  let cancelExecution: ((error: ExecuteSocketError) => void) | null = null;
  let subscribedTransport: ExecuteSocketTransport | null = null;
  let subscribedHandler: PayloadHandler | null = null;

  const clearSubscription = () => {
    if (subscribedTransport && subscribedHandler) {
      subscribedTransport.offExecutionResult(subscribedHandler);
    }
    subscribedTransport = null;
    subscribedHandler = null;
  };

  return create<ExecuteSocketStore>((set, get) => ({
    socket: null,
    state: "DISCONNECTED",

    connect: () => {
      if (connectingPromise) return connectingPromise;
      if (get().state === "PENDING") {
        return Promise.reject(
          new ExecuteSocketError(
            EXECUTE_SOCKET_ERROR_CODE.busy,
            "실행 중에는 소켓을 다시 연결할 수 없습니다.",
          ),
        );
      }

      const previousSocket = get().socket;
      if (previousSocket) {
        clearSubscription();
        set({ socket: null, state: "DISCONNECTED" });
        previousSocket.disconnect();
      }

      const socket = dependencies.createTransport();
      set({ socket, state: "CONNECTING" });

      const promise = new Promise<SocketState>((resolve, reject) => {
        let settled = false;
        const timeout = setTimeout(() => {
          fail(
            new ExecuteSocketError(
              EXECUTE_SOCKET_ERROR_CODE.connectionTimeout,
              "코드 실행 서버 연결 시간이 초과되었습니다.",
            ),
          );
        }, dependencies.connectTimeoutMs);

        const cleanup = () => {
          clearTimeout(timeout);
          cancelConnection = null;
        };

        const finish = (state: SocketState) => {
          if (settled) return;
          settled = true;
          cleanup();
          set({ state });
          resolve(state);
        };

        const fail = (error: ExecuteSocketError) => {
          if (settled) return;
          settled = true;
          cleanup();
          if (get().socket === socket) {
            set({ socket: null, state: "DISCONNECTED" });
            socket.disconnect();
          }
          reject(error);
        };

        cancelConnection = fail;

        socket.onAuthentication((payload) => {
          if (settled || get().socket !== socket) return;

          const response = getAuthResponse(payload);
          if (response?.code === "0000") {
            finish("WAITING");
            return;
          }

          if (response?.code === "JWT_EXPIRED") {
            settled = true;
            cleanup();
            set({ socket: null, state: "JWT_EXPIRED" });
            socket.disconnect();
            resolve("JWT_EXPIRED");
            return;
          }

          const code = response?.code ?? EXECUTE_SOCKET_ERROR_CODE.authFailed;
          const message =
            response?.message || "코드 실행 서버 인증에 실패했습니다.";
          settled = true;
          cleanup();
          set({ socket: null, state: "AUTH_FAILED" });
          socket.disconnect();
          reject(new ExecuteSocketError(code, message));
        });

        socket.onConnectError((error) => {
          fail(
            new ExecuteSocketError(
              EXECUTE_SOCKET_ERROR_CODE.unavailable,
              getErrorMessage(error, "코드 실행 서버에 연결하지 못했습니다."),
            ),
          );
        });

        socket.onDisconnect(() => {
          if (get().socket !== socket) return;

          set({ socket: null, state: "DISCONNECTED" });
          clearSubscription();
          if (!settled) {
            fail(
              new ExecuteSocketError(
                EXECUTE_SOCKET_ERROR_CODE.disconnected,
                "인증 중 코드 실행 서버 연결이 끊어졌습니다.",
              ),
            );
          }
          cancelExecution?.(
            new ExecuteSocketError(
              EXECUTE_SOCKET_ERROR_CODE.disconnected,
              "코드 실행 서버 연결이 끊어졌습니다.",
            ),
          );
        });

        try {
          socket.connect();
          socket.sendAuthentication(dependencies.getAccessToken());
        } catch (error) {
          fail(
            new ExecuteSocketError(
              EXECUTE_SOCKET_ERROR_CODE.unavailable,
              getErrorMessage(
                error,
                "코드 실행 서버 연결을 시작하지 못했습니다.",
              ),
            ),
          );
        }
      });

      connectingPromise = promise.finally(() => {
        connectingPromise = null;
      });
      return connectingPromise;
    },

    disconnect: () => {
      const socket = get().socket;
      if (!socket) {
        set({ state: "DISCONNECTED" });
        return;
      }

      const disconnectError = new ExecuteSocketError(
        EXECUTE_SOCKET_ERROR_CODE.disconnected,
        "코드 실행 서버 연결이 종료되었습니다.",
      );
      cancelConnection?.(disconnectError);
      cancelExecution?.(disconnectError);
      clearSubscription();
      set({ socket: null, state: "DISCONNECTED" });
      socket.disconnect();
    },

    run: (data) => {
      const { socket, state } = get();
      if (!socket || state === "DISCONNECTED") {
        return Promise.reject(
          new ExecuteSocketError(
            EXECUTE_SOCKET_ERROR_CODE.unavailable,
            "코드 실행 서버에 연결되어 있지 않습니다.",
          ),
        );
      }
      if (state !== "WAITING") {
        return Promise.reject(
          new ExecuteSocketError(
            EXECUTE_SOCKET_ERROR_CODE.busy,
            "이미 코드 실행 요청을 처리하고 있습니다.",
          ),
        );
      }

      set({ state: "PENDING" });

      return new Promise<ResponseExecuteResult>((resolve, reject) => {
        let settled = false;
        const timeout = setTimeout(() => {
          fail(
            new ExecuteSocketError(
              EXECUTE_SOCKET_ERROR_CODE.ackTimeout,
              "코드 실행 서버가 요청에 응답하지 않았습니다.",
            ),
          );
        }, dependencies.ackTimeoutMs);

        const cleanup = () => {
          clearTimeout(timeout);
          socket.offExecutionError(handleExecutionError);
          if (cancelExecution === fail) cancelExecution = null;
        };

        const finish = (payload: unknown) => {
          if (settled) return;
          settled = true;
          cleanup();
          const result = decodeExecuteResult(payload);
          if (get().socket === socket) {
            if (result.code === "JWT_EXPIRED") {
              clearSubscription();
              set({ socket: null, state: "JWT_EXPIRED" });
              socket.disconnect();
            } else {
              set({ state: "WAITING" });
            }
          }
          resolve(result);
        };

        const fail = (error: ExecuteSocketError) => {
          if (settled) return;
          settled = true;
          cleanup();
          if (get().socket === socket) set({ state: "WAITING" });
          reject(error);
        };

        const handleExecutionError = (payload: unknown) => finish(payload);
        cancelExecution = fail;
        socket.onExecutionError(handleExecutionError);

        try {
          socket.sendExecution(data, finish);
        } catch (error) {
          fail(
            new ExecuteSocketError(
              EXECUTE_SOCKET_ERROR_CODE.unavailable,
              getErrorMessage(error, "코드 실행 요청을 전송하지 못했습니다."),
            ),
          );
        }
      });
    },

    execute: (handler) => {
      const socket = get().socket;
      if (!socket) {
        throw new ExecuteSocketError(
          EXECUTE_SOCKET_ERROR_CODE.unavailable,
          "코드 실행 결과를 받을 소켓이 없습니다.",
        );
      }

      clearSubscription();
      const nextHandler: PayloadHandler = (payload) => {
        if (get().socket !== socket) return;
        void handler(decodeExecuteResult(payload));
      };
      subscribedTransport = socket;
      subscribedHandler = nextHandler;
      socket.onExecutionResult(nextHandler);
    },
  }));
};

export const useExecuteSocketStore = createExecuteSocketStore();
