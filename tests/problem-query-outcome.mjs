import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

const list = {
  problemList: [],
  totalCount: 0,
  pageNo: 1,
  pageSize: 20,
};

try {
  const outcomes = await server.ssrLoadModule(
    "/src/domain/problems/queryOutcome.ts",
  );

  assert.deepEqual(
    outcomes.problemListQueryOutcome({
      statusCode: 200,
      errorCode: "0000",
      data: list,
    }),
    { type: "success", data: list },
  );
  assert.deepEqual(
    outcomes.problemListQueryOutcome({
      statusCode: 503,
      errorCode: "UPSTREAM_TIMEOUT",
      errorMessage: "database connection failed at problem-service.internal",
      data: null,
    }),
    {
      type: "failure",
      message: "문제 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
    },
  );

  const todayProblems = [];
  assert.deepEqual(
    outcomes.todayProblemsQueryOutcome({
      statusCode: 200,
      errorCode: "0000",
      data: todayProblems,
    }),
    { type: "success", data: todayProblems },
  );
  assert.deepEqual(
    outcomes.todayProblemsQueryOutcome({
      statusCode: 200,
      errorCode: "TODAY_UNAVAILABLE",
      errorMessage: "today-problem cache key fixture-user could not be read",
      data: null,
    }),
    {
      type: "failure",
      message: "오늘의 문제를 가져오지 못했어요. 잠시 후 다시 시도해 주세요.",
    },
  );

  console.log("ALGOGO-136 problem query outcome test passed");
} finally {
  await server.close();
}
