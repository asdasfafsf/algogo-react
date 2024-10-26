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
  output: ResponseExecuteResult,
  setOutput: (output: ResponseExecuteResult) => void | Promise<void>
};

export const useCodeEditorStore = create<EditorStore>((set) => ({
  code: defaultCodeFromLanguage['C++'],
  setCode: (code: string) => set({ code }),
  language: 'C++' as Language,
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
  output: {
    seq: 0,
    processTime: 0,
    memory: 0,
    code: '',
    result: '',
  },
  setOutput: (output: ResponseExecuteResult) => set({ output }),
}));

export default useCodeEditorStore;
