import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const initialization = await server.ssrLoadModule(
    "/src/domain/problems/initialization.ts",
  );
  const editorState = await server.ssrLoadModule("/src/domain/editor/state.ts");

  test("빈 예시는 빈 초기 목록으로 변환한다", () => {
    assert.deepEqual(initialization.createInitialTestCaseList([]), []);
    assert.deepEqual(initialization.createInitialExecuteResultList([]), []);
  });

  test("예시 순서와 테스트 케이스 초기 상태를 보존한다", () => {
    const inputOutputList = [
      { order: 2, input: "second input", output: "second output", content: "" },
      { order: 1, input: "first input", output: "first output", content: "" },
    ];

    assert.deepEqual(
      initialization.createInitialTestCaseList(inputOutputList),
      [
        {
          input: "second input",
          output: "",
          expected: "second output",
          readOnly: true,
          state: "실행 전",
        },
        {
          input: "first input",
          output: "",
          expected: "first output",
          readOnly: true,
          state: "실행 전",
        },
      ],
    );
    assert.deepEqual(
      initialization.createInitialExecuteResultList(inputOutputList),
      [
        {
          input: "second input",
          output: "",
          expected: "second output",
          state: "실행 전",
        },
        {
          input: "first input",
          output: "",
          expected: "first output",
          state: "실행 전",
        },
      ],
    );
    assert.equal(inputOutputList[0].output, "second output");
  });

  test("언어별 기본 코드 선택과 에디터 코드 맵 불변성을 보존한다", () => {
    const defaults = {
      "Node.js": "node default",
      "C++": "cpp default",
      Java: "java default",
      Python: "python default",
    };
    const codeFromLanguage = {
      "Node.js": "node saved",
      "C++": "cpp saved",
      Java: "java saved",
      Python: "python saved",
    };

    for (const language of Object.keys(defaults)) {
      const resetCode = editorState.getResetEditorCode(defaults, language);
      const resetState = editorState.setEditorCode(
        codeFromLanguage,
        language,
        resetCode,
      );
      assert.equal(resetState.code, defaults[language]);
      assert.equal(resetState.codeFromLanguage[language], defaults[language]);
    }
    assert.deepEqual(codeFromLanguage, {
      "Node.js": "node saved",
      "C++": "cpp saved",
      Java: "java saved",
      Python: "python saved",
    });
    assert.notEqual(
      editorState.setEditorCode(codeFromLanguage, "Python", "python default")
        .codeFromLanguage,
      codeFromLanguage,
    );
  });
} finally {
  await server.close();
}
