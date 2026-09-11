import assert from "node:assert/strict";
import fs from "node:fs/promises";

const fixture = await fs.readFile(
  new URL("./fixtures/page-states.tsx", import.meta.url),
  "utf8",
);
const [pageState, notFound, error, my, oauthStatus] = await Promise.all([
  fs.readFile(
    new URL("../src/components/page-state/PageState.tsx", import.meta.url),
    "utf8",
  ),
  fs.readFile(new URL("../src/page/NotFound.tsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/page/Error.tsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/page/My.tsx", import.meta.url), "utf8"),
  fs.readFile(
    new URL("../src/components/me/OAuthCallbackStatus.tsx", import.meta.url),
    "utf8",
  ),
]);

assert.match(fixture, /<My \/>/);
assert.match(fixture, /<OAuthCallbackStatus/);
assert.match(pageState, /fullScreen \? "min-h-dvh" : "min-h-\[65dvh\]"/);
assert.doesNotMatch(pageState, /terminal|algogo recover|font-mono/);
assert.match(notFound, /찾는 페이지가 없어요/);
assert.match(error, /잠시 문제가 생겼어요/);
assert.doesNotMatch(error, /URLSearchParams|detail=\{message\}/);
assert.match(my, /로그인이 필요해요/);
assert.match(my, /destination=%2Fme/);
assert.match(oauthStatus, /role="status"/);
assert.doesNotMatch(oauthStatus, /rounded-full|blur-3xl|ShieldCheck/);

console.log("ALGOGO-112 page state tests passed");
