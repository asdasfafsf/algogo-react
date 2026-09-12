import assert from "node:assert/strict";
import test from "node:test";
import { decodeExecuteResult } from "../src/domain/execute/decode.ts";

test("평탄한 실행 결과를 유지한다", () => {
  const result = decodeExecuteResult({
    seq: 1,
    processTime: 12,
    memory: 64,
    code: "0000",
    result: "hello",
    detail: "",
  });

  assert.deepEqual(result, {
    seq: 1,
    processTime: 12,
    memory: 64,
    code: "0000",
    result: "hello",
    detail: "",
  });
});

test("런타임 오류의 사용자 확인용 stderr를 유지한다", () => {
  const result = decodeExecuteResult({
    seq: 0,
    processTime: 3,
    memory: 32,
    code: "9001",
    result: "Traceback: ZeroDivisionError",
    detail: "line 1",
  });

  assert.equal(result.result, "Traceback: ZeroDivisionError");
  assert.equal(result.detail, "line 1");
});

test("성공 GlobalResponse 안의 서비스 예외를 사용자 안내로 변환한다", () => {
  const result = decodeExecuteResult({
    errorCode: "0000",
    errorMessage: "",
    data: {
      processTime: 0,
      memory: 0,
      code: "9999",
      result: "예외 오류",
    },
  });

  assert.equal(result.code, "9999");
  assert.equal(
    result.result,
    "코드를 실행하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );
});

test("컴파일 오류 코드 9002를 보존한다", () => {
  const result = decodeExecuteResult({
    errorCode: "0000",
    errorMessage: "",
    data: { code: "9002", result: "컴파일 오류" },
  });

  assert.equal(result.code, "9002");
  assert.equal(result.result, "컴파일 오류");
});

test("컴파일 오류의 진단 결과를 유지한다", () => {
  const result = decodeExecuteResult({
    errorCode: "0000",
    errorMessage: "",
    data: {
      code: "9002",
      result: "Main.java:3: error: ';' expected",
      detail: "javac exited with code 1",
    },
  });

  assert.equal(result.result, "Main.java:3: error: ';' expected");
  assert.equal(result.detail, "javac exited with code 1");
});

test("인증 만료 오류는 서버 원문 대신 로그인 안내로 변환한다", () => {
  const result = decodeExecuteResult({
    errorCode: "JWT_EXPIRED",
    errorMessage: "JsonWebTokenError: jwt expired at 2026-09-09T00:00:00Z",
    data: { code: "0000", result: "성공" },
  });

  assert.equal(result.code, "JWT_EXPIRED");
  assert.equal(
    result.result,
    "로그인 정보를 확인할 수 없습니다. 다시 로그인해 주세요.",
  );
  assert.doesNotMatch(result.result, /JsonWebTokenError|jwt expired/);
});

test("부적합한 payload는 개발자 문구 없는 실행 안내로 변환한다", () => {
  const result = decodeExecuteResult({ errorCode: "0000", data: null });

  assert.equal(result.code, "9999");
  assert.equal(
    result.result,
    "코드를 실행하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );
});

test("평탄한 서비스 오류도 내부 원문과 세부 정보를 숨긴다", () => {
  const result = decodeExecuteResult({
    code: "9999",
    result: "TypeError: Cannot read properties of undefined",
    detail: "/app/dist/executor.js:83:19",
  });

  assert.equal(
    result.result,
    "코드를 실행하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );
  assert.equal(
    result.detail,
    "문제가 계속되면 잠시 후 페이지를 새로고침해 다시 시도해 주세요.",
  );
  assert.doesNotMatch(
    `${result.result}\n${result.detail}`,
    /TypeError|Cannot read properties|\/app\/dist|executor\.js/,
  );
});
