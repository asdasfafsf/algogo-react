import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [
    { default: ProblemCategoryViewer },
    { default: ProblemLevelViewer },
    { default: ProblemInputOutputList },
    { default: CodeResultOutput },
  ] = await Promise.all([
    server.ssrLoadModule("/src/components/problem/ProblemCategoryViewer.tsx"),
    server.ssrLoadModule("/src/components/problem/ProblemLevelViewer.tsx"),
    server.ssrLoadModule("/src/components/problem/ProblemInputOutputList.tsx"),
    server.ssrLoadModule("/src/components/problem/CodeResultOutput.tsx"),
  ]);

  const categoryMarkup = renderToStaticMarkup(
    React.createElement(ProblemCategoryViewer, {
      initialState: "hide",
      categoryList: ["구현", "문자열"],
    }),
  );
  assert.match(categoryMarkup, /aria-label="유형 보기"/);
  assert.match(categoryMarkup, /가려짐/);

  const levelMarkup = renderToStaticMarkup(
    React.createElement(ProblemLevelViewer, {
      intialState: "hide",
      level: "골드 3",
    }),
  );
  assert.match(levelMarkup, /aria-label="난이도 보기"/);
  assert.match(levelMarkup, /난이도 :/);

  const inputOutputMarkup = renderToStaticMarkup(
    React.createElement(ProblemInputOutputList, {
      inputOutputList: [
        { order: 1, input: "1 2", output: "3", content: "설명" },
      ],
    }),
  );
  assert.match(inputOutputMarkup, /<code/);
  assert.match(inputOutputMarkup, /aria-label="입력 예시 1 복사"/);
  assert.match(inputOutputMarkup, /aria-label="출력 예시 1 복사"/);
  assert.match(inputOutputMarkup, />·<\/span>/);
  assert.match(inputOutputMarkup, />1<\/span>/);
  assert.doesNotMatch(inputOutputMarkup, /grid-cols-2/);

  const resultMarkup = renderToStaticMarkup(
    React.createElement(CodeResultOutput, {
      output: {
        seq: 1,
        processTime: 12,
        memory: 256,
        code: "0000",
        result: "실행 결과",
        detail: "추가 정보",
      },
      handleClickRun: () => undefined,
      handleClickCopy: () => undefined,
      handleClickReset: () => undefined,
      isPending: false,
    }),
  );
  assert.match(resultMarkup, />완료</);
  assert.doesNotMatch(resultMarkup, />실패</);
  assert.match(resultMarkup, /aria-label="실행 결과 동작"/);
  assert.match(resultMarkup, /aria-label="다시 실행"/);
  assert.match(resultMarkup, /aria-label="출력 복사"/);
  assert.match(resultMarkup, /aria-label="출력 지우기"/);

  const pendingResultMarkup = renderToStaticMarkup(
    React.createElement(CodeResultOutput, {
      output: {
        seq: 0,
        processTime: 0,
        memory: 0,
        code: "",
        result: "",
        detail: "",
      },
      handleClickRun: () => undefined,
      handleClickCopy: () => undefined,
      handleClickReset: () => undefined,
      isPending: true,
    }),
  );
  assert.match(pendingResultMarkup, /코드를 실행하고 있습니다/);
  assert.equal(pendingResultMarkup.match(/disabled=""/g)?.length, 3);

  const zeroMetricFailureMarkup = renderToStaticMarkup(
    React.createElement(CodeResultOutput, {
      output: {
        seq: 0,
        processTime: 0,
        memory: 0,
        code: "SOCKET_UNAVAILABLE",
        result: "코드 실행 서버에 연결하지 못했습니다.",
        detail: "네트워크 연결을 확인해 주세요.",
      },
      handleClickRun: () => undefined,
      handleClickCopy: () => undefined,
      handleClickReset: () => undefined,
      isPending: false,
    }),
  );
  assert.match(zeroMetricFailureMarkup, />실패</);
  assert.doesNotMatch(zeroMetricFailureMarkup, /0ms|0MB/);

  const componentFiles = [
    "src/components/problem/ProblemCategoryViewer.tsx",
    "src/components/problem/ProblemLevelViewer.tsx",
    "src/components/problem/ProblemInputOutputList.tsx",
    "src/components/common/ClipboardWithTooltip.tsx",
    "src/components/problem/CodeResultOutput.tsx",
  ];
  const sources = await Promise.all(
    componentFiles.map((file) =>
      readFile(new URL(`../${file}`, import.meta.url), "utf8"),
    ),
  );
  for (const source of sources) {
    assert.doesNotMatch(
      source,
      /@components\/common\/index.*(?:Tooltip|Typography)/,
    );
    assert.match(source, /focus-visible:ring-2|<code|<p className/);
  }

  console.log("ALGOGO-125 problem display tests passed");
} finally {
  await server.close();
}
