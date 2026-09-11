import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [submission, workflow, browser] = await Promise.all([
    server.ssrLoadModule("/src/domain/editor/submission.ts"),
    server.ssrLoadModule("/src/application/editor/submit.ts"),
    server.ssrLoadModule("/src/lib/submissionBrowser.ts"),
  ]);

  const validInput = {
    problem: { source: "BOJ", sourceId: 1000 },
    code: "  print(1)\n",
  };

  const events = [];
  let finishCopy;
  const pendingSubmission = workflow.submitCode(validInput, {
    openPage: (url) => {
      events.push(`open:${url}`);
      return true;
    },
    copyText: (content) => {
      events.push(`copy:${JSON.stringify(content)}`);
      return new Promise((resolve) => {
        finishCopy = resolve;
      });
    },
  });
  assert.deepEqual(events, [
    'copy:"  print(1)\\n"',
    "open:https://www.acmicpc.net/submit/1000",
  ]);
  finishCopy();
  assert.deepEqual(await pendingSubmission, {
    type: "completed",
    page: "opened",
    clipboard: "copied",
  });

  let emptyActionCount = 0;
  assert.deepEqual(
    await workflow.submitCode(
      { ...validInput, code: " \n\t " },
      {
        openPage: () => {
          emptyActionCount += 1;
          return true;
        },
        copyText: async () => {
          emptyActionCount += 1;
        },
      },
    ),
    { type: "empty-code" },
  );
  assert.equal(emptyActionCount, 0);

  assert.deepEqual(
    await workflow.submitCode(
      { code: "print(1)" },
      {
        openPage: () => true,
        copyText: async () => undefined,
      },
    ),
    { type: "problem-unavailable" },
  );

  let unsupportedCopy = "";
  assert.deepEqual(
    await workflow.submitCode(
      {
        problem: { source: "OTHER", sourceId: 1 },
        code: validInput.code,
      },
      {
        openPage: () => {
          assert.fail("unsupported source must not open a page");
        },
        copyText: async (content) => {
          unsupportedCopy = content;
        },
      },
    ),
    { type: "completed", page: "unsupported", clipboard: "copied" },
  );
  assert.equal(unsupportedCopy, validInput.code);

  assert.deepEqual(
    await workflow.submitCode(validInput, {
      openPage: () => false,
      copyText: async () => undefined,
    }),
    { type: "completed", page: "blocked", clipboard: "copied" },
  );
  assert.deepEqual(
    await workflow.submitCode(validInput, {
      openPage: () => {
        throw new Error("popup failure");
      },
      copyText: () => {
        throw new Error("clipboard failure");
      },
    }),
    { type: "completed", page: "blocked", clipboard: "failed" },
  );
  assert.deepEqual(
    await workflow.submitCode(validInput, {
      openPage: () => true,
      copyText: async () => {
        throw new Error("clipboard failure");
      },
    }),
    { type: "completed", page: "opened", clipboard: "failed" },
  );

  const popupEvents = [];
  const popup = {
    opener: { name: "parent" },
    location: {
      replace: (url) => popupEvents.push(`replace:${url}:${popup.opener}`),
    },
    close: () => popupEvents.push("close"),
  };
  assert.equal(
    browser.openSubmissionPage(
      "https://www.acmicpc.net/submit/1000",
      (url, target) => {
        popupEvents.push(`open:${url}:${target}`);
        return popup;
      },
    ),
    true,
  );
  assert.deepEqual(popupEvents, [
    "open::_blank",
    "replace:https://www.acmicpc.net/submit/1000:null",
  ]);
  assert.equal(popup.opener, null);
  assert.equal(
    browser.openSubmissionPage("https://example.com", () => null),
    false,
  );

  let closedAfterNavigationFailure = false;
  assert.equal(
    browser.openSubmissionPage("https://example.com", () => ({
      opener: {},
      location: {
        replace: () => {
          throw new Error("navigation failure");
        },
      },
      close: () => {
        closedAfterNavigationFailure = true;
      },
    })),
    false,
  );
  assert.equal(closedAfterNavigationFailure, true);

  const feedbackCases = [
    [
      { type: "problem-unavailable" },
      "문제 정보를 불러온 뒤 다시 시도해 주세요.",
      "fail",
    ],
    [{ type: "empty-code" }, "제출할 코드를 먼저 입력해 주세요.", "default"],
    [
      { type: "completed", page: "opened", clipboard: "copied" },
      "제출 페이지를 열고 코드를 복사했어요.",
      "success",
    ],
    [
      { type: "completed", page: "opened", clipboard: "failed" },
      "제출 페이지를 열었어요. 코드는 직접 복사해 주세요.",
      "default",
    ],
    [
      { type: "completed", page: "unsupported", clipboard: "copied" },
      "이 문제는 제출 페이지를 바로 열 수 없어요. 코드는 복사해 두었어요.",
      "default",
    ],
    [
      { type: "completed", page: "unsupported", clipboard: "failed" },
      "이 문제는 제출 페이지를 바로 열 수 없어요. 코드를 직접 복사해 주세요.",
      "fail",
    ],
    [
      { type: "completed", page: "blocked", clipboard: "copied" },
      "새 창을 열지 못했어요. 팝업을 허용한 뒤 다시 눌러 주세요. 코드는 복사해 두었어요.",
      "default",
    ],
    [
      { type: "completed", page: "blocked", clipboard: "failed" },
      "새 창과 코드 복사가 모두 막혔어요. 브라우저 설정을 확인한 뒤 다시 눌러 주세요.",
      "fail",
    ],
  ];
  for (const [result, message, variant] of feedbackCases) {
    assert.deepEqual(submission.getSubmissionFeedback(result), {
      message,
      variant,
    });
  }

  console.log("ALGOGO-139 submission flow tests passed");
} finally {
  await server.close();
}
