import {
  EDITOR_THEME_PREFERENCE_STORAGE_KEY,
  selectEditorThemePreference,
} from "@/domain/editor/theme";

const getStorage = () => {
  try {
    return typeof localStorage === "undefined" ? undefined : localStorage;
  } catch {
    return undefined;
  }
};

export const readEditorThemePreference = () => {
  try {
    return getStorage()?.getItem(EDITOR_THEME_PREFERENCE_STORAGE_KEY) ?? null;
  } catch {
    return null;
  }
};

export const persistEditorThemePreference = (
  preference: CodeEditorThemePreference,
) => {
  try {
    getStorage()?.setItem(EDITOR_THEME_PREFERENCE_STORAGE_KEY, preference);
  } catch {
    // The in-memory preference still applies when browser storage is unavailable.
  }
};

export const getInitialEditorThemePreference = (
  serverTheme?: CodeEditorTheme,
) => selectEditorThemePreference(readEditorThemePreference(), serverTheme);
