import { create } from 'zustand';
import { createSelectors } from './selector';

type CodeEditorHeight = {
  codeEditorHeight: number;
  setCodeEditorHeight: (height: number) => void;
};

export const useCodeEditorHeightStore = create<CodeEditorHeight>((set) => ({
  codeEditorHeight: 500,
  setCodeEditorHeight: (height: number) => set(() => ({ codeEditorHeight: height })),
}));

export const ProblemWidthSelectors = createSelectors(useCodeEditorHeightStore);
