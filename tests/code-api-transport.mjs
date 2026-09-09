import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const calls = [];
globalThis.__codeApiCalls = calls;

const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [
    {
      name: "code-api-client-test-double",
      enforce: "pre",
      resolveId(source, importer) {
        if (
          source === "./apiClient" &&
          importer?.endsWith("/src/api/code.ts")
        ) {
          return "\0code-api-client-test-double";
        }
      },
      load(id) {
        if (id !== "\0code-api-client-test-double") return;
        return `
          export default {
            patch: async (...args) => {
              globalThis.__codeApiCalls.push(args);
              return { data: { statusCode: 200, data: null } };
            },
          };
        `;
      },
    },
  ],
});

try {
  const { updateTemplate } = await server.ssrLoadModule("/src/api/code.ts");
  const request = {
    uuid: "template-uuid",
    name: "renamed",
    description: "description",
    language: "Java",
    content: "class Main {}",
    isDefault: false,
  };

  const response = await updateTemplate(request);

  assert.deepEqual(calls, [["/api/v1/code/template", request]]);
  assert.deepEqual(response, { statusCode: 200, data: null });
  console.log("ALGOGO-84 code API transport test passed");
} finally {
  delete globalThis.__codeApiCalls;
  await server.close();
}
