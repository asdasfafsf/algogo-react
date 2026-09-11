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
  const { createPreservedAuthSearch } = await server.ssrLoadModule(
    "/src/domain/account/authDestination.ts",
  );
  const { createOAuthEntryUrl } = await server.ssrLoadModule(
    "/src/domain/account/oauth.ts",
  );

  const destination = "/problem/uuid-123?tab=code#editor";
  const preservedSearch = createPreservedAuthSearch(destination);

  assert.equal(
    preservedSearch,
    "?destination=%2Fproblem%2Fuuid-123%3Ftab%3Dcode%23editor",
  );
  assert.equal(createPreservedAuthSearch(null), "");
  assert.equal(createPreservedAuthSearch(""), "");
  assert.equal(
    `/signup${preservedSearch}`,
    "/signup?destination=%2Fproblem%2Fuuid-123%3Ftab%3Dcode%23editor",
  );
  assert.equal(
    createOAuthEntryUrl({
      environment: "development",
      provider: "google",
      destination: encodeURIComponent(destination),
    }),
    "http://localhost:3001/oauth/v2/google?destination=%2Fproblem%2Fuuid-123%3Ftab%3Dcode%23editor",
  );

  console.log("ALGOGO-110 auth page tests passed");
} finally {
  await server.close();
}
