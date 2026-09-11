export const hasStoredSession = (serializedMe: string | null): boolean =>
  serializedMe !== null;

export const isHttpSuccess = (response: { statusCode: number }): boolean =>
  response.statusCode === 200;

export const isBusinessSuccess = (response: { errorCode: string }): boolean =>
  response.errorCode === "0000";

export const accountSessionErrorCode = {
  tokenRequestFailed: "TOKEN_REQUEST_FAILED",
  refreshRequestFailed: "REFRESH_REQUEST_FAILED",
  refreshTokenMissing: "REFRESH_TOKEN_MISSING",
} as const;

export type AccountSessionErrorCode =
  (typeof accountSessionErrorCode)[keyof typeof accountSessionErrorCode];

export class AccountSessionError extends Error {
  readonly code: AccountSessionErrorCode;

  constructor(code: AccountSessionErrorCode) {
    super(code);
    this.name = "AccountSessionError";
    this.code = code;
  }
}

export type AccountSessionOutcome<T> =
  | { type: "success"; data: T }
  | { type: "failure"; code: AccountSessionErrorCode };

export const sessionRequestOutcome = <T>(
  response: { statusCode: number; data: T },
  request: "token" | "refresh",
): AccountSessionOutcome<T> =>
  isHttpSuccess(response)
    ? { type: "success", data: response.data }
    : {
        type: "failure",
        code:
          request === "token"
            ? accountSessionErrorCode.tokenRequestFailed
            : accountSessionErrorCode.refreshRequestFailed,
      };

export const refreshTokenOutcome = (
  refreshToken: string | null,
): AccountSessionOutcome<string> =>
  refreshToken
    ? { type: "success", data: refreshToken }
    : {
        type: "failure",
        code: accountSessionErrorCode.refreshTokenMissing,
      };
