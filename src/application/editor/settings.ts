import {
  editorSettingsSaveRequestFailed,
  editorSettingsSaveSucceeded,
  type EditorSettingsSaveResult,
} from "@/domain/editor/settingsSave";
import { createEditorSettingsRequest } from "@/domain/editor/theme";

export type SaveEditorSettingsInput = {
  settings: CodeEditorSettings;
  themePreference: CodeEditorThemePreference;
  problemContentSize: number;
  saveToServer: boolean;
};

export type EditorSettingsPorts = {
  setProblemContentSize: (size: number) => void | Promise<void>;
  setCodeEditorSettings: (settings: CodeEditorSettings) => void | Promise<void>;
  setThemePreference: (
    theme: CodeEditorThemePreference,
  ) => void | Promise<void>;
  persistThemePreference: (
    theme: CodeEditorThemePreference,
  ) => void | Promise<void>;
  updateCodeEditorSettings: (
    settings: RequestSetting,
  ) => Promise<EditorSettingsSaveResult>;
  close: () => void | Promise<void>;
};

export const cancelEditorSettings = (
  ports: Pick<EditorSettingsPorts, "close">,
) => ports.close();

export const saveEditorSettings = async (
  input: SaveEditorSettingsInput,
  ports: EditorSettingsPorts,
): Promise<EditorSettingsSaveResult> => {
  let result = editorSettingsSaveSucceeded();

  if (input.saveToServer) {
    try {
      result = await ports.updateCodeEditorSettings(
        createEditorSettingsRequest(input.settings, input.themePreference),
      );
    } catch {
      result = editorSettingsSaveRequestFailed();
    }
  }

  if (result.type !== "success") return result;

  await ports.setProblemContentSize(input.problemContentSize);
  await ports.setCodeEditorSettings(input.settings);
  await ports.setThemePreference(input.themePreference);
  await ports.persistThemePreference(input.themePreference);
  await ports.close();
  return result;
};
