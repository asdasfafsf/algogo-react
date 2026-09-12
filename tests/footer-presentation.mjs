import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const footer = await readFile(
  `${projectRoot}src/layout/landing/LandingFooter.tsx`,
  "utf8",
);
const defaultLayout = await readFile(
  `${projectRoot}src/layout/DefaultLayout.tsx`,
  "utf8",
);
const landing = await readFile(`${projectRoot}src/page/Landing.tsx`, "utf8");

assert.match(footer, /<Logo size="sm" \/>/);
assert.match(footer, /알고리즘 문제를 한곳에서 찾고 풀어보세요/);
assert.match(
  footer,
  /© \{new Date\(\)\.getFullYear\(\)\} Algogo\. All rights reserved\./,
);
assert.match(footer, /\{ label: "전체 문제", href: "\/problem" \}/);
assert.match(footer, /\{ label: "오늘의 문제", href: "\/problem\/today" \}/);
assert.match(footer, /\{ label: "서비스 소개", href: "\/landing" \}/);
assert.match(footer, /aria-label=\{section\.title\}/);
assert.match(footer, /title: "문제"/);
assert.match(footer, /title: "서비스"/);
assert.match(
  footer,
  /grid-cols-2[\s\S]*md:grid-cols-4/,
  "footer should use a familiar multi-column information hierarchy",
);
assert.match(
  footer,
  /border-t border-border py-3/,
  "copyright should remain in a distinct closing row",
);
assert.match(footer, /underline decoration-transparent underline-offset-4/);
assert.match(footer, /hover:decoration-current/);
assert.doesNotMatch(footer, /hover:-translate|hover:bg-muted/);
assert.match(footer, /focus-visible:ring-2/);
assert.match(footer, /active:text-primary/);
assert.match(footer, /<small[^>]*>[\s\S]*©/);
assert.doesNotMatch(
  footer,
  /대회|랭킹|커뮤니티|디스코드|Github|Twitter|Linkedin|href="#"/,
);

assert.match(footer, /aria-label="알고고 홈"/);

assert.match(defaultLayout, /<LandingFooter \/>/);
assert.match(landing, /<LandingFooter \/>/);

console.log("ALGOGO-156 footer presentation tests passed");
