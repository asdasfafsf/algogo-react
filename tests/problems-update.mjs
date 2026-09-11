import assert from "node:assert/strict";
import { createServer } from "vite";
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { updateProblem } = await server.ssrLoadModule(
    "/src/application/problems/updateProblem.ts",
  );
  const problem = { updatedAt: "2026-09-09", sourceUrl: "example" };
  function fixture(overrides = {}) {
    const events = [];
    const ports = {
      confirm: async () => true,
      alert: async (message) => events.push(["alert", message]),
      today: () => ({ year: 2026, month: 8, date: 10 }),
      calendarDay: () => ({ year: 2026, month: 8, date: 9 }),
      collect: async (request) => {
        events.push(["collect", request]);
        return { errorCode: "0000", errorMessage: "" };
      },
      startLoading: () => events.push("start"),
      endLoading: () => events.push("end"),
      reload: () => events.push("reload"),
      ...overrides,
    };
    return { events, ports };
  }
  let f = fixture();
  await updateProblem(undefined, f.ports);
  assert.deepEqual(f.events, []);
  f = fixture({ confirm: async () => false });
  await updateProblem(problem, f.ports);
  assert.deepEqual(f.events, []);
  f = fixture({ calendarDay: () => ({ year: 2026, month: 8, date: 10 }) });
  await updateProblem(problem, f.ports);
  assert.deepEqual(f.events, [
    [
      "alert",
      "금일 해당 문제의 업데이트가 이미 수행되었습니다. 다음 날 다시 요청해주세요",
    ],
  ]);
  f = fixture({
    confirm: async () => {
      throw new Error("confirm failed");
    },
  });
  await updateProblem(problem, f.ports);
  assert.deepEqual(f.events, [
    ["alert", "문제를 업데이트하지 못했습니다. 잠시 후 다시 시도해 주세요."],
  ]);
  f = fixture();
  await updateProblem(problem, f.ports);
  assert.deepEqual(f.events, [
    "start",
    ["collect", { url: "example" }],
    "reload",
    "end",
  ]);
  f = fixture({
    collect: async () => ({
      errorCode: "FAIL",
      errorMessage: "SQL constraint failed: problem_source_id_key",
    }),
  });
  await updateProblem(problem, f.ports);
  assert.deepEqual(f.events, [
    "start",
    ["alert", "문제를 업데이트하지 못했습니다. 잠시 후 다시 시도해 주세요."],
    "end",
  ]);
  f = fixture({
    collect: async () => {
      throw new Error("network");
    },
  });
  await updateProblem(problem, f.ports);
  assert.deepEqual(f.events, [
    "start",
    ["alert", "문제를 업데이트하지 못했습니다. 잠시 후 다시 시도해 주세요."],
    "end",
  ]);
  console.log(
    "PASS: 문제 갱신 없음/취소/확인 오류/당일 제한/성공/업무 오류/통신 오류의 로딩 균형",
  );
} finally {
  await server.close();
}
