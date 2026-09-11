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

const request = {
  code: "print(1)",
  provider: "Python",
  inputList: [{ seq: 0, input: "" }],
};

try {
  const [workflow, errors] = await Promise.all([
    server.ssrLoadModule("/src/application/editor/execute.ts"),
    server.ssrLoadModule("/src/domain/execute/error.ts"),
  ]);

  test("최초 연결에서 만료가 확인되면 인증 갱신 후 다시 연결한다", async () => {
    const events = [];
    let connectCount = 0;

    const result = await workflow.executeWithAuthenticationRetry(
      "DISCONNECTED",
      () => request,
      {
        connect: async () => {
          connectCount += 1;
          events.push(`connect:${connectCount}`);
          return connectCount === 1 ? "JWT_EXPIRED" : "WAITING";
        },
        refreshAuthentication: async () => events.push("refresh"),
        subscribe: (retry) => events.push(`subscribe:${retry}`),
        run: async () => ({ code: "0000", result: "ok" }),
      },
      () => events.push("ready"),
    );

    assert.equal(result.code, "0000");
    assert.deepEqual(events, [
      "connect:1",
      "refresh",
      "connect:2",
      "ready",
      "subscribe:false",
    ]);
  });

  test("인증 실패 시 실행 준비나 요청을 성공처럼 진행하지 않는다", async () => {
    const events = [];

    await assert.rejects(
      workflow.executeWithAuthenticationRetry(
        "AUTH_FAILED",
        () => request,
        {
          connect: async () => {
            events.push("connect");
            throw new errors.ExecuteSocketError(
              "JWT_INVALID",
              "유효하지 않은 토큰입니다.",
            );
          },
          refreshAuthentication: async () => events.push("refresh"),
          subscribe: () => events.push("subscribe"),
          run: async () => {
            events.push("run");
            return { code: "0000" };
          },
        },
        () => events.push("ready"),
      ),
      (error) => {
        assert.equal(error.code, "JWT_INVALID");
        return true;
      },
    );
    assert.deepEqual(events, ["connect"]);
  });

  test("실행 ACK의 JWT_EXPIRED는 한 번 갱신하고 동일 요청을 재시도한다", async () => {
    const events = [];
    let runCount = 0;

    const result = await workflow.executeWithAuthenticationRetry(
      "WAITING",
      () => request,
      {
        connect: async () => {
          events.push("connect");
          return "WAITING";
        },
        refreshAuthentication: async () => events.push("refresh"),
        subscribe: (retry) => events.push(`subscribe:${retry}`),
        run: async (receivedRequest) => {
          assert.equal(receivedRequest, request);
          runCount += 1;
          events.push(`run:${runCount}`);
          return {
            code: runCount === 1 ? "JWT_EXPIRED" : "0000",
            result: "",
          };
        },
      },
    );

    assert.equal(result.code, "0000");
    assert.deepEqual(events, [
      "subscribe:false",
      "run:1",
      "refresh",
      "connect",
      "subscribe:true",
      "run:2",
    ]);
  });

  test("전송 오류를 화면용 실패 결과로 바꾸되 성공 코드를 만들지 않는다", () => {
    const result = errors.toExecutionFailureResult(
      new errors.ExecuteSocketError(
        errors.EXECUTE_SOCKET_ERROR_CODE.ackTimeout,
        "코드 실행 서버가 요청에 응답하지 않았습니다.",
      ),
    );

    assert.equal(result.code, "SOCKET_ACK_TIMEOUT");
    assert.equal(
      result.result,
      "코드 실행 서버의 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.",
    );
    assert.notEqual(result.code, "0000");
  });

  test("예상하지 못한 예외의 내부 원문을 화면에 노출하지 않는다", () => {
    const result = errors.toExecutionFailureResult(
      new Error("ECONNREFUSED 10.0.0.7:3002"),
    );

    assert.equal(result.code, errors.EXECUTE_SOCKET_ERROR_CODE.unknown);
    assert.equal(
      result.result,
      "코드를 실행하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
    assert.doesNotMatch(result.result, /ECONNREFUSED|10\.0\.0\.7/);
  });

  test("인증 갱신 중 들어온 동시 실행도 거부한다", async () => {
    let finishRefresh;
    const refresh = new Promise((resolve) => {
      finishRefresh = resolve;
    });
    const ports = {
      connect: async () => "WAITING",
      refreshAuthentication: () => refresh,
      subscribe: () => undefined,
      run: async () => ({ code: "0000", result: "" }),
    };

    const first = workflow.executeWithAuthenticationRetry(
      "JWT_EXPIRED",
      () => request,
      ports,
    );
    await assert.rejects(
      workflow.executeWithAuthenticationRetry(
        "DISCONNECTED",
        () => request,
        ports,
      ),
      (error) => {
        assert.equal(error.code, errors.EXECUTE_SOCKET_ERROR_CODE.busy);
        return true;
      },
    );

    finishRefresh();
    assert.equal((await first).code, "0000");
  });
} finally {
  await server.close();
}
