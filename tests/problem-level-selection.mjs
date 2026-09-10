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
  const {
    getProblemLevelName,
    getProblemLevelRank,
    normalizeProblemLevelOptions,
    toggleProblemLevel,
    toggleProblemTier,
  } = await server.ssrLoadModule(
    "/src/domain/problems/problemLevelSelection.ts",
  );

  const options = Array.from({ length: 10 }, (_, index) => ({
    name: `기존 이름 ${index + 1}`,
    value: String(index + 1),
    isSelected: false,
  }));

  test("API 난이도 값을 티어의 1~5 표기로 변환한다", () => {
    assert.equal(getProblemLevelRank("1"), 5);
    assert.equal(getProblemLevelRank("5"), 1);
    assert.equal(getProblemLevelRank("16"), 5);
    assert.equal(getProblemLevelRank("20"), 1);
    assert.equal(getProblemLevelName("0"), "알 수 없음");
    assert.equal(getProblemLevelName("20"), "플래티넘 1");
    assert.throws(() => getProblemLevelName("31"), RangeError);
  });

  test("플래티넘을 포함한 난이도 이름을 값 기준으로 정규화한다", () => {
    const normalized = normalizeProblemLevelOptions([
      { name: "플래티넘 1", value: "16", isSelected: false },
      { name: "플래티넘 5", value: "20", isSelected: true },
    ]);

    assert.deepEqual(
      normalized.map(({ name }) => name),
      ["플래티넘 5", "플래티넘 1"],
    );
  });

  test("개별 선택은 원본 객체를 변경하지 않는다", () => {
    const next = toggleProblemLevel(options, "5");

    assert.equal(options[4].isSelected, false);
    assert.equal(next[4].isSelected, true);
    assert.notEqual(next[4], options[4]);
  });

  test("티어 전체 선택과 해제는 다른 티어와 원본을 변경하지 않는다", () => {
    const selected = toggleProblemTier(options, ["1", "2", "3", "4", "5"]);
    const cleared = toggleProblemTier(selected, ["1", "2", "3", "4", "5"]);

    assert.deepEqual(
      selected.map(({ isSelected }) => isSelected),
      [true, true, true, true, true, false, false, false, false, false],
    );
    assert.ok(cleared.every(({ isSelected }) => !isSelected));
    assert.ok(options.every(({ isSelected }) => !isSelected));
  });
} finally {
  await server.close();
}
