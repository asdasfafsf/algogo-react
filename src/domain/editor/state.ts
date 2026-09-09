export const setEditorCode = (
  codeFromLanguage: CodeFromLanguage,
  language: Language,
  code: string,
) => ({ code, codeFromLanguage: { ...codeFromLanguage, [language]: code } });

export const selectEditorLanguage = (
  codeFromLanguage: CodeFromLanguage,
  language: Language,
) => ({ language, code: codeFromLanguage[language] });

export const mergeEditorSettings = (
  settings: CodeEditorSettings,
  changes: RequestSetting,
): CodeEditorSettings => ({ ...settings, ...changes });
