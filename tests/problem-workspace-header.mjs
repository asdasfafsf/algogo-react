import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [
  page,
  header,
  breadcrumbs,
  navbar,
  problemContent,
  problemSection,
  fixture,
] = await Promise.all([
  read("src/page/Problem.tsx"),
  read("src/layout/problem/ProblemHeader.tsx"),
  read("src/components/problem/ProblemBreadcrumbs.tsx"),
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
assert.match(header, /<ProblemBreadcrumbs/);
assert.match(header, /formatProblemNumber\(problem\?\.sourceId\)/);
assert.match(header, /<ProblemNavbar problem=\{problem\} \/>/);
assert.doesNotMatch(header, /\bdark\b|bg-\[#/);

assert.match(breadcrumbs, /aria-label="문제 경로"/);
assert.match(breadcrumbs, /<Link to="\/" aria-label="홈으로 이동">/);
assert.match(breadcrumbs, /<Link\s+to="\/problem"/);
assert.match(breadcrumbs, /aria-current="page"/);
assert.match(
  breadcrumbs,
  /const current = number \? `#\$\{number\} \$\{title\}` : title/,
);
assert.match(
  breadcrumbs,
  /hidden shrink-0 items-center gap-1 min-\[480px\]:flex/,
);
assert.match(breadcrumbs, /block truncate font-semibold/);
assert.doesNotMatch(breadcrumbs, /\bdark\b|bg-\[#/);

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
await access(new URL("src/components/problem/ProblemBreadcrumbs.tsx", root));

assert.match(problemSection, /absolute inset-0[^\n]+backdrop-blur-sm/);
assert.match(problemSection, /width: `\$\{problemWidth\}px`/);
assert.match(problemSection, /width: `calc\(100vw - \$\{problemWidth\}px\)`/);
assert.match(problemSection, /width: "300vw"/);

assert.match(fixture, /<ProblemHeader problem=\{headerProblem\} \/>/);
assert.match(fixture, /아주 긴 문제 제목에서도 현재 경로를 놓치지 않는/);
assert.match(
  fixture,
  /<MemoryRouter initialEntries=\{\["\/problem\/fixture-workspace"\]\}>/,
);

console.log("ALGOGO-152 problem breadcrumb header regression tests passed");
