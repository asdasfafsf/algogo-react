export type ClipboardWriteText = (content: string) => Promise<void>;

function getBrowserClipboardWriter(): ClipboardWriteText | null {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return null;
  }

  return navigator.clipboard.writeText.bind(navigator.clipboard);
}

export async function writeTextToClipboard(
  content: string,
  writer: ClipboardWriteText | null = getBrowserClipboardWriter(),
): Promise<void> {
  if (!writer) {
    throw new Error("Clipboard API를 사용할 수 없습니다.");
  }

  await writer(content);
}
