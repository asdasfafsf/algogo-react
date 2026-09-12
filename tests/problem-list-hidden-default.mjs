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
  const { useProblemTableFilterStore } = await server.ssrLoadModule(
    "/src/zustand/ProblemTableFilterStore.tsx",
  );

  assert.deepEqual(
    useProblemTableFilterStore.getState().problemHidden,
    { 난이도: true, 카테고리: true },
    "a newly opened problem list must hide difficulty and category values",
  );

  useProblemTableFilterStore.getState().setProblemHidden((previous) => ({
    ...previous,
    난이도: false,
    카테고리: false,
  }));
  assert.deepEqual(
    useProblemTableFilterStore.getState().problemHidden,
    { 난이도: false, 카테고리: false },
    "the existing visibility controls must be able to reveal both values",
  );

  const tableSource = await readFile(
    `${projectRoot}src/components/problem-list/ProblemListTable.tsx`,
    "utf8",
  );
  assert.match(
    tableSource,
    /title=\{\s*problemHidden\["카테고리"\]\s*\? undefined\s*:\s*problem\.typeList\?\.join\(", "\)\s*\}/,
    "a masked category must remove its native title and reveal it only when shown",
  );

  console.log("ALGOGO-167 problem list visibility defaults passed");
} finally {
  await server.close();
}
