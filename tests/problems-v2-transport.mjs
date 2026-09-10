import assert from "node:assert/strict";
import { parse as parseSimpleQuery } from "node:querystring";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const calls = [];
globalThis.__problemsV2ApiCalls = calls;

const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [
    {
      name: "problems-v2-api-client-test-double",
      enforce: "pre",
      resolveId(source, importer) {
        if (
          source === "./apiClient" &&
          importer?.endsWith("/src/api/problems-v2.ts")
        ) {
          return "\0problems-v2-api-client-test-double";
        }
      },
      load(id) {
        if (id !== "\0problems-v2-api-client-test-double") return;
        return `
          export default {
            get: async (...args) => {
              globalThis.__problemsV2ApiCalls.push(args);
              return { data: { statusCode: 200, data: null } };
            },
          };
        `;
      },
    },
  ],
});

try {
  const { getProblemList } = await server.ssrLoadModule(
    "/src/api/problems-v2.ts",
  );

  const singleLevelRequest = {
    pageNo: 1,
    pageSize: 20,
    levelList: [1],
    typeList: ["수학", "구현"],
    states: ["SOLVED", "FAILED"],
  };
  await getProblemList(singleLevelRequest);
  assert.deepEqual(singleLevelRequest, {
    pageNo: 1,
    pageSize: 20,
    levelList: [1],
    typeList: ["수학", "구현"],
    states: ["SOLVED", "FAILED"],
  });

  await getProblemList({
    pageNo: 1,
    pageSize: 20,
    levelList: [1, 5],
  });
  await getProblemList({
    pageNo: 1,
    pageSize: 20,
    typeList: ["수학"],
    states: ["SOLVED"],
  });
  await getProblemList({
    pageNo: 2,
    pageSize: 50,
    levelList: [],
    typeList: [],
    states: [],
  });

  assert.equal(calls.length, 4);

  const singleLevelUrl = new URL(calls[0][0], "http://localhost:3001");
  assert.equal(singleLevelUrl.pathname, "/api/v2/problems");
  assert.deepEqual(singleLevelUrl.searchParams.getAll("levelList"), ["1", "1"]);
  assert.deepEqual(singleLevelUrl.searchParams.getAll("typeList"), [
    "수학",
    "구현",
  ]);
  assert.deepEqual(singleLevelUrl.searchParams.getAll("states"), [
    "SOLVED",
    "FAILED",
  ]);
  assert.equal(singleLevelUrl.searchParams.has("levelList[]"), false);

  const simpleQuery = parseSimpleQuery(singleLevelUrl.search.slice(1));
  const dtoLevelList = Array.isArray(simpleQuery.levelList)
    ? simpleQuery.levelList.map(Number)
    : [];
  const dtoTypeList = Array.isArray(simpleQuery.typeList)
    ? simpleQuery.typeList
    : [simpleQuery.typeList];

  assert.deepEqual(dtoLevelList, [1, 1]);
  assert.deepEqual(dtoTypeList, ["수학", "구현"]);
  assert.deepEqual(simpleQuery.states, ["SOLVED", "FAILED"]);

  const multiLevelUrl = new URL(calls[1][0], "http://localhost:3001");
  assert.deepEqual(multiLevelUrl.searchParams.getAll("levelList"), ["1", "5"]);

  const singleTypeAndStateUrl = new URL(calls[2][0], "http://localhost:3001");
  const singleTypeAndStateQuery = parseSimpleQuery(
    singleTypeAndStateUrl.search.slice(1),
  );
  assert.equal(singleTypeAndStateQuery.typeList, "수학");
  assert.equal(singleTypeAndStateQuery.states, "SOLVED");
  assert.deepEqual(
    Array.isArray(singleTypeAndStateQuery.typeList)
      ? singleTypeAndStateQuery.typeList
      : [singleTypeAndStateQuery.typeList],
    ["수학"],
  );

  const emptyFiltersUrl = new URL(calls[3][0], "http://localhost:3001");
  assert.equal(emptyFiltersUrl.search, "?pageNo=2&pageSize=50");
  console.log("ALGOGO-90 problems v2 transport test passed");
} finally {
  delete globalThis.__problemsV2ApiCalls;
  await server.close();
}
