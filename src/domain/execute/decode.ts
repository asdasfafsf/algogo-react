const INVALID_EXECUTION_RESPONSE = "실행 응답 형식이 올바르지 않습니다.";

type ExecuteResultRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is ExecuteResultRecord =>
  typeof value === "object" && value !== null;

const toOptionalNumber = (value: unknown): number | null =>
  value === undefined || (typeof value === "number" && Number.isFinite(value))
    ? (value ?? 0)
    : null;

const toExecutionResult = (value: unknown): ResponseExecuteResult | null => {
  if (
    !isRecord(value) ||
    typeof value.code !== "string" ||
    typeof value.result !== "string"
  ) {
    return null;
  }

  const seq = toOptionalNumber(value.seq);
  const processTime = toOptionalNumber(value.processTime);
  const memory = toOptionalNumber(value.memory);

  if (seq === null || processTime === null || memory === null) return null;

  return {
    seq,
    processTime,
    memory,
    code: value.code,
    result: value.result,
    detail: typeof value.detail === "string" ? value.detail : "",
  };
};

const failureResult = (
  code: string,
  result: string,
): ResponseExecuteResult => ({
  seq: 0,
  processTime: 0,
  memory: 0,
  code,
  result,
  detail: "",
});

/**
 * 실행 ACK가 평탄한 결과 또는 GlobalResponse로 포장된 결과인지 구분해
 * 화면이 소비하는 실행 결과 형태로 변환한다.
 */
export const decodeExecuteResult = (
  payload: unknown,
): ResponseExecuteResult => {
  const flatResult = toExecutionResult(payload);
  if (flatResult) return flatResult;

  if (!isRecord(payload) || typeof payload.errorCode !== "string") {
    return failureResult("9999", INVALID_EXECUTION_RESPONSE);
  }

  if (payload.errorCode !== "0000") {
    return failureResult(
      payload.errorCode,
      typeof payload.errorMessage === "string" && payload.errorMessage
        ? payload.errorMessage
        : INVALID_EXECUTION_RESPONSE,
    );
  }

  const envelopeResult = toExecutionResult(payload.data);
  return envelopeResult ?? failureResult("9999", INVALID_EXECUTION_RESPONSE);
};
