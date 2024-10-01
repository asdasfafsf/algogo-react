import { create } from 'zustand';
import * as defaultCodeFromLanguage from '../constant/Code';

type CodeFromLanguage = {
  [key in MonacoEditorLanguage]: string
};

type EditorStore = {
  language: MonacoEditorLanguage;
  setLanguage: (language: MonacoEditorLanguage) => void | Promise<void>
  code: string
  setCode: (code: string) => void | Promise<void>
  codeFromLanguage: CodeFromLanguage
  updateCodeFromLanguage: (languge: MonacoEditorLanguage, code: string) => void | Promise<void>
  input: string,
  setInput: (input: string) => void | Promise<void>
  output: string,
  setOutput: (output: string) => void | Promise<void>
};

export const useCodeEditorStore = create<EditorStore>((set) => ({
  code: defaultCodeFromLanguage.cpp,
  setCode: (code: string) => set({ code }),
  language: 'cpp',
  setLanguage: (language: MonacoEditorLanguage) => set({ language }),
  codeFromLanguage: { ...defaultCodeFromLanguage },
  updateCodeFromLanguage: (languge, code) => set((state) => {
    const { codeFromLanguage } = state;
    codeFromLanguage[languge] = code;
    return state;
  }),
  input: '',
  setInput: (input: string) => set({ input }),
  output: '',
  setOutput: (output: string) => set({ output }),
}));

export default useCodeEditorStore;
