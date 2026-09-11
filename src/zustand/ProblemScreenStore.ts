import { create } from "zustand";

type ProblemScreenStore = {
  selectedIndex: number;
  setSelectedIndex: (selectedInex: number) => void;
};

export const useProblemScreenStore = create<ProblemScreenStore>((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (selectedIndex: number) => set({ selectedIndex }),
}));

export default useProblemScreenStore;
