import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const component = await readFile(
  new URL("../src/components/problem/CodeTestCaseTable.tsx", import.meta.url),
  "utf8",
);
const fixture = await readFile(
  new URL("./fixtures/code-test-case-table.tsx", import.meta.url),
  "utf8",
);

assert.match(
  component,
  /const testCaseColumns = \[[\s\S]*label: "입력", width: "28%"[\s\S]*label: "출력", width: "28%"[\s\S]*label: "예상 결과", width: "28%"[\s\S]*label: "일치 여부", width: "16%"/,
  "header and body columns must share one 28/28/28/16 definition",
);
assert.match(
  component,
  /<colgroup>[\s\S]*style=\{\{ width: column\.width \}\}/,
  "the table must apply the shared widths through a colgroup",
);
assert.match(
  component,
  /<ShadcnTableHead[\s\S]*className="border-b border-border bg-muted\/20 p-4 text-center"/,
  "table headers must override the shadcn left alignment to match centered cells",
);
assert.match(
  component,
  /const classes = `bg-background p-4 text-center \$\{isLast \? "" : "border-b border-border"\}`/,
  "data cell classes must directly define centered text alignment",
);
assert.match(
  component,
  /min-w-\[640px\] table-fixed/,
  "narrow panels must keep a scrollable table width",
);
assert.match(
  component,
  /flex flex-wrap items-center justify-between gap-2 border-b/,
  "the summary and actions must wrap as groups on narrow panels",
);
assert.match(
  component,
  /shrink-0 items-center gap-1 whitespace-nowrap rounded bg-emerald-500\/10/,
  "success summary must not split its label vertically",
);
assert.match(
  component,
  /shrink-0 items-center gap-1 whitespace-nowrap rounded bg-red-500\/10/,
  "failure summary must not split its label vertically",
);
assert.doesNotMatch(
  component,
  /min-w-max|w-16%/,
  "content-sized and invalid width utilities must not override the column layout",
);
assert.match(
  component,
  /wrap-break-word whitespace-pre-wrap text-center text-sm font-normal[\s\S]*\{output\}/,
  "test failure details must preserve line breaks while long output continues wrapping",
);
assert.match(
  component,
  /onClick=\{\(\) => modal\.push\("TESTCASE", TestCaseModal, \{\}\)\}/,
  "adding test cases must retain its existing modal action",
);
assert.match(
  component,
  /onClick=\{handleTest\}/,
  "running test cases must retain its existing action",
);
assert.equal(
  component.match(
    /className="shrink-0 cursor-pointer disabled:cursor-not-allowed"/g,
  )?.length,
  2,
  "both test case actions must expose active and disabled cursor affordances",
);
assert.match(
  fixture,
  /verylongtestcaseinputvalue1234567890[\s\S]*다음 줄 입력/,
  "the fixture must cover long and multi-line values in the second row",
);
assert.match(
  fixture,
  /w-\[360px\]/,
  "the fixture must cover a narrow scrollable panel",
);
assert.match(
  fixture,
  /handleExecutionResult\?\.\([\s\S]*seq: 1/,
  "the fixture must keep result rendering observable after execution",
);

console.log("ALGOGO-155 code test case table regression checks passed");
