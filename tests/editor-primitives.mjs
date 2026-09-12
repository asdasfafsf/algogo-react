import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const readComponent = (name) =>
  readFile(
    new URL(`../src/components/problem/${name}.tsx`, import.meta.url),
    "utf8",
  );

const sources = Object.fromEntries(
  await Promise.all(
    [
      "CodeEditorSettingsModal",
      "CodeEditorTabSizer",
      "CodeControlPanel",
      "CodeEditor",
      "CodeTemplateAddModal",
      "CodeTestCaseTable",
      "CompilerInfoModal",
      "TestCaseModal",
    ].map(async (name) => [name, await readComponent(name)]),
  ),
);

const expectedPrimitives = {
  CodeEditorSettingsModal: ["ui/button", "ui/checkbox"],
  CodeEditorTabSizer: ["ui/input"],
  CodeControlPanel: ["ui/button", "ui/tooltip"],
  CodeEditor: [],
  CodeTemplateAddModal: ["ui/button", "ui/checkbox", "ui/input"],
  CodeTestCaseTable: ["ui/button"],
  CompilerInfoModal: ["ui/button"],
  TestCaseModal: ["ui/button", "ui/textarea"],
};

for (const [component, primitives] of Object.entries(expectedPrimitives)) {
  for (const primitive of primitives) {
    assert.match(
      sources[component],
      new RegExp(`components/${primitive}`),
      `${component} must render the shared shadcn ${primitive} primitive`,
    );
  }
  assert.doesNotMatch(
    sources[component],
    /@components\/(Button|Checkbox|Input|Chip|common)|from "\.\.\/(Checkbox|common)"/,
    `${component} must not import the migrated legacy control wrappers`,
  );
}

assert.match(
  sources.CodeEditorTabSizer,
  /<label htmlFor="editor-tab-size"/,
  "tab size input must retain an associated label",
);
assert.match(
  sources.CodeEditorSettingsModal,
  /htmlFor="save-editor-settings"/,
  "settings checkbox must retain a clickable label",
);
assert.match(
  sources.CodeEditorSettingsModal,
  /<fieldset[\s\S]*disabled=\{isSaving\}[\s\S]*aria-busy=\{isSaving\}/,
  "all settings inputs must be disabled while their snapshot is saving",
);
assert.match(
  sources.CodeEditorSettingsModal,
  /role="alert"/,
  "settings save failures must remain visible for retry",
);
assert.match(
  sources.CodeEditorSettingsModal,
  /cursor-not-allowed[\s\S]*다시 저장/,
  "settings pending and retry affordances must match their state",
);
assert.match(
  sources.CodeTemplateAddModal,
  /htmlFor="isDefault"/,
  "template checkbox must retain a clickable label",
);
assert.match(
  sources.TestCaseModal,
  /min-h-28[\s\S]*resize-none/,
  "test case textareas must retain the current fixed editing height",
);
assert.match(
  sources.TestCaseModal,
  /className="[^"]*\bgrid\b[^"]*\bsm:grid-cols-2\b/,
  "test case editors must use two columns from the desktop breakpoint",
);
assert.match(
  sources.TestCaseModal,
  /handleClickAddTestCase/,
  "test case modal must keep the add-case action",
);
assert.match(
  sources.TestCaseModal,
  /removeTestCase\(index\)/,
  "test case modal must keep the per-case delete action",
);
assert.match(
  sources.CodeTestCaseTable,
  /const isPending = state === "CONNECTING" \|\| state === "PENDING"[\s\S]*disabled=\{isPending\}/,
  "test case controls must remain unavailable while execution is connecting or pending",
);
assert.doesNotMatch(
  sources.CodeTestCaseTable,
  /color="blue"|w-28%/,
  "test case controls must use valid shadcn props and Tailwind width utilities",
);
assert.match(
  sources.CodeControlPanel,
  /<LanguageDropdown \/>[\s\S]*<CodeTemplateDropdown \/>[\s\S]*aria-label="코드 초기화"[\s\S]*aria-label="코드 실행"[\s\S]*aria-label="테스트 실행"[\s\S]*aria-label="코드 제출"[\s\S]*aria-label="컴파일러 정보"[\s\S]*aria-label="화면 설정"/,
  "editor toolbar must keep language and template on the left, primary actions in the middle, and utility controls on the right",
);
assert.match(
  sources.CodeControlPanel,
  /aria-hidden="true" className="mx-1 h-5 w-px bg-border"[\s\S]*실행[\s\S]*제출[\s\S]*aria-hidden="true" className="mx-1 h-5 w-px bg-border"/,
  "primary editor actions must be visually separated from reset and utility controls",
);
assert.match(
  sources.CodeControlPanel,
  /@container\/editor-toolbar[\s\S]*role="toolbar"[\s\S]*grid-rows-2[\s\S]*@\[30rem\]\/editor-toolbar:grid-rows-1/,
  "editor toolbar must use its own width to switch between compact two-row and desktop one-row layouts",
);
assert.match(
  sources.CodeControlPanel,
  /role="toolbar"[\s\S]*overflow-hidden/,
  "editor toolbar must clip incidental paint without becoming a scroll container",
);
assert.doesNotMatch(
  sources.CodeControlPanel,
  /overflow-x-auto|min-w-max/,
  "editor toolbar must not introduce horizontal scrolling or a minimum-content width",
);
assert.doesNotMatch(
  sources.CodeEditor,
  /테스트 추가|border-t border-border/,
  "editor actions must live in the toolbar instead of the duplicated bottom action bar",
);
for (const [prop, handler] of [
  ["onReset", "handleClickReset"],
  ["onExecute", "handleExecute"],
  ["onTest", "handleTest"],
  ["onSubmit", "handleSubmit"],
]) {
  assert.match(
    sources.CodeEditor,
    new RegExp(`${prop}=\\{${handler}\\}`),
    `${prop} must preserve its existing editor handler`,
  );
}
assert.match(
  sources.CodeControlPanel,
  /TooltipContent side="bottom">컴파일러 정보<\/TooltipContent>/,
  "compiler information needs a hover and keyboard hint in the editor toolbar",
);
assert.match(
  sources.CodeControlPanel,
  /TooltipContent side="bottom">화면 설정<\/TooltipContent>/,
  "editor settings needs a hover and keyboard hint in the editor toolbar",
);
for (const [component, closeHandler] of [
  ["CodeEditorSettingsModal", "close"],
  ["CodeTemplateAddModal", "handleClose"],
  ["CompilerInfoModal", "handleClose"],
  ["TestCaseModal", "handleClickClose"],
]) {
  assert.match(
    sources[component],
    new RegExp(
      `onOpenChange=\\{\\(open\\) => \\{[\\s\\S]*${closeHandler}\\(\\)`,
    ),
    `${component} must resolve through its existing modal close handler`,
  );
}

const fixture = await readFile(
  new URL("./fixtures/editor-primitives.tsx", import.meta.url),
  "utf8",
);
assert.match(
  fixture,
  /data-testid="responsive-code-toolbar"[\s\S]*min-w-0 overflow-hidden/,
  "editor fixture must expose a bounded toolbar for responsive browser checks",
);
for (const component of [
  "CodeEditorSettingsModal",
  "CodeTemplateAddModal",
  "CodeControlPanel",
  "MonacoEditor",
  "CodeTestCaseTable",
  "CompilerInfoModal",
  "TestCaseModal",
]) {
  assert.match(
    fixture,
    new RegExp(component),
    `editor primitives fixture must render ${component}`,
  );
}

console.log("ALGOGO-124 editor primitive regression tests passed");
