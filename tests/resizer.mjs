import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const {
    clampEditorHeight,
    clampProblemWidth,
    isPrimaryResizePointer,
    isResizeControlTarget,
    MIN_EDITOR_HEIGHT,
    MIN_PROBLEM_WIDTH,
    restoreResizeBodyStyle,
    snapshotResizeBodyStyle,
  } = await server.ssrLoadModule("/src/lib/resizer.ts");

  assert.equal(clampProblemWidth(20, 1440), MIN_PROBLEM_WIDTH);
  assert.equal(clampProblemWidth(1600, 1440), 1340);
  assert.equal(clampProblemWidth(500, 1440), 500);
  assert.equal(clampProblemWidth(500, 150), MIN_PROBLEM_WIDTH);

  assert.equal(clampEditorHeight(20, 900), MIN_EDITOR_HEIGHT);
  assert.equal(clampEditorHeight(900, 900), 700);
  assert.equal(clampEditorHeight(500, 900), 500);
  assert.equal(clampEditorHeight(500, 120), MIN_EDITOR_HEIGHT);

  assert.equal(isPrimaryResizePointer({ button: 0, isPrimary: true }), true);
  assert.equal(isPrimaryResizePointer({ button: 2, isPrimary: true }), false);
  assert.equal(isPrimaryResizePointer({ button: 0, isPrimary: false }), false);

  assert.equal(
    isResizeControlTarget({
      closest: (selector) => (selector === "button" ? {} : null),
    }),
    true,
  );
  assert.equal(isResizeControlTarget({ closest: () => null }), false);
  assert.equal(isResizeControlTarget(null), false);

  const bodyStyle = {
    userSelect: "text",
    pointerEvents: "auto",
    cursor: "default",
  };
  const snapshot = snapshotResizeBodyStyle(bodyStyle);
  Object.assign(bodyStyle, {
    userSelect: "none",
    pointerEvents: "none",
    cursor: "row-resize",
  });
  restoreResizeBodyStyle(bodyStyle, snapshot);
  assert.deepEqual(bodyStyle, snapshot);

  const sidebarSource = await readFile(
    new URL("../src/layout/problem/ProblemSidebar.tsx", import.meta.url),
    "utf8",
  );
  const separatorStart = sidebarSource.indexOf("<Separator");
  const separatorEnd = sidebarSource.indexOf("/>", separatorStart);
  const buttonStart = sidebarSource.indexOf("<ShadcnButton");

  assert.match(
    sidebarSource,
    /<div className="group relative h-full w-0 shrink-0">/,
  );
  assert.notEqual(separatorStart, -1);
  assert.notEqual(separatorEnd, -1);
  assert.notEqual(buttonStart, -1);
  assert.ok(separatorEnd < buttonStart);
  assert.doesNotMatch(
    sidebarSource.slice(separatorStart, separatorEnd),
    /<ShadcnButton/,
  );
  assert.match(sidebarSource, /!isMobile &&\s+open && \(/);
  assert.match(sidebarSource, /hover:before:bg-primary/);
  assert.match(sidebarSource, /focus-visible:before:bg-primary/);
  assert.match(sidebarSource, /cursor-col-resize/);
  assert.match(
    sidebarSource,
    /isResizing \? "before:bg-primary" : "before:bg-border"/,
  );
  assert.match(sidebarSource, /<GripVertical className="size-3"/);
  assert.match(sidebarSource, /top-\[calc\(50%-44px\)\]/);
  assert.match(sidebarSource, /className="absolute top-1\/2 -right-4 z-20/);

  const sidebarHookSource = await readFile(
    new URL("../src/hook/useProblemSidebar.ts", import.meta.url),
    "utf8",
  );
  assert.match(sidebarHookSource, /event\.key === "Home"/);
  assert.match(sidebarHookSource, /event\.key === "End"/);

  const fixtureSource = await readFile(
    new URL("./fixtures/problem-sidebar-resizer.tsx", import.meta.url),
    "utf8",
  );
  assert.match(fixtureSource, /<ProblemSidebar open=\{open\}/);
  assert.match(fixtureSource, /aria-label="코드 패널"/);
  assert.match(fixtureSource, /문제 패널 너비: \{problemWidth\}px/);

  console.log("problem sidebar resizer regression tests passed");
} finally {
  await server.close();
}
