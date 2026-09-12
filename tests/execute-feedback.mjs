import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [workflow, errors, testCases] = await Promise.all([
    server.ssrLoadModule("/src/application/editor/execute.ts"),
    server.ssrLoadModule("/src/domain/execute/error.ts"),
    server.ssrLoadModule("/src/domain/editor/testCases.ts"),
  ]);

  let finishFirstExecution;
  let runCount = 0;
  const firstExecution = workflow.executeWithAuthenticationRetry(
    "WAITING",
    () => ({ code: "print(1)", provider: "Python", inputList: [] }),
    {
      connect: async () => "WAITING",
      refreshAuthentication: async () => undefined,
      subscribe: () => undefined,
      run: async () => {
        runCount += 1;
        await new Promise((resolve) => {
          finishFirstExecution = resolve;
        });
        return { code: "0000", result: "완료" };
      },
    },
  );

  assert.equal(workflow.canStartExecution("WAITING"), false);
  let duplicateError;
  try {
    await workflow.executeWithAuthenticationRetry(
      "WAITING",
      () => ({ code: "print(2)", provider: "Python", inputList: [] }),
      {
        connect: async () => "WAITING",
        refreshAuthentication: async () => undefined,
        subscribe: () => undefined,
        run: async () => {
          runCount += 1;
          return { code: "0000", result: "중복" };
        },
      },
    );
  } catch (error) {
    duplicateError = error;
  }
  assert.equal(workflow.isExecutionBusyError(duplicateError), true);
  assert.equal(runCount, 1);
  finishFirstExecution();
  await firstExecution;
  assert.equal(workflow.canStartExecution("WAITING"), true);

  const failure = errors.toExecutionFailureResult(
    new errors.ExecuteSocketError(
      errors.EXECUTE_SOCKET_ERROR_CODE.unavailable,
      "internal connection detail",
    ),
  );
  assert.equal(
    failure.result,
    "코드 실행 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );
  assert.equal(failure.detail, "네트워크 연결을 확인한 뒤 다시 실행해 주세요.");
  assert.doesNotMatch(`${failure.result}\n${failure.detail}`, /internal/);
  assert.equal(errors.isExecutionOutputCode("0000"), true);
  assert.equal(errors.isExecutionOutputCode("0"), false);

  const runningRows = testCases.markTestCasesRunning([
    { input: "1", output: "이전 결과", expected: "1", state: "실행 전" },
    { input: "2", output: "이전 결과", expected: "2", state: "실행 전" },
  ]);
  const firstFailed = testCases.applyTestCaseResult(runningRows, {
    ...failure,
    seq: 0,
  });
  assert.equal(firstFailed[0].state, "실패");
  assert.equal(firstFailed[0].output, `${failure.result}\n${failure.detail}`);
  assert.equal(firstFailed[1].state, "실행 중");

  const compilationFailure = testCases.applyCompilationError(runningRows, {
    seq: 0,
    processTime: 0,
    memory: 0,
    code: "9002",
    result: "컴파일하지 못했습니다.",
    detail: "12번째 줄을 확인해 주세요.",
  });
  assert.deepEqual(
    compilationFailure.map(({ state }) => state),
    ["실패", "실패"],
  );
  assert.equal(
    compilationFailure[1].output,
    "컴파일하지 못했습니다.\n12번째 줄을 확인해 주세요.",
  );

  const [executeHook, testHook, outputComponent, fixture] = await Promise.all([
    readFile(new URL("../src/hook/useExecute.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../src/hook/useExecuteTestCase.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/components/problem/CodeResultOutput.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL("./fixtures/execute-feedback.tsx", import.meta.url),
      "utf8",
    ),
  ]);

  for (const hook of [executeHook, testHook]) {
    assert.doesNotMatch(hook, /useAlertModal|\balert\s*\(/);
    assert.match(hook, /if \(!canStartExecution\([^)]*\)\) return;/);
    assert.match(hook, /if \(isExecutionBusyError\(error\)\) return;/);
  }
  assert.doesNotMatch(outputComponent, /ExecuteSocketStore|zustand/);
  assert.match(outputComponent, /isPending: boolean/);
  assert.match(outputComponent, /role="status"[\s\S]*코드를 실행하고 있습니다/);
  assert.match(
    outputComponent,
    /const hasMetrics = output\.processTime > 0 \|\| output\.memory > 0/,
  );
  assert.match(outputComponent, /disabled=\{isPending \|\| copyPending\}/);
  assert.match(
    outputComponent,
    /aria-label="출력 지우기"[\s\S]*disabled=\{isPending\}/,
  );
  assert.match(fixture, /useExecute\(\)[\s\S]*useExecuteTestCase\(\)/);
  assert.match(fixture, /data-testid="request-count"/);

  console.log("ALGOGO-175 execution feedback regression tests passed");
} finally {
  await server.close();
}
