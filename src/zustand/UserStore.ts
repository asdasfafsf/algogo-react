import { create } from 'zustand';

type UserStore = {
  problemWidth: number;
  setProblemWidth: (width: number) => void;
} | null;

export const useProblemWidthStore = create<UserStore>((set) => ({
  problemWidth: 500,
  setProblemWidth: (width: number) => set(() => ({ problemWidth: width })),
}));

export default useProblemWidthStore;
