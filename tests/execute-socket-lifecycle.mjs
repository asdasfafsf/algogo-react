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

class FakeTransport {
  listeners = {
    authentication: new Set(),
    connectError: new Set(),
    disconnect: new Set(),
    executionError: new Set(),
    executionResult: new Set(),
  };

  executionAcknowledgements = [];
  connected = false;
  disconnected = false;
  authenticationToken = undefined;

  connect = () => {
    this.connected = true;
  };

  disconnect = () => {
    this.disconnected = true;
  };

  sendAuthentication = (token) => {
    this.authenticationToken = token;
  };

  sendExecution = (_data, acknowledge) => {
    this.executionAcknowledgements.push(acknowledge);
  };

  onAuthentication = (handler) => {
    this.listeners.authentication.add(handler);
  };

  onConnectError = (handler) => {
    this.listeners.connectError.add(handler);
  };

  onDisconnect = (handler) => {
    this.listeners.disconnect.add(handler);
  };

  onExecutionError = (handler) => {
    this.listeners.executionError.add(handler);
  };

  offExecutionError = (handler) => {
    this.listeners.executionError.delete(handler);
  };

  onExecutionResult = (handler) => {
    this.listeners.executionResult.add(handler);
  };

  offExecutionResult = (handler) => {
    this.listeners.executionResult.delete(handler);
  };

  emit(event, payload) {
    for (const handler of this.listeners[event]) handler(payload);
  }

  acknowledge(index, payload) {
    this.executionAcknowledgements[index](payload);
  }
}

const request = {
  code: "console.log(1)",
  provider: "Node.js",
  inputList: [{ seq: 0, input: "" }],
};

const successResult = {
  seq: 0,
  processTime: 1,
  memory: 2,
  code: "0000",
  result: "1",
  detail: "",
};

try {
  const [{ createExecuteSocketStore }, errorModule] = await Promise.all([
    server.ssrLoadModule("/src/zustand/ExecuteSocketStore.ts"),
    server.ssrLoadModule("/src/domain/execute/error.ts"),
  ]);

  const createFixture = ({ connectTimeoutMs = 50, ackTimeoutMs = 50 } = {}) => {
    const transports = [];
    const store = createExecuteSocketStore({
      createTransport: () => {
        const transport = new FakeTransport();
        transports.push(transport);
        return transport;
      },
      getAccessToken: () => "access-token",
      connectTimeoutMs,
      ackTimeoutMs,
    });

    return { store, transports };
  };

  const authenticate = async (fixture) => {
    const connection = fixture.store.getState().connect();
    const transport = fixture.transports.at(-1);
    transport.emit("authentication", { code: "0000" });
    assert.equal(await connection, "WAITING");
    return transport;
  };

  test("정상 인증 뒤 ACK와 실행 결과를 한 번씩 전달한다", async () => {
    const fixture = createFixture();
    const transport = await authenticate(fixture);
    assert.equal(transport.connected, true);
    assert.equal(transport.authenticationToken, "access-token");

    const pushedResults = [];
    fixture.store.getState().execute((result) => pushedResults.push(result));
    const execution = fixture.store.getState().run(request);
    assert.equal(fixture.store.getState().state, "PENDING");

    transport.acknowledge(0, successResult);
    assert.deepEqual(await execution, successResult);
    assert.equal(fixture.store.getState().state, "WAITING");

    transport.emit("executionResult", successResult);
    assert.deepEqual(pushedResults, [successResult]);
  });

  test("만료 인증은 WAITING으로 덮지 않고 JWT_EXPIRED로 끝낸다", async () => {
    const fixture = createFixture();
    const connection = fixture.store.getState().connect();
    const transport = fixture.transports[0];
    transport.emit("authentication", { code: "JWT_EXPIRED" });

    assert.equal(await connection, "JWT_EXPIRED");
    assert.equal(fixture.store.getState().state, "JWT_EXPIRED");
    assert.equal(fixture.store.getState().socket, null);
    assert.equal(transport.disconnected, true);
  });

  test("JWT_INVALID 인증은 명시적으로 거부한다", async () => {
    const fixture = createFixture();
    const connection = fixture.store.getState().connect();
    fixture.transports[0].emit("authentication", {
      code: "JWT_INVALID",
      errorMessage: "유효하지 않은 토큰입니다.",
    });

    await assert.rejects(connection, (error) => {
      assert.equal(error.code, "JWT_INVALID");
      assert.equal(error.message, "유효하지 않은 토큰입니다.");
      return true;
    });
    assert.equal(fixture.store.getState().state, "AUTH_FAILED");
  });

  test("GlobalResponse 형식의 인증 실패도 명시적으로 거부한다", async () => {
    const fixture = createFixture();
    const connection = fixture.store.getState().connect();
    fixture.transports[0].emit("authentication", {
      errorCode: "JWT_INVALID",
      errorMessage: "인증 실패",
    });

    await assert.rejects(connection, { code: "JWT_INVALID" });
    assert.equal(fixture.store.getState().state, "AUTH_FAILED");
  });

  test("인증 응답이 없으면 연결 제한 시간 뒤 종료한다", async () => {
    const fixture = createFixture({ connectTimeoutMs: 10 });
    const connection = fixture.store.getState().connect();

    await assert.rejects(connection, (error) => {
      assert.equal(
        error.code,
        errorModule.EXECUTE_SOCKET_ERROR_CODE.connectionTimeout,
      );
      return true;
    });
    assert.equal(fixture.store.getState().state, "DISCONNECTED");
    assert.equal(fixture.transports[0].disconnected, true);
  });

  test("실행 중 연결이 끊기면 대기 Promise를 거부한다", async () => {
    const fixture = createFixture();
    const transport = await authenticate(fixture);
    const execution = fixture.store.getState().run(request);

    transport.emit("disconnect", "transport close");

    await assert.rejects(execution, (error) => {
      assert.equal(
        error.code,
        errorModule.EXECUTE_SOCKET_ERROR_CODE.disconnected,
      );
      return true;
    });
    assert.equal(fixture.store.getState().state, "DISCONNECTED");
  });

  test("실행 ACK의 인증 만료는 기존 소켓을 닫고 상태를 보존한다", async () => {
    const fixture = createFixture();
    const transport = await authenticate(fixture);
    const execution = fixture.store.getState().run(request);

    transport.acknowledge(0, {
      errorCode: "JWT_EXPIRED",
      errorMessage: "인증이 만료되었습니다.",
    });

    assert.equal((await execution).code, "JWT_EXPIRED");
    assert.equal(fixture.store.getState().state, "JWT_EXPIRED");
    assert.equal(fixture.store.getState().socket, null);
    assert.equal(transport.disconnected, true);
  });

  test("ACK가 없으면 제한 시간 뒤 실패하고 다시 실행할 수 있다", async () => {
    const fixture = createFixture({ ackTimeoutMs: 10 });
    const transport = await authenticate(fixture);
    const firstExecution = fixture.store.getState().run(request);

    await assert.rejects(firstExecution, (error) => {
      assert.equal(
        error.code,
        errorModule.EXECUTE_SOCKET_ERROR_CODE.ackTimeout,
      );
      return true;
    });
    assert.equal(fixture.store.getState().state, "WAITING");

    const secondExecution = fixture.store.getState().run(request);
    transport.acknowledge(0, successResult);
    assert.equal(fixture.store.getState().state, "PENDING");
    transport.acknowledge(1, successResult);
    assert.deepEqual(await secondExecution, successResult);
  });

  test("동시 실행을 거부하고 첫 실행 완료 뒤 재실행한다", async () => {
    const fixture = createFixture();
    const transport = await authenticate(fixture);
    const firstExecution = fixture.store.getState().run(request);

    await assert.rejects(fixture.store.getState().run(request), (error) => {
      assert.equal(error.code, errorModule.EXECUTE_SOCKET_ERROR_CODE.busy);
      return true;
    });
    transport.acknowledge(0, successResult);
    await firstExecution;

    const secondExecution = fixture.store.getState().run(request);
    transport.acknowledge(1, { ...successResult, result: "2" });
    assert.equal((await secondExecution).result, "2");
  });

  test("실행 결과 구독을 교체해 이전 handler와 중복 호출하지 않는다", async () => {
    const fixture = createFixture();
    const transport = await authenticate(fixture);
    const first = [];
    const second = [];

    fixture.store.getState().execute((result) => first.push(result));
    fixture.store.getState().execute((result) => second.push(result));
    transport.emit("executionResult", successResult);

    assert.equal(transport.listeners.executionResult.size, 1);
    assert.deepEqual(first, []);
    assert.deepEqual(second, [successResult]);
  });

  test("재연결 뒤 이전 소켓의 늦은 결과를 무시한다", async () => {
    const fixture = createFixture();
    const firstTransport = await authenticate(fixture);
    const results = [];
    fixture.store.getState().execute((result) => results.push(result));

    const reconnection = fixture.store.getState().connect();
    const secondTransport = fixture.transports[1];
    secondTransport.emit("authentication", { code: "0000" });
    await reconnection;

    firstTransport.emit("executionResult", successResult);
    assert.deepEqual(results, []);
  });

  test("연결 전 실행과 구독은 즉시 실패한다", async () => {
    const fixture = createFixture();
    await assert.rejects(fixture.store.getState().run(request), (error) => {
      assert.equal(
        error.code,
        errorModule.EXECUTE_SOCKET_ERROR_CODE.unavailable,
      );
      return true;
    });
    assert.throws(
      () => fixture.store.getState().execute(() => undefined),
      (error) => {
        assert.equal(
          error.code,
          errorModule.EXECUTE_SOCKET_ERROR_CODE.unavailable,
        );
        return true;
      },
    );
  });
} finally {
  await server.close();
}
