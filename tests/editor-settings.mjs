import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

const settings = {
  theme: "vs-dark",
  fontSize: 14,
  tabSize: 4,
  lineNumber: "on",
  defaultLanguage: "C++",
};

const createPorts = (events, update = async () => {}) => ({
  setProblemContentSize: async (size) => events.push(`size:${size}`),
  setCodeEditorSettings: async () => events.push("settings"),
  updateCodeEditorSettings: async (input) => {
    events.push(`update:${input.saveToServer}`);
    await update();
  },
  close: async () => events.push("close"),
});

try {
  const [settingsWorkflow, { parseEditorTabSize }] = await Promise.all([
    server.ssrLoadModule("/src/application/editor/settings.ts"),
    server.ssrLoadModule("/src/domain/editor/settingsForm.ts"),
  ]);
  const { cancelEditorSettings, saveEditorSettings } = settingsWorkflow;

  assert.equal(parseEditorTabSize(""), 4);
  assert.equal(parseEditorTabSize("8"), 8);

  const successEvents = [];
  await saveEditorSettings(
    { settings, problemContentSize: 120, saveToServer: true },
    createPorts(successEvents),
  );
  assert.deepEqual(successEvents, [
    "size:120",
    "settings",
    "update:true",
    "close",
  ]);

  const localOnlyEvents = [];
  await saveEditorSettings(
    { settings, problemContentSize: 90, saveToServer: false },
    createPorts(localOnlyEvents),
  );
  assert.deepEqual(localOnlyEvents, [
    "size:90",
    "settings",
    "update:false",
    "close",
  ]);

  const failureEvents = [];
  await assert.rejects(
    saveEditorSettings(
      { settings, problemContentSize: 110, saveToServer: true },
      createPorts(failureEvents, async () => {
        throw new Error("save failed");
      }),
    ),
    /save failed/,
  );
  assert.deepEqual(failureEvents, ["size:110", "settings", "update:true"]);

  const cancelEvents = [];
  await cancelEditorSettings(createPorts(cancelEvents));
  assert.deepEqual(cancelEvents, ["close"]);

  console.log("ALGOGO-81 editor settings tests passed");
} finally {
  await server.close();
}
