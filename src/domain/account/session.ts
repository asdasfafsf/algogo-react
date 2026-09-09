export const hasStoredSession = (serializedMe: string | null): boolean =>
  serializedMe !== null;

export const isHttpSuccess = (response: { statusCode: number }): boolean =>
  response.statusCode === 200;

export const isBusinessSuccess = (response: { errorCode: string }): boolean =>
  response.errorCode === "0000";

export const requireRefreshToken = (refreshToken: string | null): string => {
  if (!refreshToken) throw new Error("refreshToken이 없습니다.");
  return refreshToken;
};
