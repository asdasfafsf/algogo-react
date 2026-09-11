import assert from "node:assert/strict";
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
    { default: ProblemSource },
    { default: ProblemTabsList },
    { Tabs },
  ] = await Promise.all([
    server.ssrLoadModule("/src/components/problem/ProblemCategoryViewer.tsx"),
    server.ssrLoadModule("/src/components/problem/ProblemSource.tsx"),
    server.ssrLoadModule("/src/components/problem/ProblemTabsList.tsx"),
    server.ssrLoadModule("/src/components/ui/tabs.tsx"),
  ]);

  const emptyCategoryMarkup = renderToStaticMarkup(
    React.createElement(ProblemCategoryViewer, {
      initialState: "none",
      categoryList: [],
    }),
  );
  assert.match(emptyCategoryMarkup, /등록된 태그가 없습니다\./);
  assert.doesNotMatch(emptyCategoryMarkup, /<button/);
  assert.doesNotMatch(emptyCategoryMarkup, /알 수 없음/);

  const populatedCategoryMarkup = renderToStaticMarkup(
    React.createElement(ProblemCategoryViewer, {
      initialState: "hide",
      categoryList: ["수학", "구현"],
    }),
  );
  assert.match(populatedCategoryMarkup, /<button/);
  assert.match(populatedCategoryMarkup, /가려짐/);

  const emptySourceMarkup = renderToStaticMarkup(
    React.createElement(ProblemSource),
  );
  assert.match(emptySourceMarkup, /등록된 출처가 없습니다\./);
  assert.match(emptySourceMarkup, /<svg/);
  assert.doesNotMatch(emptySourceMarkup, /<button|<a /);

  const tabsMarkup = renderToStaticMarkup(
    React.createElement(
      Tabs,
      { defaultValue: "description" },
      React.createElement(ProblemTabsList),
    ),
  );
  assert.match(tabsMarkup, /aria-label="풀이, 준비 중"/);
  assert.match(tabsMarkup, /aria-label="제출 내역, 준비 중"/);
  assert.equal((tabsMarkup.match(/ disabled=""/g) ?? []).length, 2);

  console.log("ALGOGO-122 problem detail empty-state tests passed");
} finally {
  await server.close();
}
