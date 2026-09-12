export const EDITOR_THEME_PREFERENCE_STORAGE_KEY =
  "algogo-editor-theme-preference";

export const isCodeEditorThemePreference = (
  value: unknown,
): value is CodeEditorThemePreference =>
  value === "site" || value === "light" || value === "vs-dark";

export const selectEditorThemePreference = (
  storedPreference: unknown,
  serverTheme?: CodeEditorTheme,
): CodeEditorThemePreference =>
  isCodeEditorThemePreference(storedPreference)
    ? storedPreference
    : (serverTheme ?? "site");

export const resolveEditorTheme = (
  preference: CodeEditorThemePreference,
  siteUsesDarkTheme: boolean,
): CodeEditorTheme => {
  if (preference !== "site") return preference;
  return siteUsesDarkTheme ? "vs-dark" : "light";
};

export const createEditorSettingsRequest = (
  settings: CodeEditorSettings,
  themePreference: CodeEditorThemePreference,
): RequestSetting => {
  const rest: RequestSetting = {
    fontSize: settings.fontSize,
    tabSize: settings.tabSize,
    lineNumber: settings.lineNumber,
    defaultLanguage: settings.defaultLanguage,
  };
  return themePreference === "site"
    ? rest
    : { ...rest, theme: themePreference };
};
