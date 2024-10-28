import { create } from 'zustand';
import { createSelectors } from './selector';

type ProblemTableFilterStore = {
  problemTitle: string;
  problemOptionList: ProblemOption[];
  problemSort: ProblemSort;
  setProblemTitle: (
    problemSort: string | ((prev: string) => string)) => void;
  setProblemOptionList: (
    problemOptionList: ProblemOption[] | ((prev: ProblemOption[]) => ProblemOption[])) => void;
  setProblemSort: (
    problemSort: ProblemSort | ((prev: ProblemSort) => ProblemSort)) => void;
};

export const useProblemTableFilterStore = create<ProblemTableFilterStore>((set) => ({
  problemOptionList: [],
  problemSort: {
    name: '',
    value: 1,
  } as ProblemSort,
  problemTitle: '',
  setProblemOptionList: (problemOptionList) => set((state) => ({
    problemOptionList: typeof problemOptionList === 'function'
      ? problemOptionList(state.problemOptionList)
      : problemOptionList,
  })),
  setProblemSort: (problemSort) => set((state) => ({
    problemSort: typeof problemSort === 'function'
      ? problemSort(state.problemSort)
      : problemSort,
  })),
  setProblemTitle: (problemTitle) => set((state) => ({
    problemTitle: typeof problemTitle === 'function'
      ? problemTitle(state.problemTitle)
      : problemTitle,
  })),
}));

export const ProblemTableFilterStore = createSelectors(useProblemTableFilterStore);