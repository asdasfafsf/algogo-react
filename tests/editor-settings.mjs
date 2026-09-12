import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
globalThis.__editorSettingsApiCalls = [];
globalThis.__editorSettingsApiMode = "success";

const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [
    {
      name: "editor-settings-api-test-double",
      enforce: "pre",
      resolveId(source, importer) {
        if (
          source.endsWith("/src/api/code") &&
          importer?.endsWith("/src/zustand/CodeEditorStore.ts")
        ) {
          return "\0editor-settings-api-test-double";
        }
      },
      load(id) {
        if (id !== "\0editor-settings-api-test-double") return;
        return `
          export const setSetting = async (input) => {
            globalThis.__editorSettingsApiCalls.push(input);
            if (globalThis.__editorSettingsApiMode === "throw") {
              throw new Error("save failed");
            }
            return {
              statusCode: globalThis.__editorSettingsApiMode === "success" ? 200 : 500,
              errorCode: "",
              errorMessage: "",
              data: null,
            };
          };
          export const getSetting = async () => ({ statusCode: 500 });
          export const getTemplates = async () => ({ statusCode: 500 });
          export const loadCode = async () => ({ statusCode: 500 });
          export const saveCode = async () => ({ statusCode: 500 });
        `;
      },
    },
  ],
});

const settings = {
  theme: "vs-dark",
  fontSize: 16,
  tabSize: 4,
  lineNumber: "on",
  defaultLanguage: "C++",
};

const saveInput = (overrides = {}) => ({
  settings,
  themePreference: "vs-dark",
  problemContentSize: 120,
  saveToServer: true,
  ...overrides,
});

const createPorts = (events, update) => ({
  setProblemContentSize: async (size) => events.push(`size:${size}`),
  setCodeEditorSettings: async () => events.push("settings"),
  setThemePreference: async (theme) => events.push(`theme:${theme}`),
  persistThemePreference: async (theme) => events.push(`persist:${theme}`),
  updateCodeEditorSettings: async (input) => {
    events.push(`update:${input.fontSize}`);
    return update(input);
  },
  close: async () => events.push("close"),
});

try {
  const [settingsWorkflow, settingsDomain, settingsForm, editorStoreModule] =
    await Promise.all([
      server.ssrLoadModule("/src/application/editor/settings.ts"),
      server.ssrLoadModule("/src/domain/editor/settingsSave.ts"),
      server.ssrLoadModule("/src/domain/editor/settingsForm.ts"),
      server.ssrLoadModule("/src/zustand/CodeEditorStore.ts"),
    ]);
  const { cancelEditorSettings, saveEditorSettings } = settingsWorkflow;
  const {
    classifyEditorSettingsSaveResponse,
    getEditorSettingsSaveFailureMessage,
    runExclusiveEditorSettingsSave,
  } = settingsDomain;
  const { parseEditorTabSize } = settingsForm;
  const { useCodeEditorStore } = editorStoreModule;

  assert.equal(parseEditorTabSize(""), 4);
  assert.equal(parseEditorTabSize("8"), 8);

  const successEvents = [];
  const success = await saveEditorSettings(
    saveInput(),
    createPorts(successEvents, async () => ({ type: "success" })),
  );
  assert.deepEqual(success, { type: "success" });
  assert.deepEqual(successEvents, [
    "update:16",
    "size:120",
    "settings",
    "theme:vs-dark",
    "persist:vs-dark",
    "close",
  ]);

  const localOnlyEvents = [];
  const localOnly = await saveEditorSettings(
    saveInput({
      themePreference: "site",
      problemContentSize: 90,
      saveToServer: false,
    }),
    createPorts(localOnlyEvents, async () => {
      throw new Error("local save must not request the server");
    }),
  );
  assert.deepEqual(localOnly, { type: "success" });
  assert.deepEqual(localOnlyEvents, [
    "size:90",
    "settings",
    "theme:site",
    "persist:site",
    "close",
  ]);

  const followSiteEvents = [];
  let followSiteRequest;
  const followSite = await saveEditorSettings(
    saveInput({ themePreference: "site" }),
    createPorts(followSiteEvents, async (input) => {
      followSiteRequest = input;
      return { type: "success" };
    }),
  );
  assert.deepEqual(followSite, { type: "success" });
  assert.deepEqual(followSiteRequest, {
    fontSize: 16,
    tabSize: 4,
    lineNumber: "on",
    defaultLanguage: "C++",
  });
  assert.equal(Object.values(followSiteRequest).includes("site"), false);
  assert.deepEqual(followSiteEvents, [
    "update:16",
    "size:120",
    "settings",
    "theme:site",
    "persist:site",
    "close",
  ]);

  const responseFailureEvents = [];
  const responseFailure = await saveEditorSettings(
    saveInput({ problemContentSize: 110 }),
    createPorts(responseFailureEvents, async () => ({
      type: "failure",
      statusCode: 500,
    })),
  );
  assert.deepEqual(responseFailure, { type: "failure", statusCode: 500 });
  assert.deepEqual(responseFailureEvents, ["update:16"]);

  const requestFailureEvents = [];
  const requestFailure = await saveEditorSettings(
    saveInput({ problemContentSize: 110 }),
    createPorts(requestFailureEvents, async () => {
      throw new Error("save failed");
    }),
  );
  assert.deepEqual(requestFailure, { type: "request-failed" });
  assert.deepEqual(requestFailureEvents, ["update:16"]);

  assert.deepEqual(classifyEditorSettingsSaveResponse({ statusCode: 200 }), {
    type: "success",
  });
  assert.deepEqual(classifyEditorSettingsSaveResponse({ statusCode: 401 }), {
    type: "unauthenticated",
  });
  assert.match(
    getEditorSettingsSaveFailureMessage({ type: "request-failed" }),
    /다시 시도/,
  );

  const saveLock = { current: false };
  let finishFirstSave;
  let saveCount = 0;
  const firstSave = runExclusiveEditorSettingsSave(saveLock, async () => {
    saveCount += 1;
    return new Promise((resolve) => {
      finishFirstSave = resolve;
    });
  });
  const duplicateSave = await runExclusiveEditorSettingsSave(
    saveLock,
    async () => {
      saveCount += 1;
    },
  );
  assert.equal(duplicateSave, undefined);
  assert.equal(saveCount, 1);
  finishFirstSave("saved");
  assert.equal(await firstSave, "saved");
  await runExclusiveEditorSettingsSave(saveLock, async () => {
    saveCount += 1;
  });
  assert.equal(saveCount, 2);

  const initialStoreSettings = useCodeEditorStore.getState().settings;
  globalThis.__editorSettingsApiMode = "success";
  const storeSuccess = await useCodeEditorStore
    .getState()
    .updateSetting(settings);
  assert.deepEqual(storeSuccess, { type: "success" });
  assert.deepEqual(globalThis.__editorSettingsApiCalls, [settings]);
  assert.deepEqual(
    useCodeEditorStore.getState().settings,
    initialStoreSettings,
  );

  globalThis.__editorSettingsApiMode = "failure";
  const storeFailure = await useCodeEditorStore
    .getState()
    .updateSetting(settings);
  assert.deepEqual(storeFailure, { type: "failure", statusCode: 500 });
  assert.deepEqual(
    useCodeEditorStore.getState().settings,
    initialStoreSettings,
  );

  globalThis.__editorSettingsApiMode = "throw";
  const storeRequestFailure = await useCodeEditorStore
    .getState()
    .updateSetting(settings);
  assert.deepEqual(storeRequestFailure, { type: "request-failed" });
  assert.deepEqual(
    useCodeEditorStore.getState().settings,
    initialStoreSettings,
  );

  const cancelEvents = [];
  await cancelEditorSettings(createPorts(cancelEvents, async () => success));
  assert.deepEqual(cancelEvents, ["close"]);

  console.log("ALGOGO-142 editor settings tests passed");
} finally {
  delete globalThis.__editorSettingsApiCalls;
  delete globalThis.__editorSettingsApiMode;
  await server.close();
}
