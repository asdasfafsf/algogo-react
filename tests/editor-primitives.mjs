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
      "CodeTemplateAddModal",
      "CodeTestCaseTable",
      "CompilerInfoModal",
      "ProblemNavbar",
      "TestCaseModal",
    ].map(async (name) => [name, await readComponent(name)]),
  ),
);

const expectedPrimitives = {
  CodeEditorSettingsModal: ["ui/button", "ui/checkbox"],
  CodeEditorTabSizer: ["ui/input"],
  CodeTemplateAddModal: ["ui/button", "ui/checkbox", "ui/input"],
  CodeTestCaseTable: ["ui/button"],
  CompilerInfoModal: ["ui/button"],
  ProblemNavbar: ["ui/button", "ui/tooltip"],
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
  /disabled=\{state === "PENDING"\}/,
  "test case controls must remain unavailable while execution is pending",
);
assert.doesNotMatch(
  sources.CodeTestCaseTable,
  /color="blue"|w-28%/,
  "test case controls must use valid shadcn props and Tailwind width utilities",
);
assert.match(
  sources.ProblemNavbar,
  /TooltipContent side="bottom" align="end"/,
  "settings tooltip must retain its bottom-end placement",
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
for (const component of [
  "CodeEditorSettingsModal",
  "CodeTemplateAddModal",
  "CodeTestCaseTable",
  "CompilerInfoModal",
  "ProblemNavbar",
  "TestCaseModal",
]) {
  assert.match(
    fixture,
    new RegExp(component),
    `editor primitives fixture must render ${component}`,
  );
}

console.log("ALGOGO-124 editor primitive regression tests passed");
