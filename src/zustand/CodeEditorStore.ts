import { create } from 'zustand';
import {
  getSetting, getTemplates, loadCode, saveCode, setSetting,
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
  templates: ResponseTemplates,
  setTemplates: (updator: Updater<ResponseTemplates>) => void | Promise<void>
  setSettings: (updator: Updater<CodeEditorSettings>) => void | Promise<void>
  updateCode: () => Promise<ApiResponse<null>> | ApiResponse<null>
  updateSetting: (data: RequestSetting
  & { saveToServer: boolean }) => void | Promise<void>,
  loadSetting: () => Promise<ApiResponse<ResponseSetting>> | ApiResponse<ResponseSetting>,
  loadTemplates: () =>
  Promise<ApiResponse<ResponseTemplates>>
  | ApiResponse<ResponseTemplates>,
  setCodeFromTemplate: () => void | Promise<void>
  initialize: () => Promise<void>
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
    const code = codeFromLanguage[language];
    set({ language, code });
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
    detail: '',
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
  templates: {
    defaultList: [],
    summaryList: [],
  },
  setTemplates: (updator) => {
    if (typeof updator === 'function') {
      set((state) => ({
        templates: (updator(state.templates)) as ResponseTemplates,
      }));
    } else {
      set({ templates: updator });
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
  loadTemplates: async () => {
    const response = await getTemplates();
    if (response.statusCode === 200) {
      set({ templates: response.data });
    }
    return response;
  },
  setCodeFromTemplate: () => {
    const { templates, setCode, language } = get();
    const template = templates.defaultList.find((template) => template.language === language);
    if (template) {
      setCode(template.content);
    }
  },

  initialize: async () => {
    const problemUuid = location.pathname.split('/')[2];
    const settingResponse = await getSetting();

    let initLanguage: Language = 'C++';

    if (settingResponse.statusCode === 200) {
      set({ settings: settingResponse.data });
      initLanguage = settingResponse.data.defaultLanguage;
    }

    const templatesResponse = await getTemplates();
    if (templatesResponse.statusCode === 200) {
      set({ templates: templatesResponse.data });
    }

    const defaultTemplate = templatesResponse
      .data.defaultList
      .find((template) => template.language === initLanguage);

    const codeResponse = await loadCode(problemUuid, initLanguage);

    if (codeResponse.statusCode === 200) {
      const codeList = codeResponse.data;
      const codeMap: Record<Language, string> = { ...defaultCodeFromLanguage };
      codeList.forEach(({ language, content }) => {
        codeMap[language] = content;
      });

      set({
        language: initLanguage,
        code: codeMap[initLanguage],
        codeFromLanguage: { ...codeMap },
      });
    }

    if (defaultTemplate
        && (codeResponse.statusCode !== 200
          || codeResponse.data.length === 0
          || !codeResponse.data.find((code) => code.language === initLanguage))) {
      set({
        language: initLanguage,
        code: defaultTemplate.content,
        codeFromLanguage: {
          ...defaultCodeFromLanguage,
          [initLanguage]: defaultTemplate.content,
        },
      });
    }
  },
}));

export default useCodeEditorStore;
