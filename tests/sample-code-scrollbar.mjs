import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readProjectFile = (file) =>
  readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("입출력 예시 코드 영역에만 얇은 가로 스크롤바 스타일을 적용한다", async () => {
  const [clipboard, styles] = await Promise.all([
    readProjectFile("src/components/common/ClipboardWithTooltip.tsx"),
    readProjectFile("src/index.css"),
  ]);

  assert.match(clipboard, /sample-code-scrollbar block w-full overflow-x-auto/);
  assert.match(
    styles,
    /\.sample-code-scrollbar\s*\{[\s\S]*scrollbar-width:\s*thin/,
  );
  assert.match(
    styles,
    /\.sample-code-scrollbar\s*\{[\s\S]*scrollbar-color:\s*var\(--sample-scrollbar-thumb\) transparent/,
  );
  assert.match(
    styles,
    /\.sample-code-scrollbar::-webkit-scrollbar\s*\{[\s\S]*height:\s*6px/,
  );
  assert.match(
    styles,
    /\.sample-code-scrollbar::-webkit-scrollbar-track,[\s\S]*\.sample-code-scrollbar::-webkit-scrollbar-corner[\s\S]*background:\s*transparent/,
  );
  assert.match(
    styles,
    /\.sample-code-scrollbar::-webkit-scrollbar-thumb\s*\{[\s\S]*border-radius:\s*999px/,
  );
  assert.match(styles, /::-webkit-scrollbar-thumb:hover/);
  assert.match(styles, /::-webkit-scrollbar-thumb:active/);
  assert.match(styles, /::-webkit-scrollbar-button[\s\S]*display:\s*none/);
  assert.match(styles, /\.dark \.sample-code-scrollbar\s*\{/);
});
