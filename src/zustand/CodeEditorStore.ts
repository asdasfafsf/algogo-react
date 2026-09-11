import { create } from "zustand";
import {
  getSetting,
  getTemplates,
  loadCode,
  saveCode,
  setSetting,
} from "@api/code";
import { defaultCodeFromLanguage } from "../constant/Code";
import {
  editorCodeStorageKey,
  selectInitialCode,
} from "@/domain/editor/persistence";
import {
  decideTemplateInitialization,
  isResponseTemplates,
  templateRequestFailed,
} from "@/domain/editor/templateInitialization";
import type { TemplateInitializationDecision } from "@/domain/editor/templateInitialization";
import {
  mergeEditorSettings,
  selectEditorLanguage,
  setEditorCode,
} from "@/domain/editor/state";
import {
  classifyCodeSaveResponse,
  codeSaveRequestFailed,
} from "@/domain/editor/codeSave";
import type { CodeSaveResult } from "@/domain/editor/codeSave";

type EditorStore = {
  language: Language;
  setLanguage: (language: Language) => void | Promise<void>;
  code: string;
  setCode: (code: string) => void | Promise<void>;
  codeFromLanguage: CodeFromLanguage;
  updateCodeFromLanguage: (
    languge: Language,
    code: string,
  ) => void | Promise<void>;
  input: string;
  setInput: (input: string) => void | Promise<void>;
  output: ResponseExecuteResult;
  setOutput: (output: ResponseExecuteResult) => void | Promise<void>;
  settings: CodeEditorSettings;
  templates: ResponseTemplates;
  setTemplates: (updator: Updater<ResponseTemplates>) => void | Promise<void>;
  setSettings: (updator: Updater<CodeEditorSettings>) => void | Promise<void>;
  updateCode: (problemUuid: string) => Promise<CodeSaveResult>;
  updateSetting: (
    data: RequestSetting & { saveToServer: boolean },
  ) => void | Promise<void>;
  loadSetting: () =>
    Promise<ApiResponse<ResponseSetting>> | ApiResponse<ResponseSetting>;
  loadTemplates: () =>
    Promise<ApiResponse<ResponseTemplates>> | ApiResponse<ResponseTemplates>;
  setCodeFromTemplate: () => void | Promise<void>;
  initialize: (problemUuid: string) => Promise<EditorInitializationResult>;
};

type EditorInitializationResult =
  | TemplateInitializationDecision
  | { type: "setting-request-failed" }
  | { type: "code-request-failed" };

export const useCodeEditorStore = create<EditorStore>((set, get) => ({
  code: defaultCodeFromLanguage["C++"],
  setCode: (code: string) => {
    const { language, codeFromLanguage } = get();
    set(setEditorCode(codeFromLanguage, language, code));
  },
  language: "C++" as Language,
  setLanguage: (language: Language) => {
    const { codeFromLanguage } = get();
    set(selectEditorLanguage(codeFromLanguage, language));
  },
  codeFromLanguage: {
    ...defaultCodeFromLanguage,
  },
  updateCodeFromLanguage: (language, code) =>
    set((state) => ({
      codeFromLanguage: {
        ...state.codeFromLanguage,
        [language]: code,
      },
    })),
  input: "",
  setInput: (input: string) => set({ input }),
  output: {
    seq: 0,
    processTime: 0,
    memory: 0,
    code: "",
    result: "",
    detail: "",
  },
  setOutput: (output: ResponseExecuteResult) => set({ output }),
  settings: {
    theme: "vs-dark",
    fontSize: 14,
    tabSize: 4,
    lineNumber: "on",
    defaultLanguage: "C++",
  },

  setSettings: (updator) => {
    if (typeof updator === "function") {
      set((state) => ({
        settings: updator(state.settings) as CodeEditorSettings,
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
    if (typeof updator === "function") {
      set((state) => ({
        templates: updator(state.templates) as ResponseTemplates,
      }));
    } else {
      set({ templates: updator });
    }
  },
  updateCode: async (problemUuid) => {
    const { code, language } = get();
    try {
      const response = await saveCode({
        problemUuid,
        content: code,
        language,
      });
      return classifyCodeSaveResponse(response);
    } catch {
      return codeSaveRequestFailed();
    }
  },

  updateSetting: async (data: RequestSetting & { saveToServer: boolean }) => {
    const { saveToServer } = data;

    const { setSettings, settings } = get();
    if (saveToServer) {
      await setSetting(data);
    }
    setSettings(mergeEditorSettings(settings, data));
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
    if (response.statusCode === 200 && isResponseTemplates(response.data)) {
      set({ templates: response.data });
    }
    return response;
  },
  setCodeFromTemplate: () => {
    const { templates, setCode, language } = get();
    const template = templates.defaultList.find(
      (template) => template.language === language,
    );
    if (template) {
      setCode(template.content);
    }
  },

  initialize: async (problemUuid) => {
    let settingResponse: ApiResponse<ResponseSetting>;
    try {
      settingResponse = await getSetting();
    } catch {
      return { type: "setting-request-failed" };
    }

    let initLanguage: Language = "C++";

    if (settingResponse.statusCode === 401) {
      return { type: "unauthenticated" };
    }

    if (settingResponse.statusCode === 200 && settingResponse.data) {
      set({ settings: settingResponse.data });
      initLanguage = settingResponse.data.defaultLanguage;
    }

    let templateDecision: TemplateInitializationDecision;
    try {
      templateDecision = decideTemplateInitialization(
        await getTemplates(),
        initLanguage,
      );
    } catch {
      templateDecision = templateRequestFailed();
    }

    if (templateDecision.type !== "loaded") return templateDecision;

    set({ templates: templateDecision.templates });
    const { defaultTemplate } = templateDecision;

    let codeResponse: ApiResponse<ResponseCode[]>;
    try {
      codeResponse = await loadCode(problemUuid, initLanguage);
    } catch {
      return { type: "code-request-failed" };
    }

    let needDefaultTemplate = true;

    if (codeResponse.statusCode === 200 && Array.isArray(codeResponse.data)) {
      const codeList = codeResponse.data;
      const codeMap: Record<Language, string> = { ...defaultCodeFromLanguage };
      codeList.forEach(({ language, content }) => {
        codeMap[language] = content;
      });

      const savedCodeData = localStorage.getItem(
        editorCodeStorageKey(problemUuid, initLanguage),
      );
      let localCode: { code: string; updatedAt: number } | undefined;
      if (savedCodeData) {
        try {
          const codeData = JSON.parse(savedCodeData);
          const { updatedAt, code } = codeData;
          localCode = { code, updatedAt: new Date(updatedAt).getTime() };
        } catch {
          localStorage.removeItem(
            editorCodeStorageKey(problemUuid, initLanguage),
          );
        }
      }

      needDefaultTemplate = codeList.length === 0;
      const savedCode = codeList.find((elem) => elem.language === initLanguage);
      codeMap[initLanguage] = selectInitialCode({
        fallbackCode: codeMap[initLanguage],
        savedCode: savedCode && {
          content: savedCode.content,
          updatedAt: new Date(savedCode.updatedAt).getTime(),
        },
        hasAnySavedCode: codeList.length > 0,
        localCode,
        defaultTemplate,
      });
      set({
        language: initLanguage,
        code: codeMap[initLanguage],
        codeFromLanguage: { ...codeMap },
      });
    }

    if (defaultTemplate !== undefined && needDefaultTemplate) {
      set({
        language: initLanguage,
        code: defaultTemplate,
        codeFromLanguage: {
          ...defaultCodeFromLanguage,
          [initLanguage]: defaultTemplate,
        },
      });
    }

    return templateDecision;
  },
}));

export default useCodeEditorStore;
