import { create } from "zustand";
import {
  applyCompilationError,
  applyTestCaseResult,
  markTestCasesRunning,
} from "@/domain/editor/testCases";

type TestCaseListStore = {
  testCaseList: TestCase[];
  setTestCaseList: (testCaseList: TestCase[]) => void;
  setRunning: () => void;
  handleRun: (executeResult: ResponseExecuteResult) => void;
  handleExecute: (executeResult: ResponseExecuteResult) => void;
};

export const useTestCaseListStore = create<TestCaseListStore>((set, get) => ({
  testCaseList: [],
  setTestCaseList: (testCaseList) => set(() => ({ testCaseList })),
  setRunning: () => {
    set({ testCaseList: markTestCasesRunning(get().testCaseList) });
  },
  handleRun: (executeResult) => {
    if (executeResult.code === "9002") {
      set({
        testCaseList: applyCompilationError(get().testCaseList, executeResult),
      });
    }
  },
  handleExecute: (executeResult) => {
    set({
      testCaseList: applyTestCaseResult(get().testCaseList, executeResult),
    });
  },
}));

export default useTestCaseListStore;
