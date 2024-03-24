import { create } from 'zustand';
import { createSelectors } from './selector';

type TestCaseListStore = {
  testCaseList: TestCase[],
  setTestCaseList: (testCaseList: TestCase[]) => void;
};

export const useProblemWidthStore = create<ProblemWidthStore>((set) => ({
  problemWidth: 500,
  setProblemWidth: (width: number) => set(() => ({ problemWidth: width })),
}));

export const ProblemWidthSelectors = createSelectors(useProblemWidthStore);
export default useProblemWidthStore;
