import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const readProjectFile = (path) => readFile(join(projectRoot, path), "utf8");

const navigationSource = await readProjectFile(
  "src/components/today-problem/rosterNavigation.ts",
);
const compiledNavigation = ts.transpileModule(navigationSource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const navigationModule = { exports: {} };
new Function("module", "exports", compiledNavigation)(
  navigationModule,
  navigationModule.exports,
);

const { getRosterNavigationIndex } = navigationModule.exports;

for (const [currentIndex, itemCount, key, expectedIndex] of [
  [0, 3, "ArrowDown", 1],
  [2, 3, "ArrowDown", 0],
  [0, 3, "ArrowUp", 2],
  [2, 3, "ArrowUp", 1],
  [1, 3, "Home", 0],
  [1, 3, "End", 2],
  [0, 1, "ArrowDown", 0],
  [0, 1, "ArrowUp", 0],
  [4, 3, "ArrowUp", 0],
  [0, 0, "End", null],
]) {
  assert.equal(
    getRosterNavigationIndex(currentIndex, itemCount, key),
    expectedIndex,
    `${key} must move from ${currentIndex} within ${itemCount} items`,
  );
}

const rosterSource = await readProjectFile(
  "src/components/today-problem/TodayProblemCard.tsx",
);
const todayProblemPageSource = await readProjectFile(
  "src/page/TodayProblem.tsx",
);

assert.doesNotMatch(
  rosterSource,
  /role="listbox"|role="option"/,
  "the roster must not use listbox semantics when it exposes a separate link",
);
assert.match(
  rosterSource,
  /<ul className="list-none rounded-lg border border-border\/50 p-1\.5">/,
  "the roster must use a semantic list",
);
assert.match(
  rosterSource,
  /aria-current=\{selected \? "true" : undefined\}/,
  "the selected roster item must be announced as current",
);
assert.match(
  rosterSource,
  /optionRefs\.current\[currentIndex\]\?\.focus\(\)/,
  "keyboard navigation must move DOM focus to the selected item",
);
assert.match(
  rosterSource,
  /event\.key === "ArrowDown"[\s\S]*event\.key === "End"/,
  "the roster must handle ArrowUp, ArrowDown, Home, and End",
);
assert.match(
  rosterSource,
  /<\/button>[\s\S]*<a[\s\S]*target="_blank"/,
  "the new-window link must be outside the selection button",
);
assert.match(
  todayProblemPageSource,
  /<\/TabsContent>\s*\)\)}\s*<div className="mt-5">[\s\S]*<TodayProblemRoster/,
  "the roster must stay mounted while the current carousel problem changes",
);

console.log("Today problem roster navigation tests passed");
