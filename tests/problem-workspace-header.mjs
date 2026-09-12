import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [page, header, navbar, problemContent, problemSection, fixture] =
  await Promise.all([
    read("src/page/Problem.tsx"),
    read("src/layout/problem/ProblemHeader.tsx"),
    read("src/components/problem/ProblemNavbar.tsx"),
    read("src/layout/problem/Problem.tsx"),
    read("src/layout/problem/ProblemSection.tsx"),
    read("tests/fixtures/editor-primitives.tsx"),
  ]);

assert.match(
  page,
  /<ProblemHeader problem=\{isLoading \? undefined : problem\}/,
);
assert.doesNotMatch(page, /import Header from "@layout\/Header"/);

assert.match(header, /height: `\$\{PROBLEM_HEADER_HEIGHT\}px`/);
assert.match(header, /<Link to="\/problem" aria-label="문제 목록으로 이동">/);
assert.match(header, /formatProblemNumber\(problem\?\.sourceId\)/);
assert.match(header, /className="min-w-0 truncate text-sm font-semibold/);
assert.match(header, /<ProblemNavbar problem=\{problem\} \/>/);
assert.doesNotMatch(header, /\bdark\b|bg-\[#/);

for (const control of [
  "ThemeToggle",
  'aria-label="문제 새로고침"',
  'aria-label="컴파일러 정보"',
  'aria-label="화면 설정"',
]) {
  assert.ok(
    navbar.includes(control),
    `workspace header must provide ${control}`,
  );
}
assert.match(navbar, /disabled=\{!problem\}/);
assert.match(
  navbar,
  /<div className="\[&_button\]:size-8 \[&_button\]:rounded-md">\s*<ThemeToggle \/>\s*<\/div>/,
);
assert.doesNotMatch(
  navbar,
  /<TooltipTrigger asChild>\s*<div className="\[&_button\]:size-8/,
  "the theme dropdown must not open alongside a wrapping tooltip",
);
assert.match(navbar, /modal\.push\("CompilerInfo", CompilerInfoModal/);
assert.match(navbar, /"CODE_EDITOR_SETTINGS",\s*CodeEditorSettingsModal/);

assert.doesNotMatch(problemContent, /ProblemBreadcrumbs|useProblemUpdate/);
assert.doesNotMatch(problemContent, /문제 데이터 새로고침/);
await assert.rejects(
  access(new URL("src/components/problem/ProblemBreadcrumbs.tsx", root)),
  "the unused problem breadcrumb component must remain removed",
);

assert.match(problemSection, /absolute inset-0[^\n]+backdrop-blur-sm/);
assert.match(problemSection, /width: `\$\{problemWidth\}px`/);
assert.match(problemSection, /width: `calc\(100vw - \$\{problemWidth\}px\)`/);
assert.match(problemSection, /width: "300vw"/);

assert.match(fixture, /<ProblemHeader problem=\{headerProblem\} \/>/);
assert.match(fixture, /아주 긴 문제 제목에서도 현재 문제를 놓치지 않는/);
assert.match(
  fixture,
  /<MemoryRouter initialEntries=\{\["\/problem\/fixture-workspace"\]\}>/,
);

console.log("ALGOGO-150 problem workspace header regression tests passed");
