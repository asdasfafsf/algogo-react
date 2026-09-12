const executionOutputCodes = new Set(["0000", "9000", "9001", "9002"]);

export const isExecutionOutputCode = (code: string) =>
  executionOutputCodes.has(code);

export const executionFailureMessage = (code: string) => {
  if (code === "SOCKET_BUSY" || code === "SOCKET_CONNECTING") {
    return "이미 코드를 실행하고 있습니다. 결과가 나올 때까지 잠시 기다려 주세요.";
  }

  if (
    code === "AUTH_FAILED" ||
    code === "UNAUTHORIZED" ||
    code.startsWith("JWT_")
  ) {
    return "로그인 정보를 확인할 수 없습니다. 다시 로그인해 주세요.";
  }

  if (code === "SOCKET_CONNECTION_TIMEOUT" || code === "SOCKET_ACK_TIMEOUT") {
    return "코드 실행 서버의 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.";
  }

  if (code === "SOCKET_DISCONNECTED" || code === "SOCKET_UNAVAILABLE") {
    return "코드 실행 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.";
  }

  return "코드를 실행하지 못했습니다. 잠시 후 다시 시도해 주세요.";
};

export const executionFailureDetail = (code: string) => {
  if (
    code === "AUTH_FAILED" ||
    code === "UNAUTHORIZED" ||
    code.startsWith("JWT_")
  ) {
    return "로그인 상태를 확인한 뒤 다시 실행해 주세요.";
  }

  if (code === "SOCKET_CONNECTION_TIMEOUT" || code === "SOCKET_ACK_TIMEOUT") {
    return "잠시 기다린 뒤 실행 버튼을 다시 눌러 주세요.";
  }

  if (code === "SOCKET_DISCONNECTED" || code === "SOCKET_UNAVAILABLE") {
    return "네트워크 연결을 확인한 뒤 다시 실행해 주세요.";
  }

  return "문제가 계속되면 잠시 후 페이지를 새로고침해 다시 시도해 주세요.";
};
