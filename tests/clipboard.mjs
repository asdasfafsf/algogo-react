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
  const { writeTextToClipboard } = await server.ssrLoadModule(
    "/src/lib/clipboard.ts",
  );
  const content = "  first line  \nsecond line\n\nlast space ";
  const writes = [];

  await writeTextToClipboard(content, async (value) => {
    writes.push(value);
  });
  assert.deepEqual(writes, [content]);

  await assert.rejects(
    () => writeTextToClipboard(content, null),
    /Clipboard API를 사용할 수 없습니다/,
  );

  let attempts = 0;
  const failOnceWriter = async (value) => {
    attempts += 1;
    if (attempts === 1) {
      throw new Error("clipboard unavailable");
    }
    writes.push(value);
  };

  await assert.rejects(
    () => writeTextToClipboard(content, failOnceWriter),
    /clipboard unavailable/,
  );
  await writeTextToClipboard(content, failOnceWriter);
  assert.deepEqual(writes, [content, content]);

  console.log("ALGOGO-103 clipboard tests passed");
} finally {
  await server.close();
}
