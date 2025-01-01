import { create } from 'zustand';

type ProblemContentSize = 100 | 110 | 120 | 130 | 140 | 150 | 160 | 170 | 180 | 190 | 200;
type ProblemContentSizeStore = {
  size: ProblemContentSize,
  setSize: (updator: Updater<ProblemContentSize>) => void
};

export const useProblemContentSizeStore = create<ProblemContentSizeStore>((set) => ({
  size: 100,
  setSize: (updator) => {
    if (typeof updator === 'function') {
      set((state) => (
        { size: (updator as (prev: ProblemContentSize) => ProblemContentSize)(state.size) }
      ));
    } else {
      set({ size: updator });
    }
  },
}));
