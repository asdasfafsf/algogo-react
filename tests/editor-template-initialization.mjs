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
  const templates = await server.ssrLoadModule(
    "/src/domain/editor/templateInitialization.ts",
  );
  const response = {
    statusCode: 200,
    data: {
      defaultList: [
        {
          uuid: "cpp-default",
          name: "C++ 기본 템플릿",
          description: "기본 코드",
          language: "C++",
          content: "#include <bits/stdc++.h>",
        },
      ],
      summaryList: [
        { uuid: "python-user", name: "Python", language: "Python" },
      ],
    },
  };

  assert.equal(
    templates.canInitializeEditor({
      hasStoredUser: false,
      accessToken: null,
      refreshToken: null,
    }),
    false,
  );
  assert.equal(
    templates.canInitializeEditor({
      hasStoredUser: false,
      accessToken: "access-token",
      refreshToken: null,
    }),
    true,
  );

  assert.deepEqual(templates.decideTemplateInitialization(response, "C++"), {
    type: "loaded",
    templates: response.data,
    defaultTemplate: "#include <bits/stdc++.h>",
  });
  assert.deepEqual(
    templates.decideTemplateInitialization(
      { statusCode: 401, data: undefined },
      "C++",
    ),
    { type: "unauthenticated" },
  );
  assert.deepEqual(
    templates.decideTemplateInitialization(
      { statusCode: 503, data: undefined },
      "C++",
    ),
    { type: "invalid-response", statusCode: 503 },
  );
  assert.deepEqual(
    templates.decideTemplateInitialization(
      { statusCode: 200, data: undefined },
      "C++",
    ),
    { type: "invalid-data", statusCode: 200 },
  );
  assert.deepEqual(templates.templateRequestFailed(), {
    type: "request-failed",
  });

  console.log("ALGOGO-115 editor template initialization tests passed");
} finally {
  await server.close();
}
