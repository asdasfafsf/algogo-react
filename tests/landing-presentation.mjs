import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const landing = await readFile(`${projectRoot}src/page/Landing.tsx`, "utf8");
const footer = await readFile(
  `${projectRoot}src/layout/landing/LandingFooter.tsx`,
  "utf8",
);

assert.match(landing, /to="\/problem"/);
assert.match(landing, /to="\/problem\/today"/);
assert.match(landing, /문제 둘러보기/);
assert.match(landing, /오늘의 문제 보기/);
assert.match(landing, /오늘은 어떤 문제를/);
assert.match(landing, /무엇을 풀지 고민되나요/);
assert.doesNotMatch(
  landing,
  /HeroCodePreview|editor preview|blur-3xl|radial-gradient/,
);
assert.doesNotMatch(landing, /개발 예정|기능|지원|처리/);
assert.doesNotMatch(footer, /대회|랭킹|곧 열려요/);
assert.doesNotMatch(footer, /PreparedFooterLink|FontAwesomeIcon|CONNECT/);
console.log("ALGOGO-114 landing presentation tests passed");
