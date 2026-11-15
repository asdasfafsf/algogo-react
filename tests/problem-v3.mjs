import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const fixture = JSON.parse(
  readFileSync(new URL("./fixtures/problem-v3.json", import.meta.url), "utf8"),
);
const calls = [];
const responses = [];
globalThis.__problemV3Transport = async (...args) => {
  calls.push(args);
  const next = responses.shift();
  if (next instanceof Error) throw next;
  return { data: next };
};
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [
    {
      name: "problem-v3-transport",
      enforce: "pre",
      resolveId(source, importer) {
        if (
          source === "./apiClient" &&
          /\/src\/api\/problems-v[23]\.ts$/.test(importer ?? "")
        )
          return "\0problem-v3-transport";
      },
      load(id) {
        if (id === "\0problem-v3-transport")
          return "export default { get: (...args) => globalThis.__problemV3Transport(...args) };";
      },
    },
  ],
});
try {
  const contract = await server.ssrLoadModule(
    "/src/domain/problems/problemDocument.ts",
  );
  const { toProblemView } = await server.ssrLoadModule(
    "/src/domain/problems/problemV3.ts",
  );
  const { buildExecutionRequest } = await server.ssrLoadModule(
    "/src/domain/editor/execution.ts",
  );
  const { createInitialTestCaseList } = await server.ssrLoadModule(
    "/src/domain/problems/initialization.ts",
  );
  const { default: Nodes } = await server.ssrLoadModule(
    "/src/components/problem/ProblemDocumentNodes.tsx",
  );
  const { getProblem } = await server.ssrLoadModule("/src/api/problems-v3.ts");
  assert.equal(contract.isProblemDocument(fixture), true);
  const metadata = {
    uuid: "preserved-uuid",
    title: "fixture",
    document: fixture,
  };
  const view = toProblemView(metadata);
  const cases = createInitialTestCaseList(view.inputOutputList);
  assert.equal(cases[0].input, " 1\t2  \n\n");
  assert.equal(cases[0].expected, "3\n");
  assert.deepEqual(
    buildExecutionRequest(
      { code: "print(input())", language: "Python" },
      cases.map((x) => x.input),
    ),
    {
      code: "print(input())",
      provider: "Python",
      inputList: [{ seq: 0, input: " 1\t2  \n\n" }],
    },
  );
  assert.equal(view.uuid, "preserved-uuid");
  assert.equal(view.style, "");
  const html = renderToStaticMarkup(
    createElement(Nodes, { nodes: fixture.sections[0].nodes }),
  );
  assert.match(html, /<table>/);
  assert.match(html, /colSpan="2"/i);
  assert.match(html, /\\\[\\sum/);
  assert.doesNotMatch(html, /<script|onclick|alert\(/);
  assert.match(html, /A &amp; B/);
  const unsafe = structuredClone(fixture);
  unsafe.sections[0].nodes.push({
    type: "element",
    tag: "a",
    attributes: { href: "javascript:alert(1)" },
    children: [],
  });
  assert.equal(contract.isProblemDocument(unsafe), false);
  assert.throws(() => toProblemView({ ...metadata, document: unsafe }));
  responses.push({ statusCode: 200, data: metadata });
  const response = await getProblem("preserved-uuid");
  assert.equal(response.data.document.schemaVersion, 1);
  assert.deepEqual(
    calls.splice(0).map((x) => x[0]),
    ["/api/v3/problems/preserved-uuid"],
  );
  responses.push(
    { statusCode: 404 },
    { statusCode: 200, data: { uuid: "legacy" } },
  );
  assert.equal((await getProblem("legacy")).data.uuid, "legacy");
  assert.deepEqual(
    calls.splice(0).map((x) => x[0]),
    ["/api/v3/problems/legacy", "/api/v2/problems/legacy"],
  );
  const missing = Object.assign(new Error("missing"), {
    isAxiosError: true,
    response: { status: 404 },
  });
  responses.push(missing, { statusCode: 200, data: { uuid: "legacy-http" } });
  assert.equal((await getProblem("legacy-http")).data.uuid, "legacy-http");
  calls.splice(0);
  const unavailable = Object.assign(new Error("offline"), {
    isAxiosError: true,
    response: { status: 500 },
  });
  responses.push(unavailable);
  await assert.rejects(getProblem("failure"), /offline/);
  assert.equal(calls.length, 1);
  console.log(
    "v3 shared fixture, safe rendering, sample execution contract, and API fallback passed",
  );
} finally {
  delete globalThis.__problemV3Transport;
  await server.close();
}
