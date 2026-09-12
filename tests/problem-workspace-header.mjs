import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [page, header, breadcrumbs, problemContent, problemSection, fixture] =
  await Promise.all([
    read("src/page/Problem.tsx"),
    read("src/layout/problem/ProblemHeader.tsx"),
    read("src/components/problem/ProblemBreadcrumbs.tsx"),
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
assert.match(header, /<ThemeToggle \/>/);
assert.doesNotMatch(
  header,
  /ProblemNavbar|컴파일러 정보|화면 설정|문제 새로고침/,
);
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

assert.doesNotMatch(problemContent, /ProblemBreadcrumbs/);
assert.match(problemContent, /useProblemUpdate\(problem\)/);
assert.match(problemContent, /aria-label="문제 새로고침"/);
assert.match(
  problemContent,
  /<TooltipContent side="bottom" align="end">\s*문제 새로고침/,
);
assert.match(
  problemContent,
  /cursor-pointer[\s\S]*disabled:cursor-not-allowed/,
);
await access(new URL("src/components/problem/ProblemBreadcrumbs.tsx", root));
await assert.rejects(
  access(new URL("src/components/problem/ProblemNavbar.tsx", root)),
  { code: "ENOENT" },
  "workspace header tools must not remain as a duplicate component",
);

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

console.log("ALGOGO-153 problem workspace header regression tests passed");
