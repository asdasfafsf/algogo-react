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

test("성공 GlobalResponse의 data를 실행 결과로 푼다", () => {
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
  assert.equal(result.result, "예외 오류");
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

test("인증 만료 오류를 성공 결과로 바꾸지 않는다", () => {
  const result = decodeExecuteResult({
    errorCode: "JWT_EXPIRED",
    errorMessage: "인증이 만료되었습니다.",
    data: { code: "0000", result: "성공" },
  });

  assert.equal(result.code, "JWT_EXPIRED");
  assert.equal(result.result, "인증이 만료되었습니다.");
});

test("부적합한 payload는 실행 오류로 변환한다", () => {
  const result = decodeExecuteResult({ errorCode: "0000", data: null });

  assert.equal(result.code, "9999");
  assert.match(result.result, /형식/);
});
