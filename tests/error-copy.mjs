import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [problemUpdate, templateForm, execution] = await Promise.all([
    server.ssrLoadModule("/src/application/problems/updateProblem.ts"),
    server.ssrLoadModule("/src/domain/editor/templateForm.ts"),
    server.ssrLoadModule("/src/domain/execute/error.ts"),
  ]);
  const [
    dropdownSource,
    formSource,
    toastSource,
    problemListStoreSource,
    homeTodayProblemsSource,
  ] = await Promise.all([
    fs.readFile(
      new URL("../src/hook/editor/useCodeTemplateDropdown.ts", import.meta.url),
      "utf8",
    ),
    fs.readFile(
      new URL("../src/hook/editor/useCodeTemplateForm.ts", import.meta.url),
      "utf8",
    ),
    fs.readFile(
      new URL("../src/components/modal/ToastModal.tsx", import.meta.url),
      "utf8",
    ),
    fs.readFile(
      new URL("../src/zustand/ProblemListStore.ts", import.meta.url),
      "utf8",
    ),
    fs.readFile(
      new URL("../src/hook/home/useHomeTodayProblems.ts", import.meta.url),
      "utf8",
    ),
  ]);

  assert.equal(
    problemUpdate.problemUpdateFailureMessage,
    "문제를 업데이트하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );
  assert.equal(
    templateForm.templateLoadFailureMessage,
    "코드 템플릿을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );
  assert.equal(
    execution.executionFailureMessage("JWT_INVALID"),
    "로그인 정보를 확인할 수 없습니다. 다시 로그인해 주세요.",
  );
  assert.equal(
    execution.executionFailureMessage("SOCKET_ACK_TIMEOUT"),
    "코드 실행 서버의 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.",
  );
  assert.equal(execution.isExecutionOutputCode("9002"), true);
  assert.equal(execution.isExecutionOutputCode("9999"), false);

  assert.doesNotMatch(dropdownSource, /response\.errorMessage/);
  assert.doesNotMatch(formSource, /response\.errorMessage/);
  assert.match(dropdownSource, /catch\s*\{/);
  assert.match(formSource, /runExclusiveTemplateMutation/);
  assert.match(toastSource, /className="sr-only"/);
  assert.match(toastSource, /Check icon|Error icon|Warning icon/);
  assert.doesNotMatch(problemListStoreSource, /response\.errorMessage/);
  assert.doesNotMatch(homeTodayProblemsSource, /response\.errorMessage/);

  console.log("ALGOGO-127 user-facing error copy tests passed");
} finally {
  await server.close();
}
