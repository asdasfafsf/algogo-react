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
const controlsFixtureSource = await readProjectFile(
  "tests/fixtures/controls.tsx",
);
const buttonSource = await readProjectFile("src/components/ui/button.tsx");
const tabsSource = await readProjectFile("src/components/ui/tabs.tsx");
const toggleSource = await readProjectFile("src/components/ui/toggle.tsx");
const fixtureSource = await readProjectFile(
  "tests/fixtures/cursor-controls.tsx",
);
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

for (const className of [
  "disabled:hover:bg-primary",
  "disabled:hover:bg-destructive",
  "disabled:hover:bg-background",
  "disabled:hover:text-foreground",
  "disabled:hover:bg-secondary",
  "disabled:hover:bg-transparent",
  "disabled:hover:no-underline",
]) {
  assert.ok(
    buttonSource.includes(className),
    `disabled Button hover state must preserve its base appearance: ${className}`,
  );
}

for (const className of [
  "disabled:data-[state=off]:hover:bg-transparent",
  "disabled:data-[state=off]:hover:text-foreground",
  "disabled:data-[state=on]:hover:bg-accent",
  "disabled:data-[state=on]:hover:text-accent-foreground",
]) {
  assert.ok(
    toggleSource.includes(className),
    `disabled Toggle hover state must preserve its base appearance: ${className}`,
  );
}

assert.match(
  checkboxSource,
  /data-\[disabled\]:cursor-not-allowed/,
  "Checkbox must expose a disabled cursor",
);

for (const [id, expectedCursor] of [
  ["checkboxLabel", "pointer"],
  ["disabledCheckboxLabel", "not-allowed"],
]) {
  assert.match(
    fixtureSource,
    new RegExp(`${id}: "${expectedCursor}"`),
    `${id} must be included in the computed cursor report`,
  );
}

assert.match(
  controlsFixtureSource,
  /<label[\s\S]*className="inline-flex cursor-pointer items-center gap-2"[\s\S]*htmlFor="fixture-checkbox"[\s\S]*aria-label="레이블로 토글"/,
  "the active checkbox label must align its pointer cursor and click target",
);
assert.match(
  controlsFixtureSource,
  /<label[\s\S]*className="inline-flex cursor-not-allowed items-center gap-2 opacity-50"[\s\S]*htmlFor="fixture-disabled-checkbox"[\s\S]*aria-label="선택된 비활성 체크박스"/,
  "the disabled checkbox label must align its cursor, opacity, and click target",
);

for (const [name, source] of [
  ["Button", buttonSource],
  ["TabsTrigger", tabsSource],
  ["Toggle", toggleSource],
]) {
  assert.doesNotMatch(
    source,
    /disabled:pointer-events-none/,
    `${name} must remain the pointer target while disabled so the global not-allowed cursor is visible`,
  );
  assert.match(
    source,
    /disabled:opacity-50/,
    `${name} must retain its disabled visual treatment`,
  );
}

for (const id of [
  "activeTab",
  "disabledTab",
  "activeToggle",
  "disabledToggle",
  "disabledSelectTrigger",
  "disabledButtonDestructive",
  "disabledButtonOutline",
  "disabledButtonSecondary",
  "disabledButtonGhost",
  "disabledButtonLink",
  "disabledTogglePressed",
  "disabledToggleOutline",
  "dialogCloseLink",
  "disabledDialogCloseLink",
  "sheetCloseLink",
  "disabledSheetCloseLink",
]) {
  assert.ok(
    fixtureSource.includes(`id=\"${id}\"`),
    `cursor fixture must cover ${id}`,
  );
}

assert.match(
  problemListSource,
  /className="cursor-pointer[^"]*hover:bg-muted\/50/,
  "clickable problem rows must retain their pointer affordance",
);

console.log("Interaction cursor regression tests passed");
