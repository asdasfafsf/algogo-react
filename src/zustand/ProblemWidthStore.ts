import { create } from "zustand";

type ProblemWidthStore = {
  problemWidth: number;
  setProblemWidth: (width: number) => void;
};

export const useProblemWidthStore = create<ProblemWidthStore>((set) => ({
  problemWidth: 500,
  setProblemWidth: (width: number) => set(() => ({ problemWidth: width })),
}));

export default useProblemWidthStore;
