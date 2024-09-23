import { create } from 'zustand';

type ProblemTableFilterStore = {
  problemOptionList: ProblemOption[];
  problemSort: ProblemSort;
  problemCurrentPageNo: number;
  setProblemOptionList: (
    problemOptionList: ProblemOption[] | ((prev: ProblemOption[]) => ProblemOption[])) => void;
  setProblemSort: (
    problemSort: ProblemSort | ((prev: ProblemSort) => ProblemSort)) => void;

};

export const useProblemTableFilterStore = create<ProblemTableFilterStore>((set) => ({
  problemOptionList: [],
  problemCurrentPageNo: 1,
  problemSort: {
    name: '',
    value: 1,
  } as ProblemSort,
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
}));

export default useProblemTableFilterStore;
