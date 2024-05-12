import { create } from 'zustand';
import { createSelectors } from './selector';

type ProblemTableFilterStore = {
  problemWidth: number;
  setProblemWidth: (width: number) => void;
};

export const useProblemTableFilterStore = create<ProblemTableFilterStore>((set) => ({
  problemWidth: [],
  setProblemWidth: (width: number) => set(() => ({ problemWidth: width })),
}));

export const ProblemWidthSelectors = createSelectors(useProblemTableFilterStore);
export default useProblemTableFilterStore;
