export type OAuthFlow = "login" | "connect" | "disconnect";

export type OAuthCallbackOutcome =
  | { type: "login-success"; destination: string }
  | { type: "connect-success"; destination: string; message: string }
  | { type: "disconnect-success"; destination: string; message: string }
  | { type: "account-deleted"; destination: "/"; message: string }
  | { type: "failure"; destination: "/login" | "/me"; message: string };

const defaultDestination = (flow: OAuthFlow) =>
  flow === "login" ? "/" : "/me";

export const parseOAuthDestination = (
  state: string | null,
  flow: OAuthFlow,
): string => {
  if (!state) return defaultDestination(flow);

  try {
    const parsed: unknown = JSON.parse(state);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "destination" in parsed
    ) {
      const { destination } = parsed as { destination?: unknown };
      if (typeof destination === "string") return destination;
    }
  } catch {
    // The provider state is external input; malformed values use the existing fallback route.
  }
  return defaultDestination(flow);
};

export const createOAuthEntryUrl = ({
  environment,
  provider,
  destination,
  action,
}: {
  environment: string;
  provider: OAuthProvider;
  destination: string;
  action?: "connect" | "disconnect";
}): string => {
  const baseUrl =
    environment === "development"
      ? "http://localhost:3001/oauth/v2"
      : "https://www.algogo.co.kr/oauth/v2";
  const actionPath = action ? `/${action}` : "";
  return `${baseUrl}${actionPath}/${provider}?destination=${destination}`;
};

export const disconnectConfirmation = (connectionCount: number): string =>
  connectionCount === 1
    ? "연동 정보가 1개입니다. 연동 취소하면 회원 탈퇴됩니다. 진행하시겠습니까?"
    : "연동 취소하시겠습니까?";

export const oauthFailure = (flow: OAuthFlow): OAuthCallbackOutcome => ({
  type: "failure",
  destination: flow === "login" ? "/login" : "/me",
  message:
    flow === "login"
      ? "로그인에 실패했습니다. 다시 시도해주세요."
      : `연동${flow === "disconnect" ? " 해제" : ""}에 실패했습니다. 다시 시도해주세요.`,
});

export const oauthSuccess = (
  flow: OAuthFlow,
  destination: string,
  remainingConnections?: number,
): OAuthCallbackOutcome => {
  if (flow === "login") return { type: "login-success", destination };
  if (flow === "connect")
    return {
      type: "connect-success",
      destination,
      message: "연동 완료되었습니다.",
    };
  if (remainingConnections === 0) {
    return {
      type: "account-deleted",
      destination: "/",
      message: "회원 탈퇴되었습니다.",
    };
  }
  return {
    type: "disconnect-success",
    destination,
    message: "연동 해제되었습니다.",
  };
};
