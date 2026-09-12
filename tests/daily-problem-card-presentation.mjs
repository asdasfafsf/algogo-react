import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const dailyProblemCard = await readFile(
  `${projectRoot}src/components/home/DailyProblemCard.tsx`,
  "utf8",
);

assert.match(
  dailyProblemCard,
  /transition-\[background-color,border-color,box-shadow\][\s\S]*hover:border-primary\/30[\s\S]*hover:bg-muted\/30[\s\S]*hover:shadow-md/,
  "today problem card must provide a single surface hover state",
);
assert.doesNotMatch(
  dailyProblemCard,
  /hover:bg-muted\/45/,
  "the problem body must not create a separate hover stripe",
);
assert.match(
  dailyProblemCard,
  /tabIndex=\{index === activeSlide \? 0 : -1\}/,
  "only the active slide remains in the tab order",
);
assert.match(
  dailyProblemCard,
  /onKeyDown=\{\(event\) => \{[\s\S]*ArrowLeft[\s\S]*ArrowRight/,
  "dot navigation must keep keyboard arrow support",
);
assert.match(
  dailyProblemCard,
  /onMouseEnter=\{\(\) => \{[\s\S]*pauseAutoplay\.current = true/,
  "autoplay must pause while the card is hovered",
);
assert.match(
  dailyProblemCard,
  /onMouseLeave=\{\(event\) => \{[\s\S]*pauseAutoplay\.current = !event\.currentTarget\.contains/,
  "autoplay must resume after focus leaves the card",
);
assert.match(
  dailyProblemCard,
  /focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/,
  "the problem action must retain a visible keyboard focus indicator",
);

console.log("ALGOGO-157 daily problem card presentation tests passed");
