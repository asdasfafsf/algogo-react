import assert from "node:assert/strict";
import fs from "node:fs/promises";

const [page, basicInfo, oauthCard, fixture, myInfo, meStore] =
  await Promise.all([
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
    fs.readFile(
      new URL("../src/hook/me/useMyInfo.ts", import.meta.url),
      "utf8",
    ),
    fs.readFile(new URL("../src/zustand/MeStore.ts", import.meta.url), "utf8"),
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
assert.match(fixture, /저장 실패 상태/);
assert.match(fixture, /fixture 프로필 상태/);
assert.doesNotMatch(myInfo, /res\.errorMessage/);
assert.match(myInfo, /profileSaveOutcome/);
assert.doesNotMatch(meStore, /response\.errorMessage/);
assert.match(meStore, /AccountSessionError/);

console.log("ALGOGO-119 my profile regression tests passed");
