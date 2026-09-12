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
  const {
    createEditorSettingsRequest,
    isCodeEditorThemePreference,
    resolveEditorTheme,
    selectEditorThemePreference,
  } = await server.ssrLoadModule("/src/domain/editor/theme.ts");

  assert.equal(isCodeEditorThemePreference("site"), true);
  assert.equal(isCodeEditorThemePreference("system"), false);
  assert.equal(selectEditorThemePreference(null), "site");
  assert.equal(selectEditorThemePreference("site", "vs-dark"), "site");
  assert.equal(selectEditorThemePreference("invalid", "vs-dark"), "vs-dark");

  assert.equal(resolveEditorTheme("site", false), "light");
  assert.equal(resolveEditorTheme("site", true), "vs-dark");
  assert.equal(resolveEditorTheme("light", true), "light");
  assert.equal(resolveEditorTheme("vs-dark", false), "vs-dark");

  const settings = {
    theme: "vs-dark",
    fontSize: 16,
    tabSize: 2,
    lineNumber: "relative",
    defaultLanguage: "Python",
  };
  assert.deepEqual(createEditorSettingsRequest(settings, "site"), {
    fontSize: 16,
    tabSize: 2,
    lineNumber: "relative",
    defaultLanguage: "Python",
  });
  assert.deepEqual(createEditorSettingsRequest(settings, "light"), {
    ...settings,
    theme: "light",
  });
  assert.equal(
    Object.values(createEditorSettingsRequest(settings, "site")).includes(
      "site",
    ),
    false,
  );

  console.log("ALGOGO-158 editor theme tests passed");
} finally {
  await server.close();
}
