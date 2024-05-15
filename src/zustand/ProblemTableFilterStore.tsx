import { create } from 'zustand';
import { createSelectors } from './selector';

type ProblemTableFilterStore = {
  problemOptionList: ProblemOption[];
  setProblemOptionList: (
    problemOptionList: ProblemOption[] | ((prev: ProblemOption[]) => ProblemOption[])) => void;
};

export const useProblemTableFilterStore = create<ProblemTableFilterStore>((set) => ({
  problemOptionList: [],
  setProblemOptionList: (problemOptionList) => set((state) => ({
    problemOptionList: typeof problemOptionList === 'function'
      ? problemOptionList(state.problemOptionList)
      : problemOptionList,
  })),
}));

export const ProblemWidthSelectors = createSelectors(useProblemTableFilterStore);
export default useProblemTableFilterStore;
