import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { normalizeProblemPageError } = await server.ssrLoadModule(
    "/src/domain/problems/problemPageError.ts",
  );
  const hookSource = await fs.readFile(
    new URL("../src/hook/problem/useProblemPage.ts", import.meta.url),
    "utf8",
  );
  const pageSource = await fs.readFile(
    new URL("../src/page/Problem.tsx", import.meta.url),
    "utf8",
  );
  const fixtureSource = await fs.readFile(
    new URL("./fixtures/problem-error.tsx", import.meta.url),
    "utf8",
  );

  assert.deepEqual(normalizeProblemPageError(404), {
    kind: "not-found",
    title: "문제를 찾을 수 없어요",
    description: "삭제되었거나 주소가 변경되었을 수 있어요.",
  });
  assert.deepEqual(normalizeProblemPageError(503), {
    kind: "unavailable",
    title: "문제를 불러오지 못했어요",
    description: "잠시 후 다시 시도해 주세요.",
  });
  assert.equal(
    normalizeProblemPageError(500).description,
    "잠시 후 다시 시도해 주세요.",
  );

  assert.doesNotMatch(hookSource, /response\.errorMessage/);
  assert.match(hookSource, /setError\(null\)/);
  assert.match(hookSource, /setIsLoading\(true\)/);
  assert.match(pageSource, /ProblemPageErrorState/);
  assert.doesNotMatch(pageSource, /CircleAlert|rounded-2xl|shadow-sm/);
  assert.match(fixtureSource, /upstream timeout/);
  assert.match(fixtureSource, /setResponse\(successResponse\)/);

  console.log("ALGOGO-120 problem page error tests passed");
} finally {
  await server.close();
}
