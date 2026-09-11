import { create } from "zustand";

type CodeEditorHeight = {
  codeEditorHeight: number;
  setCodeEditorHeight: (height: number) => void;
};

export const useCodeEditorHeightStore = create<CodeEditorHeight>((set) => ({
  codeEditorHeight: 500,
  setCodeEditorHeight: (height: number) =>
    set(() => ({ codeEditorHeight: height })),
}));
