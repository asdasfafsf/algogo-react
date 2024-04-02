import { create } from 'zustand';
import { createSelectors } from './selector';

type ProblemScreenStore = {
  selectedIndex: number,
  setSelectedIndex: (selectedInex: number) => void;
};

export const useProblemScreenStore = create<ProblemScreenStore>((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (selectedIndex: number) => set({ selectedIndex }),
}));

export const ProblmeScreenStore = createSelectors(useProblemScreenStore);
export default useProblemScreenStore;
