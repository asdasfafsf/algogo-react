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

  console.log("ALGOGO-108 problem auth gate tests passed");
} finally {
  await server.close();
}
