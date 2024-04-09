import { create } from 'zustand';
import { createSelectors } from './selector';

type TestCaseListStore = {
  testCaseList: TestCase[],
  setTestCaseList: (testCaseList: TestCase[]) => void;
};

export const useTestCaseListStore = create<TestCaseListStore>((set) => ({
  testCaseList: [],
  setTestCaseList: (newTestCaseList) => set(() => ({ testCaseList: newTestCaseList })),
}));

export const ProblemWidthSelectors = createSelectors(useTestCaseListStore);
export default useTestCaseListStore;
