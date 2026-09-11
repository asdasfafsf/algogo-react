import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [main, router, problem, errorBoundary] = await Promise.all([
  readFile(new URL("../src/main.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/Router.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/page/Problem.tsx", import.meta.url), "utf8"),
  readFile(
    new URL("../src/components/errors/ErrorBoundary.tsx", import.meta.url),
    "utf8",
  ),
]);

assert.doesNotMatch(
  main,
  /MonacoLoader/,
  "공통 진입점에서 Monaco를 초기화하면 모든 화면의 초기 번들에 포함된다",
);
assert.doesNotMatch(
  router,
  /^import\s+.+from\s+["']\.\/page\//m,
  "페이지는 라우터에서 정적으로 불러오면 안 된다",
);

const pageImports = router.match(/import\(["']\.\/page\//g) ?? [];
assert.equal(pageImports.length, 13, "모든 페이지를 동적으로 불러와야 한다");

const routePaths = [...router.matchAll(/path:\s*["']([^"']+)["']/g)].map(
  ([, path]) => path,
);
assert.deepEqual(routePaths, [
  "/",
  "/signup",
  "/login",
  "/problem",
  "/problem/today",
  "/problem/:problemUuid",
  "/landing",
  "/me",
  "/oauth/v2/callback/:provider",
  "/oauth/v2/connect/callback/:provider",
  "/oauth/v2/disconnect/callback/:provider",
  "/oauth/token",
  "/error",
  "/*",
]);
assert.doesNotMatch(
  router,
  /\.sort\(/,
  "라우트 선언 순서를 비대칭 비교 함수로 변경하면 안 된다",
);
assert.match(
  router,
  /<Suspense fallback={<RouteLoadingState \/>}>/,
  "지연 로딩 중 사용자에게 상태를 알려야 한다",
);
assert.match(router, /role="status"/);
assert.match(router, /aria-live="polite"/);
assert.match(
  problem,
  /import ["']\.\.\/loader\/MonacoLoader["'];/,
  "문제 풀이 경로가 Monaco 초기화를 소유해야 한다",
);
assert.doesNotMatch(
  errorBoundary,
  /@\/page\/Error/,
  "전역 오류 경계가 지연 로딩할 오류 페이지를 정적으로 참조하면 안 된다",
);

console.log("ALGOGO-135 route code splitting tests passed");
