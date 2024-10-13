import { create } from 'zustand';
import { defaultCodeFromLanguage } from '../constant/Code';

type EditorStore = {
  language: Language;
  setLanguage: (language: Language) => void | Promise<void>
  code: string
  setCode: (code: string) => void | Promise<void>
  codeFromLanguage: CodeFromLanguage
  updateCodeFromLanguage: (languge: Language, code: string) => void | Promise<void>
  input: string,
  setInput: (input: string) => void | Promise<void>
  output: string,
  setOutput: (output: string) => void | Promise<void>
};

export const useCodeEditorStore = create<EditorStore>((set) => ({
  code: defaultCodeFromLanguage['C++'],
  setCode: (code: string) => set({ code }),
  language: 'C++',
  setLanguage: (language: Language) => set({ language }),
  codeFromLanguage: {
    ...defaultCodeFromLanguage,
  },
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
