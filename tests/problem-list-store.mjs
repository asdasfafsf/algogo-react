import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const responses = [];
globalThis.__problemListResponses = responses;

const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [
    {
      name: "problem-list-store-api-client-test-double",
      enforce: "pre",
      resolveId(source, importer) {
        if (
          source === "./apiClient" &&
          importer?.endsWith("/src/api/problems-v2.ts")
        ) {
          return "\0problem-list-store-api-client-test-double";
        }
      },
      load(id) {
        if (id !== "\0problem-list-store-api-client-test-double") return;
        return `
          export default {
            get: async () => {
              const response = globalThis.__problemListResponses.shift();
              const resolvedResponse =
                typeof response === "function" ? await response() : response;
              if (resolvedResponse instanceof Error) throw resolvedResponse;
              return { data: resolvedResponse };
            },
          };
        `;
      },
    },
  ],
});

const paging = { pageNo: 1, pageSize: 20 };
const problem = {
  uuid: "problem-1",
  title: "테스트 문제",
  levelText: "Bronze V",
  answerCount: 1,
  answerRate: 50,
  submitCount: 2,
  answerPeopleCount: 1,
  source: "BOJ",
  sourceId: "1000",
  sourceUrl: "https://example.com/problems/1000",
  level: 1,
  typeList: [],
  state: "SOLVED",
};

function createDeferredResponse() {
  let resolve;
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function successResponse(problemList = [problem]) {
  return {
    statusCode: 200,
    errorCode: "0000",
    errorMessage: "",
    data: {
      problemList,
      totalCount: problemList.length,
      pageNo: 1,
      pageSize: 20,
    },
  };
}

try {
  const { useProblemListStore } = await server.ssrLoadModule(
    "/src/zustand/ProblemListStore.ts",
  );

  responses.push({
    statusCode: 200,
    errorCode: "0000",
    errorMessage: "",
    data: { problemList: [problem], totalCount: 41, pageNo: 1, pageSize: 20 },
  });
  await useProblemListStore.getState().fetchProblemList(paging, []);
  assert.deepEqual(useProblemListStore.getState().problemList, [problem]);
  assert.equal(useProblemListStore.getState().totalCount, 41);
  assert.equal(useProblemListStore.getState().maxPageNo, 3);
  assert.equal(useProblemListStore.getState().error, null);
  assert.equal(useProblemListStore.getState().isFetching, false);

  responses.push({
    statusCode: 500,
    errorCode: "INTERNAL_SERVER_ERROR",
    errorMessage: "목록 조회 실패",
    data: null,
  });
  await useProblemListStore.getState().fetchProblemList(paging, []);
  assert.deepEqual(useProblemListStore.getState().problemList, []);
  assert.equal(useProblemListStore.getState().totalCount, 0);
  assert.equal(useProblemListStore.getState().maxPageNo, 0);
  assert.equal(useProblemListStore.getState().error, "목록 조회 실패");
  assert.equal(useProblemListStore.getState().isFetching, false);

  responses.push({
    statusCode: 200,
    errorCode: "0000",
    errorMessage: "",
    data: { problemList: [problem], totalCount: 1, pageNo: 1, pageSize: 20 },
  });
  await useProblemListStore.getState().fetchProblemList(paging, []);
  assert.deepEqual(useProblemListStore.getState().problemList, [problem]);
  assert.equal(useProblemListStore.getState().totalCount, 1);
  assert.equal(useProblemListStore.getState().maxPageNo, 1);
  assert.equal(useProblemListStore.getState().error, null);

  responses.push(new Error("network failed"));
  await useProblemListStore.getState().fetchProblemList(paging, []);
  assert.deepEqual(useProblemListStore.getState().problemList, []);
  assert.equal(useProblemListStore.getState().totalCount, 0);
  assert.equal(useProblemListStore.getState().maxPageNo, 0);
  assert.equal(
    useProblemListStore.getState().error,
    "네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
  );
  assert.equal(useProblemListStore.getState().isFetching, false);

  const staleSuccess = createDeferredResponse();
  const latestFailure = createDeferredResponse();
  responses.push(
    () => staleSuccess.promise,
    () => latestFailure.promise,
  );
  const staleSuccessRequest = useProblemListStore
    .getState()
    .fetchProblemList(paging, []);
  const latestFailureRequest = useProblemListStore
    .getState()
    .fetchProblemList(paging, []);

  latestFailure.resolve({
    statusCode: 500,
    errorCode: "LATEST_REQUEST_FAILED",
    errorMessage: "최신 요청 실패",
    data: null,
  });
  await latestFailureRequest;
  staleSuccess.resolve(successResponse());
  await staleSuccessRequest;
  assert.deepEqual(useProblemListStore.getState().problemList, []);
  assert.equal(useProblemListStore.getState().error, "최신 요청 실패");
  assert.equal(useProblemListStore.getState().isFetching, false);

  const staleFailure = createDeferredResponse();
  const latestSuccess = createDeferredResponse();
  responses.push(
    () => staleFailure.promise,
    () => latestSuccess.promise,
  );
  const staleFailureRequest = useProblemListStore
    .getState()
    .fetchProblemList(paging, []);
  const latestSuccessRequest = useProblemListStore
    .getState()
    .fetchProblemList(paging, []);

  staleFailure.resolve({
    statusCode: 500,
    errorCode: "STALE_REQUEST_FAILED",
    errorMessage: "오래된 요청 실패",
    data: null,
  });
  await staleFailureRequest;
  assert.equal(useProblemListStore.getState().isFetching, true);
  assert.equal(useProblemListStore.getState().error, null);

  latestSuccess.resolve(successResponse());
  await latestSuccessRequest;
  assert.deepEqual(useProblemListStore.getState().problemList, [problem]);
  assert.equal(useProblemListStore.getState().error, null);
  assert.equal(useProblemListStore.getState().isFetching, false);

  console.log("ALGOGO-96 problem list store test passed");
} finally {
  delete globalThis.__problemListResponses;
  await server.close();
}
