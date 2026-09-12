import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { analyzeSampleWhitespace } from "../src/lib/sampleWhitespace.ts";

test("공백, 탭, 빈 줄, 줄바꿈과 줄 끝 공백을 구분한다", () => {
  const lines = analyzeSampleWhitespace("A  B\tC  \r\n\n\tZ");

  assert.equal(lines.length, 3);
  assert.equal(lines[0].hasLineBreak, true);
  assert.equal(lines[1].isEmpty, true);
  assert.equal(lines[1].hasLineBreak, true);
  assert.deepEqual(lines[0].tokens, [
    { type: "text", value: "A" },
    { type: "space", trailing: false },
    { type: "space", trailing: false },
    { type: "text", value: "B" },
    { type: "tab", trailing: false, width: 4 },
    { type: "text", value: "C" },
    { type: "space", trailing: true },
    { type: "space", trailing: true },
  ]);
  assert.deepEqual(lines[2].tokens, [
    { type: "tab", trailing: false, width: 4 },
    { type: "text", value: "Z" },
  ]);
});

test("마지막 줄바꿈은 가짜 빈 줄을 만들지 않고 실제 빈 문자열은 한 줄로 표현한다", () => {
  assert.deepEqual(analyzeSampleWhitespace("value\n"), [
    {
      number: 1,
      tokens: [{ type: "text", value: "value" }],
      isEmpty: false,
      hasLineBreak: true,
    },
  ]);
  assert.deepEqual(analyzeSampleWhitespace(""), [
    {
      number: 1,
      tokens: [],
      isEmpty: true,
      hasLineBreak: false,
    },
  ]);
});

test("탭 너비는 현재 열의 다음 탭 정렬점까지 계산한다", () => {
  const [line] = analyzeSampleWhitespace("12\t3\t", 4);

  assert.deepEqual(line.tokens, [
    { type: "text", value: "12" },
    { type: "tab", trailing: false, width: 2 },
    { type: "text", value: "3" },
    { type: "tab", trailing: true, width: 3 },
  ]);
  assert.throws(() => analyzeSampleWhitespace("x", 0), RangeError);
});

test("보조 평면 문자가 있어도 뒤 공백을 줄 끝 공백으로 판별한다", () => {
  const [line] = analyzeSampleWhitespace("😀 ");

  assert.deepEqual(line.tokens, [
    { type: "text", value: "😀" },
    { type: "space", trailing: true },
  ]);
});

test("입출력 카드는 세로 배치와 원본 복사 콜백 계약을 유지한다", async () => {
  const [listComponent, clipboardComponent, fixture] = await Promise.all([
    readFile(
      new URL(
        "../src/components/problem/ProblemInputOutputList.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/components/common/ClipboardWithTooltip.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL("./fixtures/problem-input-output-list.tsx", import.meta.url),
      "utf8",
    ),
  ]);

  assert.doesNotMatch(listComponent, /grid-cols-2/);
  assert.match(
    listComponent,
    /handleCopyCallback=\{\(\) => setSelectedIndex\(0\)\}/,
  );
  assert.match(clipboardComponent, /copyTextWithFeedback\(content,/);
  assert.match(clipboardComponent, /handleCopyCallback\(content\)/);
  assert.match(clipboardComponent, /overflow-x-auto/);
  assert.match(fixture, /"10  20\\t30  \\n\\n긴_줄_"/);
  assert.match(fixture, /마지막 줄\\t "/);
  assert.match(fixture, /width: isNarrow \? 320 : "100%"/);
});
