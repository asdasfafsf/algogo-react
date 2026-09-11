type SubmissionPopup = Pick<Window, "close" | "location" | "opener">;

export type OpenBrowserWindow = (
  url?: string | URL,
  target?: string,
) => SubmissionPopup | null;

const getBrowserWindowOpener = (): OpenBrowserWindow | null => {
  if (typeof window === "undefined") return null;
  return window.open.bind(window);
};

export function openSubmissionPage(
  url: string,
  openWindow: OpenBrowserWindow | null = getBrowserWindowOpener(),
): boolean {
  if (!openWindow) return false;

  let popup: SubmissionPopup | null = null;
  try {
    popup = openWindow("", "_blank");
    if (!popup) return false;

    popup.opener = null;
    popup.location.replace(url);
    return true;
  } catch {
    popup?.close();
    return false;
  }
}
