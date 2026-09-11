import assert from "node:assert/strict";
import fs from "node:fs/promises";

const [page, basicInfo, oauthCard, fixture] = await Promise.all([
  fs.readFile(new URL("../src/page/My.tsx", import.meta.url), "utf8"),
  fs.readFile(
    new URL("../src/components/me/BasicMyInfo.tsx", import.meta.url),
    "utf8",
  ),
  fs.readFile(
    new URL("../src/components/me/OAuthCard.tsx", import.meta.url),
    "utf8",
  ),
  fs.readFile(new URL("./fixtures/my-profile.tsx", import.meta.url), "utf8"),
]);

assert.match(page, /<BasicMyInfo \/>/);
assert.match(page, /<OAuthConnectedInfo \/>/);
assert.doesNotMatch(
  page,
  /StatsCards|ContributionGraph|RecentActivity|ExternalConnectedInfo/,
);
assert.doesNotMatch(basicInfo, /bg-linear-to|ShieldCheck|로그인 확인된 계정/);
assert.doesNotMatch(oauthCard, /CheckCircle2|emerald-/);
assert.match(oauthCard, /연결 해제 중/);
assert.match(oauthCard, /계정 연결/);
assert.match(fixture, /fixture@example\.invalid/);
assert.match(fixture, /<My key=\{mode\} \/>/);
assert.match(fixture, /pendingAction=\{pending \? "connect" : null\}/);
assert.match(fixture, /불러오기 오류/);

console.log("ALGOGO-119 my profile regression tests passed");
