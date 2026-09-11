export type AuthPagePath = "/login" | "/signup";

export function createAuthDestination(
  pathname: string,
  search: string,
  hash: string,
): string {
  return `${pathname}${search}${hash}`;
}

export function createAuthRedirectPath(
  authPagePath: AuthPagePath,
  destination: string,
): string {
  return `${authPagePath}?destination=${encodeURIComponent(destination)}`;
}

export function createPreservedAuthSearch(destination: string | null): string {
  return destination ? `?destination=${encodeURIComponent(destination)}` : "";
}
