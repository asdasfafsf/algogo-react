import { create } from 'zustand';
import { defaultCodeFromLanguage } from '../constant/Code';

type Range9To32 = 9 | 10 | 11 | 12 | 13
| 14 | 15 | 16 | 17 | 18 | 19 | 20
| 21 | 22 | 23 | 24 | 25 | 26 | 27
| 28 | 29 | 30 | 31 | 32;

type CodeEditorSettings = {
  fontSize: Range9To32
  theme: 'Light' | 'Dark'
  lineNumer: LineNumber,
  insertSpace: boolean
};

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
  settings: CodeEditorSettings,
  setSettings: (updator: Updater<CodeEditorSettings>) => void | Promise<void>
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
