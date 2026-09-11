import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const upcomingContent = await readFile(
  `${projectRoot}src/components/Carousel/UpcomingSystemUpdateContent.tsx`,
  "utf8",
);
const mainCarousel = await readFile(
  `${projectRoot}src/components/Carousel/MainCarousel.tsx`,
  "utf8",
);
const quickNav = await readFile(
  `${projectRoot}src/components/home/QuickNavStrip.tsx`,
  "utf8",
);

assert.match(upcomingContent, /백준 풀이 기록, 준비 중이에요/);
assert.match(
  upcomingContent,
  /푼 문제와 풀이 현황을 한곳에서 확인할 수 있도록 준비하고 있어요/,
);
assert.doesNotMatch(upcomingContent, /계정만 연결하면|바로 확인할 수 있어요/);
assert.match(upcomingContent, /max-w-xl break-keep/);
assert.match(upcomingContent, /text-pretty/);

assert.match(mainCarousel, /tabIndex=\{-1\}/);
assert.match(mainCarousel, /cursor-default/);
assert.match(mainCarousel, /aria-label="준비 중인 백준 풀이 기록 안내"/);

assert.match(quickNav, /aria-label=\{`\$\{label\}: 준비 중`\}/);
assert.match(quickNav, /min-w-0 flex-1 whitespace-nowrap/);
assert.match(quickNav, /shrink-0 whitespace-nowrap text-xs/);
assert.match(quickNav, /cursor-default/);
assert.doesNotMatch(quickNav, /곧 이용할 수 있어요|곧 열려요/);

console.log("ALGOGO-123 home upcoming presentation tests passed");
