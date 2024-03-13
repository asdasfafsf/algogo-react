import { create } from 'zustand';
import { createSelectors } from './selector';

type CodeResultHeight = {
  codeResultHeight: number;
  setCodeResultHeight: (height: number) => void;
};

export const useCodeResultHeightStore = create<CodeResultHeight>((set) => ({
  codeResultHeight: 600,
  setCodeResultHeight: (height: number) => set(() => ({ codeResultHeight: height })),
}));

export const ProblemWidthSelectors = createSelectors(useCodeResultHeightStore);
