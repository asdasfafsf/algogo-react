import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { formatProblemCategory, formatProblemLevel, formatProblemNumber } =
    await server.ssrLoadModule("/src/domain/problems/problemPresentation.ts");

  assert.equal(formatProblemLevel(1, "Bronze V"), "브론즈 5");
  assert.equal(formatProblemLevel(5), "브론즈 1");
  assert.equal(formatProblemLevel(6), "실버 5");
  assert.equal(formatProblemLevel(30), "루비 1");
  assert.equal(formatProblemLevel(0, "Unknown"), "알 수 없음");

  assert.equal(formatProblemNumber("1000"), "1000");
  assert.equal(formatProblemNumber(" 2557 "), "2557");
  assert.equal(formatProblemNumber("local-react19-20260910"), "-");
  assert.equal(formatProblemNumber(undefined), "-");

  assert.equal(formatProblemCategory(undefined), "-");
  assert.equal(formatProblemCategory([]), "-");
  assert.equal(formatProblemCategory(["수학"]), "수학");
  assert.equal(formatProblemCategory(["수학", "구현"]), "수학 외 1");

  console.log("ALGOGO-87 problem presentation tests passed");
} finally {
  await server.close();
}
