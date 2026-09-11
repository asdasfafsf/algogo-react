export type ClipboardWriteText = (content: string) => Promise<void>;
export type ClipboardReadText = () => Promise<string>;

type ClipboardFailureReason = "unavailable" | "rejected";

export type ClipboardFeedback = {
  message: string;
  variant: "success" | "fail";
};

export type ClipboardCopyResult =
  | { status: "success"; feedback: ClipboardFeedback }
  | {
      status: "failure";
      reason: ClipboardFailureReason;
      feedback: ClipboardFeedback;
    };

export type ClipboardPasteResult =
  | { status: "success"; value: string; feedback: ClipboardFeedback }
  | {
      status: "failure";
      reason: ClipboardFailureReason;
      feedback: ClipboardFeedback;
    };

class ClipboardUnavailableError extends Error {}

function getBrowserClipboardReader(): ClipboardReadText | null {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.clipboard?.readText !== "function"
  ) {
    return null;
  }

  return navigator.clipboard.readText.bind(navigator.clipboard);
}

function getBrowserClipboardWriter(): ClipboardWriteText | null {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.clipboard?.writeText !== "function"
  ) {
    return null;
  }

  return navigator.clipboard.writeText.bind(navigator.clipboard);
}

export async function writeTextToClipboard(
  content: string,
  writer: ClipboardWriteText | null = getBrowserClipboardWriter(),
): Promise<void> {
  if (!writer) {
    throw new ClipboardUnavailableError("Clipboard API를 사용할 수 없습니다.");
  }

  await writer(content);
}

export async function readTextFromClipboard(
  reader: ClipboardReadText | null = getBrowserClipboardReader(),
): Promise<string> {
  if (!reader) {
    throw new ClipboardUnavailableError("Clipboard API를 사용할 수 없습니다.");
  }

  return reader();
}

function getClipboardFeedback(
  action: "copy" | "paste",
  failureReason?: ClipboardFailureReason,
): ClipboardFeedback {
  if (!failureReason) {
    return action === "copy"
      ? { message: "클립보드에 복사했습니다.", variant: "success" }
      : {
          message: "클립보드 내용을 붙여넣었습니다.",
          variant: "success",
        };
  }

  if (failureReason === "unavailable") {
    return action === "copy"
      ? {
          message: "이 브라우저에서는 클립보드 복사를 사용할 수 없습니다.",
          variant: "fail",
        }
      : {
          message:
            "이 브라우저에서는 클립보드 붙여넣기를 사용할 수 없습니다. 직접 입력해 주세요.",
          variant: "fail",
        };
  }

  return action === "copy"
    ? {
        message:
          "복사하지 못했습니다. 클립보드 권한을 확인하고 다시 시도해 주세요.",
        variant: "fail",
      }
    : {
        message:
          "붙여넣지 못했습니다. 클립보드 권한을 확인하거나 직접 입력해 주세요.",
        variant: "fail",
      };
}

function getFailureReason(error: unknown): ClipboardFailureReason {
  return error instanceof ClipboardUnavailableError
    ? "unavailable"
    : "rejected";
}

export async function copyTextWithFeedback(
  content: string,
  writer?: ClipboardWriteText | null,
): Promise<ClipboardCopyResult> {
  try {
    await writeTextToClipboard(content, writer);
    return { status: "success", feedback: getClipboardFeedback("copy") };
  } catch (error) {
    const reason = getFailureReason(error);
    return {
      status: "failure",
      reason,
      feedback: getClipboardFeedback("copy", reason),
    };
  }
}

export async function pasteTextWithFeedback(
  reader?: ClipboardReadText | null,
): Promise<ClipboardPasteResult> {
  try {
    const value = await readTextFromClipboard(reader);
    return {
      status: "success",
      value,
      feedback: getClipboardFeedback("paste"),
    };
  } catch (error) {
    const reason = getFailureReason(error);
    return {
      status: "failure",
      reason,
      feedback: getClipboardFeedback("paste", reason),
    };
  }
}
