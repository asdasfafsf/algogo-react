export const createTestCase = (): TestCase => ({
  input: "",
  output: "",
  expected: "",
  state: "실행 전",
  readOnly: false,
});

export const addTestCase = (testCases: readonly TestCase[]): TestCase[] => [
  ...testCases.map((testCase) => ({ ...testCase })),
  createTestCase(),
];

export const removeTestCase = (
  testCases: readonly TestCase[],
  index: number,
): TestCase[] =>
  testCases.filter((_testCase, testCaseIndex) => index !== testCaseIndex);

export const updateTestCase = (
  testCases: readonly TestCase[],
  index: number,
  changes: Pick<Partial<TestCase>, "input" | "expected">,
): TestCase[] =>
  testCases.map((testCase, testCaseIndex) =>
    testCaseIndex === index
      ? { ...testCase, ...changes, state: "실행 전" }
      : { ...testCase },
  );

export const markTestCasesRunning = (
  testCases: readonly TestCase[],
): TestCase[] =>
  testCases.map((testCase) => ({ ...testCase, state: "실행 중" }));

const formatExecutionResult = (result: ResponseExecuteResult) =>
  [result.result, result.detail].filter(Boolean).join("\n");

export const applyCompilationError = (
  testCases: readonly TestCase[],
  result: ResponseExecuteResult,
): TestCase[] =>
  result.code === "9002"
    ? testCases.map((testCase) => ({
        ...testCase,
        state: "실패",
        output: formatExecutionResult(result),
      }))
    : testCases.map((testCase) => ({ ...testCase }));

export const applyTestCaseResult = (
  testCases: readonly TestCase[],
  result: ResponseExecuteResult,
): TestCase[] =>
  testCases.map((testCase, index) =>
    index === result.seq
      ? {
          ...testCase,
          output: formatExecutionResult(result),
          state:
            result.code !== "0000"
              ? "실패"
              : testCase.expected?.trim() === result.result?.trim()
                ? "일치"
                : "불일치",
        }
      : { ...testCase },
  );

export const summarizeTestCases = (testCases: readonly TestCase[]) => ({
  success: testCases.filter((testCase) => testCase.state === "일치").length,
  failure: testCases.filter(
    (testCase) => testCase.state === "불일치" || testCase.state === "실패",
  ).length,
  running: testCases.filter((testCase) => testCase.state === "실행 중").length,
});
