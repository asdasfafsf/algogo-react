import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const {
    copyTextWithFeedback,
    pasteTextWithFeedback,
    readTextFromClipboard,
    writeTextToClipboard,
  } = await server.ssrLoadModule("/src/lib/clipboard.ts");
  const { createExclusiveRunner } = await server.ssrLoadModule(
    "/src/lib/exclusive.ts",
  );
  const content = "  first line  \nsecond line\n\nlast space ";
  const writes = [];

  await writeTextToClipboard(content, async (value) => {
    writes.push(value);
  });
  assert.deepEqual(writes, [content]);

  await assert.rejects(
    () => writeTextToClipboard(content, null),
    /Clipboard API를 사용할 수 없습니다/,
  );

  let attempts = 0;
  const failOnceWriter = async (value) => {
    attempts += 1;
    if (attempts === 1) {
      throw new Error("clipboard unavailable");
    }
    writes.push(value);
  };

  await assert.rejects(
    () => writeTextToClipboard(content, failOnceWriter),
    /clipboard unavailable/,
  );
  await writeTextToClipboard(content, failOnceWriter);
  assert.deepEqual(writes, [content, content]);

  assert.equal(await readTextFromClipboard(async () => content), content);
  await assert.rejects(
    () => readTextFromClipboard(null),
    /Clipboard API를 사용할 수 없습니다/,
  );

  const copied = await copyTextWithFeedback(content, async (value) => {
    writes.push(value);
  });
  assert.deepEqual(copied, {
    status: "success",
    feedback: {
      message: "클립보드에 복사했습니다.",
      variant: "success",
    },
  });
  assert.equal(writes.at(-1), content);

  const rejectedCopy = await copyTextWithFeedback(content, async () => {
    throw new Error("permission denied");
  });
  assert.deepEqual(rejectedCopy, {
    status: "failure",
    reason: "rejected",
    feedback: {
      message:
        "복사하지 못했습니다. 클립보드 권한을 확인하고 다시 시도해 주세요.",
      variant: "fail",
    },
  });

  const unsupportedCopy = await copyTextWithFeedback(content, null);
  assert.deepEqual(unsupportedCopy, {
    status: "failure",
    reason: "unavailable",
    feedback: {
      message: "이 브라우저에서는 클립보드 복사를 사용할 수 없습니다.",
      variant: "fail",
    },
  });

  const pasted = await pasteTextWithFeedback(async () => content);
  assert.deepEqual(pasted, {
    status: "success",
    value: content,
    feedback: {
      message: "클립보드 내용을 붙여넣었습니다.",
      variant: "success",
    },
  });

  const rejectedPaste = await pasteTextWithFeedback(async () => {
    throw new Error("permission denied");
  });
  assert.deepEqual(rejectedPaste, {
    status: "failure",
    reason: "rejected",
    feedback: {
      message:
        "붙여넣지 못했습니다. 클립보드 권한을 확인하거나 직접 입력해 주세요.",
      variant: "fail",
    },
  });

  const unsupportedPaste = await pasteTextWithFeedback(null);
  assert.deepEqual(unsupportedPaste, {
    status: "failure",
    reason: "unavailable",
    feedback: {
      message:
        "이 브라우저에서는 클립보드 붙여넣기를 사용할 수 없습니다. 직접 입력해 주세요.",
      variant: "fail",
    },
  });

  const [panelHookSource, promptModalSource] = await Promise.all([
    fs.readFile(
      new URL("../src/hook/useCodeResultPanel.ts", import.meta.url),
      "utf8",
    ),
    fs.readFile(
      new URL("../src/components/modal/PromptModal.tsx", import.meta.url),
      "utf8",
    ),
  ]);
  assert.doesNotMatch(panelHookSource, /navigator\.clipboard/);
  assert.doesNotMatch(promptModalSource, /navigator\.clipboard/);
  assert.match(panelHookSource, /pasteTextWithFeedback/);
  assert.match(panelHookSource, /copyTextWithFeedback/);
  assert.match(promptModalSource, /pasteTextWithFeedback/);
  assert.match(
    promptModalSource,
    /result\.status === "success"[\s\S]*setValue\(result\.value\)/,
  );

  const runExclusive = createExclusiveRunner();
  let finishFirst;
  let operationCalls = 0;
  const firstRun = runExclusive(
    () =>
      new Promise((resolve) => {
        operationCalls += 1;
        finishFirst = resolve;
      }),
  );
  const blockedRun = await runExclusive(async () => {
    operationCalls += 1;
    return "중복 호출";
  });
  assert.deepEqual(blockedRun, { started: false });
  assert.equal(operationCalls, 1);

  finishFirst("첫 호출 완료");
  assert.deepEqual(await firstRun, {
    started: true,
    value: "첫 호출 완료",
  });
  assert.deepEqual(await runExclusive(async () => "재시도 완료"), {
    started: true,
    value: "재시도 완료",
  });

  console.log("ALGOGO-143 clipboard interaction tests passed");
} finally {
  await server.close();
}
