import { create } from 'zustand';

type ProblemHidden = Record<'제목' | '난이도' | '정답률' | '제출', boolean>

type ProblemTableFilterStore = {
  problemTitle: string;
  problemOptionList: ProblemOption[];
  problemSort: ProblemSort;
  problemHidden: ProblemHidden,
  setProblemTitle: (
    problemSort: string | ((prev: string) => string)) => void;
  setProblemOptionList: (
    problemOptionList: ProblemOption[] | ((prev: ProblemOption[]) => ProblemOption[])) => void;
  setProblemSort: (
    problemSort: ProblemSort | ((prev: ProblemSort) => ProblemSort)) => void;
  setProblemHidden: (
    problemHidden: ProblemHidden | ((prev: ProblemHidden) => ProblemHidden)) => void;
};

export const useProblemTableFilterStore = create<ProblemTableFilterStore>((set) => ({
  problemOptionList: [],
  problemSort: 0 as ProblemSort,
  problemTitle: '',
  problemHidden: {
    '난이도': true,
    '제목': false,
    '제출': false,
    '정답률': false,
  },
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
  setProblemHidden: (problemHidden) => set((state) => ({
    problemHidden: typeof problemHidden === 'function'
      ? problemHidden(state.problemHidden)
      : problemHidden
  }))
}));
