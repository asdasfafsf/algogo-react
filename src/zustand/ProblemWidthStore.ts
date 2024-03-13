import { create } from 'zustand';
import { createSelectors } from './selector';

type ProblemWidthStore = {
  problemWidth: number;
  setProblemWidth: (width: number) => void;
};

export const useProblemWidthStore = create<ProblemWidthStore>((set) => ({
  problemWidth: 500,
  setProblemWidth: (width: number) => set(() => ({ problemWidth: width })),
}));

export const ProblemWidthSelectors = createSelectors(useProblemWidthStore);
export default useProblemWidthStore;
