import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const saveRequests = [];
globalThis.__codeEditorSave = async () => ({
  statusCode: 200,
  errorCode: "0000",
  errorMessage: "",
  data: null,
});
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [
    {
      name: "code-editor-save-api-test-double",
      enforce: "pre",
      resolveId(source, importer) {
        if (
          source.endsWith("/src/api/code") &&
          importer?.endsWith("/src/zustand/CodeEditorStore.ts")
        ) {
          return "\0code-editor-save-api-test-double";
        }
      },
      load(id) {
        if (id !== "\0code-editor-save-api-test-double") return;
        return `
          export const saveCode = async (request) => {
            globalThis.__codeEditorSaveRequests.push(request);
            return globalThis.__codeEditorSave(request);
          };
          export const getSetting = async () => ({ statusCode: 200, data: null });
          export const getTemplates = async () => ({ statusCode: 200, data: null });
          export const loadCode = async () => ({ statusCode: 200, data: [] });
          export const setSetting = async () => ({ statusCode: 200, data: null });
        `;
      },
    },
  ],
});
globalThis.__codeEditorSaveRequests = saveRequests;

try {
  const [{ useCodeEditorStore }, saveDomain, saveApplication] =
    await Promise.all([
      server.ssrLoadModule("/src/zustand/CodeEditorStore.ts"),
      server.ssrLoadModule("/src/domain/editor/codeSave.ts"),
      server.ssrLoadModule("/src/application/editor/save.ts"),
    ]);

  assert.deepEqual(saveDomain.classifyCodeSaveResponse({ statusCode: 200 }), {
    type: "success",
  });
  assert.deepEqual(saveDomain.classifyCodeSaveResponse({ statusCode: 401 }), {
    type: "unauthenticated",
  });
  assert.deepEqual(saveDomain.classifyCodeSaveResponse({ statusCode: 503 }), {
    type: "failure",
    statusCode: 503,
  });
  assert.deepEqual(saveDomain.codeSaveRequestFailed(), {
    type: "request-failed",
  });

  const notifications = [
    { type: "success" },
    { type: "unauthenticated" },
    { type: "failure", statusCode: 503 },
    { type: "request-failed" },
  ].map(saveDomain.getCodeSaveNotification);
  assert.equal(notifications[0].variant, "success");
  assert.deepEqual(
    notifications.slice(1).map(({ variant }) => variant),
    ["fail", "fail", "fail"],
  );

  useCodeEditorStore.setState({ code: "old code", language: "C++" });
  globalThis.__codeEditorSave = async () => ({
    statusCode: 503,
    errorCode: "SAVE_FAILED",
    errorMessage: "ignored server copy",
    data: null,
  });
  assert.deepEqual(
    await useCodeEditorStore.getState().updateCode("problem-uuid"),
    { type: "failure", statusCode: 503 },
  );
  assert.deepEqual(saveRequests[0], {
    problemUuid: "problem-uuid",
    content: "old code",
    language: "C++",
  });

  globalThis.__codeEditorSave = async () => ({
    statusCode: 401,
    errorCode: "JWT_EXPIRED",
    errorMessage: "ignored server copy",
    data: null,
  });
  assert.deepEqual(
    await useCodeEditorStore.getState().updateCode("problem-uuid"),
    { type: "unauthenticated" },
  );

  useCodeEditorStore.setState({ code: "print('latest')", language: "Python" });
  globalThis.__codeEditorSave = async () => ({
    statusCode: 200,
    errorCode: "0000",
    errorMessage: "",
    data: null,
  });
  assert.deepEqual(
    await useCodeEditorStore.getState().updateCode("problem-uuid"),
    { type: "success" },
  );
  assert.deepEqual(saveRequests[2], {
    problemUuid: "problem-uuid",
    content: "print('latest')",
    language: "Python",
  });

  globalThis.__codeEditorSave = async () => {
    throw new Error("network unavailable");
  };
  assert.deepEqual(
    await useCodeEditorStore.getState().updateCode("problem-uuid"),
    { type: "request-failed" },
  );

  let finishSave;
  let saveCount = 0;
  const lock = { current: false };
  const shownNotifications = [];
  const firstSave = saveApplication.saveEditorCode(lock, "problem-uuid", {
    save: async () => {
      saveCount += 1;
      await new Promise((resolve) => {
        finishSave = resolve;
      });
      return { type: "failure", statusCode: 503 };
    },
    notify: (notification) => shownNotifications.push(notification),
  });
  const duplicateSave = await saveApplication.saveEditorCode(
    lock,
    "problem-uuid",
    {
      save: async () => {
        saveCount += 1;
        return { type: "success" };
      },
      notify: (notification) => shownNotifications.push(notification),
    },
  );
  assert.equal(duplicateSave, undefined);
  assert.equal(saveCount, 1);
  finishSave();
  assert.deepEqual(await firstSave, { type: "failure", statusCode: 503 });
  assert.equal(lock.current, false);
  assert.deepEqual(shownNotifications, [
    {
      message: "코드를 저장하지 못했습니다. 다시 시도해 주세요.",
      variant: "fail",
    },
  ]);

  const retryResult = await saveApplication.saveEditorCode(
    lock,
    "problem-uuid",
    {
      save: async () => ({ type: "success" }),
      notify: (notification) => shownNotifications.push(notification),
    },
  );
  assert.deepEqual(retryResult, { type: "success" });
  assert.equal(lock.current, false);
  assert.equal(shownNotifications.at(-1).variant, "success");

  const exceptionResult = await saveApplication.saveEditorCode(
    lock,
    "problem-uuid",
    {
      save: async () => {
        throw new Error("unexpected failure");
      },
      notify: (notification) => shownNotifications.push(notification),
    },
  );
  assert.deepEqual(exceptionResult, { type: "request-failed" });
  assert.equal(lock.current, false);
  assert.equal(shownNotifications.at(-1).variant, "fail");

  assert.deepEqual(
    await saveApplication.saveEditorCode(lock, "problem-uuid", {
      save: async () => ({ type: "success" }),
      notify: (notification) => shownNotifications.push(notification),
    }),
    { type: "success" },
  );
  assert.equal(lock.current, false);

  console.log("ALGOGO-140 code editor save tests passed");
} finally {
  delete globalThis.__codeEditorSave;
  delete globalThis.__codeEditorSaveRequests;
  delete globalThis.localStorage;
  await server.close();
}
