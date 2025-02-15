import { create } from 'zustand';
import {
  getSetting, loadCode, saveCode, setSetting,
} from '@api/code';
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
  settings: CodeEditorSettings,
  setSettings: (updator: Updater<CodeEditorSettings>) => void | Promise<void>
  updateCode: () => Promise<ApiResponse<null>> | ApiResponse<null>
  loadCode: () => Promise<ApiResponse<ResponseCode>> | ApiResponse<ResponseCode>
  updateSetting: (data: RequestSetting
  & { saveToServer: boolean }) => void | Promise<void>,
  loadSetting: () => Promise<ApiResponse<ResponseSetting>> | ApiResponse<ResponseSetting>,
}
;

export const useCodeEditorStore = create<EditorStore>((set, get) => ({
  code: defaultCodeFromLanguage['C++'],
  setCode: (code: string) => {
    const { language, codeFromLanguage } = get();
    set({ code, codeFromLanguage: { ...codeFromLanguage, [language]: code } });
  },
  language: 'C++' as Language,
  setLanguage: (language: Language) => {
    const { codeFromLanguage } = get();
    set({ language });
    const code = codeFromLanguage[language];
    set({ code });
  },
  codeFromLanguage: {
    ...defaultCodeFromLanguage,
  },
  updateCodeFromLanguage: (language, code) => set((state) => ({
    codeFromLanguage: {
      ...state.codeFromLanguage,
      [language]: code,
    },
  })),
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
  settings: {
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 4,
    lineNumber: 'on',
    defaultLanguage: 'C++',
  },
  setSettings: (updator) => {
    if (typeof updator === 'function') {
      set((state) => ({
        settings: (updator(state.settings)) as CodeEditorSettings,
      }));
    } else {
      set({ settings: updator });
    }
  },
  updateCode: async () => {
    const problemUuid = location.pathname.split('/')[2];
    const { code, language } = get();
    const response = await saveCode({
      problemUuid,
      content: code,
      language,
    });
    return response;
  },
  loadCode: async () => {
    const problemUuid = location.pathname.split('/')[2];
    const { language } = get();
    const response = await loadCode(problemUuid, language);

    if (response.statusCode === 200) {
      const code = response.data.content;
      set({ code });
    }

    return response;
  },
  updateSetting: async (data: RequestSetting & { saveToServer: boolean }) => {
    const { saveToServer } = data;

    const { setSettings, settings } = get();
    if (saveToServer) {
      await setSetting(data);
    }
    setSettings({ ...settings, ...data });
  },
  loadSetting: async () => {
    const { setLanguage } = get();
    const response = await getSetting();

    if (response.statusCode === 200) {
      const { setSettings } = get();
      const language = response.data.defaultLanguage;
      setLanguage(language);
      setSettings(response.data);
    }

    return response;
  },
}));

export default useCodeEditorStore;
