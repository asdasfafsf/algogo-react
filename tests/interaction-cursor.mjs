import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const readProjectFile = (path) => readFile(join(projectRoot, path), "utf8");

const indexCss = await readProjectFile("src/index.css");
const selectSource = await readProjectFile("src/components/ui/select.tsx");
const dropdownMenuSource = await readProjectFile(
  "src/components/ui/dropdown-menu.tsx",
);
const checkboxSource = await readProjectFile("src/components/ui/checkbox.tsx");
const problemListSource = await readProjectFile(
  "src/components/problem-list/ProblemListTable.tsx",
);

for (const selector of [
  "a[href]",
  'button:not(:disabled):not([aria-disabled="true"])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="menuitem"]:not([aria-disabled="true"])',
  '[role="option"]:not([aria-disabled="true"])',
  '[role="tab"]:not([aria-disabled="true"])',
  '[contenteditable]:not([contenteditable="false"])',
  '[aria-disabled="true"]',
  "[data-disabled]",
]) {
  assert.ok(
    indexCss.includes(selector),
    `missing cursor selector: ${selector}`,
  );
}

assert.match(
  indexCss,
  /input:is\([\s\S]*\[type="text"\][\s\S]*\):not\(:disabled\)[\s\S]*cursor: text/,
  "text input cursor rule must remain explicit",
);
assert.match(
  indexCss,
  /textarea,[\s\S]*\[contenteditable\][\s\S]*cursor: text/,
  "textarea and contenteditable cursor rules must remain explicit",
);
assert.match(
  indexCss,
  /button:disabled,[\s\S]*\[data-disabled\][\s\S]*cursor: not-allowed/,
  "disabled controls must not inherit the pointer cursor",
);

for (const [name, source] of [
  ["SelectItem", selectSource],
  ["DropdownMenuItem", dropdownMenuSource],
]) {
  assert.match(
    source,
    /cursor-pointer/,
    `${name} must retain a pointer cursor`,
  );
  assert.match(
    source,
    /data-\[disabled\]:cursor-not-allowed/,
    `${name} must expose a disabled cursor`,
  );
}

assert.match(
  checkboxSource,
  /data-\[disabled\]:cursor-not-allowed/,
  "Checkbox must expose a disabled cursor",
);

assert.match(
  problemListSource,
  /className="cursor-pointer[^"]*hover:bg-muted\/50/,
  "clickable problem rows must retain their pointer affordance",
);

console.log("ALGOGO-116 interaction cursor regression tests passed");
