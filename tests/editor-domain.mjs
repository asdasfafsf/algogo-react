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
  const [
    execution,
    testCases,
    persistence,
    templates,
    templateForm,
    submission,
    workflow,
    state,
  ] = await Promise.all([
    server.ssrLoadModule("/src/domain/editor/execution.ts"),
    server.ssrLoadModule("/src/domain/editor/testCases.ts"),
    server.ssrLoadModule("/src/domain/editor/persistence.ts"),
    server.ssrLoadModule("/src/domain/editor/templates.ts"),
    server.ssrLoadModule("/src/domain/editor/templateForm.ts"),
    server.ssrLoadModule("/src/domain/editor/submission.ts"),
    server.ssrLoadModule("/src/application/editor/execute.ts"),
    server.ssrLoadModule("/src/domain/editor/state.ts"),
  ]);

  assert.deepEqual(
    execution.buildExecutionRequest({ language: "Python", code: "print(1)" }, [
      "a",
      "b",
    ]),
    {
      provider: "Python",
      code: "print(1)",
      inputList: [
        { seq: 0, input: "a" },
        { seq: 1, input: "b" },
      ],
    },
  );

  const original = [
    { input: " 1 ", output: "", expected: "1\n", state: "실행 전" },
  ];
  const running = testCases.markTestCasesRunning(original);
  assert.equal(running[0].state, "실행 중");
  assert.equal(original[0].state, "실행 전");
  const matched = testCases.applyTestCaseResult(running, {
    seq: 0,
    result: " 1 ",
    code: "0000",
  });
  assert.equal(matched[0].state, "일치");
  assert.equal(running[0].state, "실행 중");
  const outOfRange = testCases.applyTestCaseResult(original, {
    seq: 9,
    result: "",
    code: "0000",
  });
  assert.deepEqual(outOfRange, original);
  assert.notEqual(outOfRange[0], original[0]);

  assert.equal(persistence.isEditorCleanupDue(100, null, 10), true);
  assert.equal(persistence.isEditorCleanupDue(110, 100, 10), false);
  assert.equal(persistence.isEditorCleanupDue(111, 100, 10), true);
  assert.equal(persistence.isStoredCodeStale(110, 100, 10), false);
  assert.equal(
    persistence.selectInitialCode({
      fallbackCode: "fallback",
      savedCode: { content: "server", updatedAt: 10 },
      hasAnySavedCode: true,
      localCode: { code: "local", updatedAt: 11 },
      defaultTemplate: "template",
    }),
    "local",
  );
  assert.equal(
    persistence.selectInitialCode({
      fallbackCode: "fallback",
      hasAnySavedCode: false,
      localCode: { code: "local", updatedAt: 11 },
      defaultTemplate: "template",
    }),
    "template",
  );
  assert.equal(
    persistence.selectInitialCode({
      fallbackCode: "fallback",
      hasAnySavedCode: true,
      defaultTemplate: "template",
    }),
    "fallback",
  );
  assert.equal(
    persistence.selectInitialCode({
      fallbackCode: "fallback",
      hasAnySavedCode: false,
      defaultTemplate: "",
    }),
    "",
  );

  const grouped = templates.groupTemplatesByLanguage([
    { uuid: "1", name: "js", language: "Node.js" },
    { uuid: "2", name: "py", language: "Python" },
  ]);
  assert.deepEqual(
    grouped.Python.map(({ uuid }) => uuid),
    ["2"],
  );
  assert.deepEqual(grouped.Java, []);

  const form = {
    name: "name",
    description: "",
    language: "C++",
    content: "code",
    isDefault: false,
  };
  assert.equal(
    templateForm.validateTemplateForm({ ...form, name: " " }),
    "name-required",
  );
  assert.equal(
    templateForm.validateTemplateForm({ ...form, content: "\n" }),
    "content-required",
  );
  assert.equal(
    templateForm.templateFormErrorMessage["name-required"],
    "템플릿 이름을 입력해주세요.",
  );
  assert.equal(
    templateForm.templateFormErrorMessage["content-required"],
    "템플릿 코드를 입력해주세요.",
  );
  assert.deepEqual(templateForm.buildUpdateTemplateRequest(form, "uuid"), {
    ...form,
    uuid: "uuid",
  });
  assert.deepEqual(templateForm.decideTemplateMutation("update", 200), {
    message: "updated",
    reload: true,
    close: true,
  });
  assert.deepEqual(templateForm.decideTemplateMutation("update", 500), {
    message: "response-error",
    reload: false,
    close: false,
  });
  assert.deepEqual(templateForm.decideTemplateMutation("create", 200), {
    message: "created",
    reload: true,
    close: true,
  });
  assert.deepEqual(templateForm.decideTemplateMutation("create", 500), {
    message: "response-error",
    reload: false,
    close: false,
  });
  assert.deepEqual(templateForm.decideTemplateMutation("delete", 500), {
    message: "response-error",
    reload: false,
    close: false,
  });
  let finishFirstMutation;
  let mutationCount = 0;
  const mutationLock = { current: false };
  const firstMutation = templateForm.runExclusiveTemplateMutation(
    mutationLock,
    async () => {
      mutationCount += 1;
      await new Promise((resolve) => {
        finishFirstMutation = resolve;
      });
      return "first";
    },
  );
  const duplicateMutation = await templateForm.runExclusiveTemplateMutation(
    mutationLock,
    async () => {
      mutationCount += 1;
      return "duplicate";
    },
  );
  assert.equal(duplicateMutation, undefined);
  assert.equal(mutationCount, 1);
  finishFirstMutation();
  assert.equal(await firstMutation, "first");
  assert.equal(mutationLock.current, false);
  assert.equal(
    await templateForm.runExclusiveTemplateMutation(
      mutationLock,
      async () => "next",
    ),
    "next",
  );
  await assert.rejects(
    templateForm.runExclusiveTemplateMutation(mutationLock, async () => {
      throw new Error("request failed");
    }),
    /request failed/,
  );
  assert.equal(mutationLock.current, false);
  assert.equal(
    submission.getSubmissionUrl({ source: "BOJ", sourceId: 1000 }),
    "https://www.acmicpc.net/submit/1000",
  );
  assert.equal(
    submission.getSubmissionUrl({ source: "OTHER", sourceId: 1 }),
    null,
  );
  const codeMap = {
    "Node.js": "js",
    "C++": "cpp",
    Java: "java",
    Python: "python",
  };
  const changedCode = state.setEditorCode(codeMap, "Python", "changed");
  assert.equal(changedCode.codeFromLanguage.Python, "changed");
  assert.equal(codeMap.Python, "python");
  assert.deepEqual(state.selectEditorLanguage(codeMap, "Java"), {
    language: "Java",
    code: "java",
  });
  const settings = {
    theme: "vs-dark",
    fontSize: 14,
    tabSize: 4,
    lineNumber: "on",
    defaultLanguage: "C++",
  };
  assert.deepEqual(state.mergeEditorSettings(settings, { fontSize: 18 }), {
    ...settings,
    fontSize: 18,
  });
  assert.equal(settings.fontSize, 14);

  const events = [];
  let runCount = 0;
  const retryResult = await workflow.executeWithAuthenticationRetry(
    "JWT_EXPIRED",
    () => ({ code: "code", provider: "Java", inputList: [] }),
    {
      connect: async () => {
        events.push("connect");
        return "WAITING";
      },
      refreshAuthentication: async () => {
        events.push("refresh");
      },
      subscribe: (retry) => events.push(`subscribe:${retry}`),
      run: async () => {
        runCount += 1;
        events.push(`run:${runCount}`);
        return { code: runCount === 1 ? "JWT_EXPIRED" : "0000" };
      },
    },
    () => events.push("ready"),
  );
  assert.equal(retryResult.code, "0000");
  assert.deepEqual(events, [
    "refresh",
    "connect",
    "ready",
    "subscribe:false",
    "run:1",
    "refresh",
    "connect",
    "subscribe:true",
    "run:2",
  ]);

  console.log("ALGOGO-79 editor domain tests passed");
} finally {
  await server.close();
}
