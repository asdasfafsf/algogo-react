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
assert.match(footer, /여러 온라인 저지의 문제를 한 곳에서 찾아 풀어보세요/);
assert.match(footer, /© \{new Date\(\)\.getFullYear\(\)\} Algogo/);
assert.match(footer, /\{ label: "문제", href: "\/" \}/);
assert.match(footer, /\{ label: "오늘의 문제", href: "\/problem\/today" \}/);
assert.match(footer, /<nav aria-label="하단 메뉴">/);
assert.match(footer, /<small[^>]*>[\s\S]*©/);
assert.doesNotMatch(
  footer,
  /대회|랭킹|커뮤니티|디스코드|Github|Twitter|Linkedin|href="#"/,
);

assert.match(footer, /aria-label="알고고 홈"/);

assert.match(defaultLayout, /<LandingFooter \/>/);
assert.match(landing, /<LandingFooter \/>/);

console.log("ALGOGO-144 footer presentation tests passed");
