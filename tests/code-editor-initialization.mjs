import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const themePreferenceKey = "algogo-editor-theme-preference";
const calls = [];
const storage = new Map();
globalThis.__codeEditorApi = {};
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};

const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [
    {
      name: "code-editor-initialization-api-test-double",
      enforce: "pre",
      resolveId(source, importer) {
        if (
          source.endsWith("/src/api/code") &&
          importer?.endsWith("/src/zustand/CodeEditorStore.ts")
        ) {
          return "\0code-editor-initialization-api-test-double";
        }
      },
      load(id) {
        if (id !== "\0code-editor-initialization-api-test-double") return;
        return `
          const request = (name, ...args) => globalThis.__codeEditorApi[name](...args);
          export const getSetting = () => request("getSetting");
          export const getTemplates = () => request("getTemplates");
          export const loadCode = (...args) => request("loadCode", ...args);
          export const saveCode = (...args) => request("saveCode", ...args);
          export const setSetting = (...args) => request("setSetting", ...args);
        `;
      },
    },
  ],
});

const setting = {
  statusCode: 200,
  errorCode: "0000",
  errorMessage: "",
  data: {
    theme: "vs-dark",
    fontSize: 14,
    tabSize: 4,
    lineNumber: "on",
    defaultLanguage: "C++",
  },
};
const templates = {
  statusCode: 200,
  errorCode: "0000",
  errorMessage: "",
  data: {
    defaultList: [
      {
        uuid: "cpp-default",
        name: "C++ 기본 템플릿",
        description: "기본 코드",
        language: "C++",
        content: "#include <bits/stdc++.h>",
      },
    ],
    summaryList: [],
  },
};

const configureApi = ({ getSetting, getTemplates, loadCode }) => {
  globalThis.__codeEditorApi = {
    getSetting: async () => {
      calls.push("setting");
      return getSetting();
    },
    getTemplates: async () => {
      calls.push("templates");
      return getTemplates();
    },
    loadCode: async () => {
      calls.push("code");
      return loadCode();
    },
    saveCode: async () => ({ statusCode: 200, data: null }),
    setSetting: async () => ({ statusCode: 200, data: null }),
  };
};

try {
  const { useCodeEditorStore } = await server.ssrLoadModule(
    "/src/zustand/CodeEditorStore.ts",
  );
  assert.equal(useCodeEditorStore.getState().themePreference, "site");

  configureApi({
    getSetting: () => setting,
    getTemplates: () => templates,
    loadCode: () => ({ statusCode: 200, data: [] }),
  });
  const initialized = await useCodeEditorStore
    .getState()
    .initialize("problem-uuid");
  assert.equal(initialized.type, "loaded");
  assert.deepEqual(calls, ["setting", "templates", "code"]);
  assert.equal(useCodeEditorStore.getState().code, "#include <bits/stdc++.h>");
  assert.equal(useCodeEditorStore.getState().themePreference, "vs-dark");

  storage.set(themePreferenceKey, "site");
  await useCodeEditorStore.getState().initialize("problem-uuid");
  assert.equal(useCodeEditorStore.getState().themePreference, "site");

  storage.set(themePreferenceKey, "light");
  await useCodeEditorStore.getState().initialize("problem-uuid");
  assert.equal(useCodeEditorStore.getState().themePreference, "light");
  storage.delete(themePreferenceKey);

  calls.length = 0;
  configureApi({
    getSetting: () => setting,
    getTemplates: () => ({ statusCode: 401, data: undefined }),
    loadCode: () => {
      throw new Error("loadCode must not be called after 401");
    },
  });
  const unauthenticated = await useCodeEditorStore
    .getState()
    .initialize("problem-uuid");
  assert.deepEqual(unauthenticated, { type: "unauthenticated" });
  assert.deepEqual(calls, ["setting", "templates"]);

  calls.length = 0;
  configureApi({
    getSetting: () => setting,
    getTemplates: () => {
      throw new Error("network unavailable");
    },
    loadCode: () => {
      throw new Error("loadCode must not run after a template failure");
    },
  });
  const requestFailed = await useCodeEditorStore
    .getState()
    .initialize("problem-uuid");
  assert.deepEqual(requestFailed, { type: "request-failed" });
  assert.deepEqual(calls, ["setting", "templates"]);

  console.log("ALGOGO-115 code editor initialization tests passed");
} finally {
  delete globalThis.__codeEditorApi;
  delete globalThis.localStorage;
  await server.close();
}
