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

const problemSection = await fs.readFile(
  new URL("../src/layout/problem/ProblemSection.tsx", import.meta.url),
  "utf8",
);
const fixture = await fs.readFile(
  new URL("./fixtures/problem-auth-gate.tsx", import.meta.url),
  "utf8",
);

try {
  const { createAuthDestination, createAuthRedirectPath } =
    await server.ssrLoadModule("/src/domain/account/authDestination.ts");

  const destination = createAuthDestination(
    "/problem/uuid-123",
    "?tab=code",
    "#editor",
  );

  assert.equal(destination, "/problem/uuid-123?tab=code#editor");
  assert.equal(
    createAuthRedirectPath("/login", destination),
    "/login?destination=%2Fproblem%2Fuuid-123%3Ftab%3Dcode%23editor",
  );
  assert.equal(
    createAuthRedirectPath("/signup", "/problem/uuid-123"),
    "/signup?destination=%2Fproblem%2Fuuid-123",
  );

  assert.match(problemSection, /absolute inset-0[^\n]+backdrop-blur-sm/);
  assert.match(problemSection, /<div inert=\{!me\}/);
  assert.match(problemSection, /로그인하고 문제를 풀어보세요/);
  assert.match(
    problemSection,
    /로그인하면 풀이를 작성하고 바로 실행할 수 있어요/,
  );
  assert.doesNotMatch(problemSection, /LockKeyhole/);
  assert.match(fixture, /<ProblemSection/);
  assert.match(fixture, /api\/v1\/code/);

  console.log("ALGOGO-117 problem auth gate tests passed");
} finally {
  await server.close();
}
