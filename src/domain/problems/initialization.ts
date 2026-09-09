import type { ProblemInputOutput } from "@/type/Problem.type";

export const createInitialTestCaseList = (
  inputOutputList: readonly ProblemInputOutput[],
): TestCase[] =>
  inputOutputList.map(({ input, output }) => ({
    input,
    output: "",
    expected: output,
    readOnly: true,
    state: "실행 전",
  }));

export const createInitialExecuteResultList = (
  inputOutputList: readonly ProblemInputOutput[],
): ExecuteResult[] =>
  inputOutputList.map(({ input, output }) => ({
    input,
    output: "",
    expected: output,
    state: "실행 전",
  }));
