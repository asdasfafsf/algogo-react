import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [profile, oauth, contribution, session, callback] = await Promise.all([
    server.ssrLoadModule("/src/domain/account/profile.ts"),
    server.ssrLoadModule("/src/domain/account/oauth.ts"),
    server.ssrLoadModule("/src/domain/account/contribution.ts"),
    server.ssrLoadModule("/src/domain/account/session.ts"),
    server.ssrLoadModule("/src/application/account/oauthCallback.ts"),
  ]);

  const socialList = [
    { provider: "github", content: "octocat" },
    { provider: "instagram", content: "photo" },
  ];
  assert.deepEqual(
    profile.createProfileUpdateRequest("Ada", undefined, socialList).socialList,
    socialList,
  );
  assert.equal(
    profile.selectProfileImageAfterUpdate(
      { errorCode: "0000", data: null },
      "old",
    ),
    "",
  );
  assert.equal(
    profile.selectProfileImageAfterUpdate(
      { errorCode: "FAIL", data: { profilePhoto: "new" } },
      "old",
    ),
    "old",
  );

  assert.equal(oauth.parseOAuthDestination("{bad", "login"), "/");
  assert.equal(oauth.parseOAuthDestination("null", "connect"), "/me");
  assert.equal(
    oauth.parseOAuthDestination('{"destination":"/problems/1"}', "login"),
    "/problems/1",
  );
  assert.equal(
    oauth.createOAuthEntryUrl({
      environment: "development",
      provider: "google",
      destination: "/me",
      action: "connect",
    }),
    "http://localhost:3001/oauth/v2/connect/google?destination=/me",
  );
  assert.match(oauth.disconnectConfirmation(1), /회원 탈퇴/);
  assert.equal(oauth.disconnectConfirmation(2), "연동 취소하시겠습니까?");

  const leapYear = contribution.createCalendarYearData(
    [{ date: "2024-02-29", count: 3 }],
    2024,
  );
  assert.equal(leapYear.length, 366);
  assert.deepEqual(
    leapYear.find((day) => day.date === "2024-02-29"),
    { date: "2024-02-29", count: 3 },
  );
  const today = new Date(2025, 0, 8);
  const recent = contribution.createRecentYearData([], today);
  assert.equal(recent.length, 365);
  assert.equal(recent.at(-1).date, "2025-01-08");
  const weeks = contribution.groupRecentDataByWeeks(recent, today);
  assert.equal(
    weeks.every((week) => week.length === 7),
    true,
  );
  assert.equal(
    contribution.groupYearDataByWeeks(leapYear, 2024).flat().length % 7,
    0,
  );
  assert.deepEqual(
    [-1, 0, 1, 2, 3, 4].map(contribution.contributionLevel),
    [4, 0, 1, 2, 3, 4],
  );

  assert.equal(session.hasStoredSession(""), true);
  assert.equal(session.hasStoredSession(null), false);
  assert.equal(
    session.isBusinessSuccess({ errorCode: "0000", statusCode: 500 }),
    true,
  );
  assert.equal(
    session.isHttpSuccess({ errorCode: "FAIL", statusCode: 200 }),
    true,
  );
  assert.throws(() => session.requireRefreshToken(null), /refreshToken/);

  const stored = [];
  const login = await callback.executeOAuthCallback({
    flow: "login",
    provider: "google",
    code: "code",
    destination: "/target",
    dependencies: {
      request: async () => ({
        errorCode: "0000",
        data: { accessToken: "a", refreshToken: "r" },
      }),
      saveTokens: (tokens) => stored.push(tokens),
      fetchMe: async () => ({ oauthList: [{}] }),
    },
  });
  assert.deepEqual(login, { type: "login-success", destination: "/target" });
  assert.equal(stored.length, 1);
  const deleted = await callback.executeOAuthCallback({
    flow: "disconnect",
    provider: "google",
    code: "code",
    destination: "/me",
    dependencies: {
      request: async () => ({ errorCode: "0000" }),
      fetchMe: async () => ({ oauthList: [] }),
    },
  });
  assert.equal(deleted.type, "account-deleted");
  const failure = await callback.executeOAuthCallback({
    flow: "connect",
    provider: "google",
    code: "code",
    destination: "/me",
    dependencies: {
      request: async () => {
        throw new Error("network");
      },
    },
  });
  assert.deepEqual(failure, oauth.oauthFailure("connect"));

  const legacyCalls = [];
  const legacy = await callback.executeLegacyOAuthCallback({
    destination: "",
    fetchToken: async () => legacyCalls.push("token"),
    fetchMe: async () => legacyCalls.push("me"),
  });
  assert.deepEqual(legacyCalls, ["token", "me"]);
  assert.deepEqual(legacy, { type: "success", destination: "/" });

  console.log("ALGOGO-80 account core tests passed");
} finally {
  await server.close();
}
