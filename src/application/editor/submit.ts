import {
  getSubmissionUrl,
  type SubmissionResult,
} from "@/domain/editor/submission";

export type SubmissionInput = {
  problem?: {
    source: string;
    sourceId: string | number;
  };
  code: string;
};

export type SubmissionPorts = {
  openPage: (url: string) => boolean;
  copyText: (content: string) => Promise<void>;
};

export async function submitCode(
  input: SubmissionInput,
  ports: SubmissionPorts,
): Promise<SubmissionResult> {
  if (!input.problem) return { type: "problem-unavailable" };
  if (!input.code.trim()) return { type: "empty-code" };

  let clipboardResult: Promise<"copied" | "failed">;
  try {
    clipboardResult = ports.copyText(input.code).then(
      () => "copied",
      () => "failed",
    );
  } catch {
    clipboardResult = Promise.resolve("failed");
  }

  const submissionUrl = getSubmissionUrl(input.problem);
  let page: "opened" | "unsupported" | "blocked" = "unsupported";

  if (submissionUrl) {
    try {
      page = ports.openPage(submissionUrl) ? "opened" : "blocked";
    } catch {
      page = "blocked";
    }
  }

  return {
    type: "completed",
    page,
    clipboard: await clipboardResult,
  };
}
