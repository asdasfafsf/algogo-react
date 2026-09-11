import {
  editorSettingsSaveRequestFailed,
  editorSettingsSaveSucceeded,
  type EditorSettingsSaveResult,
} from "@/domain/editor/settingsSave";

export type SaveEditorSettingsInput = {
  settings: CodeEditorSettings;
  problemContentSize: number;
  saveToServer: boolean;
};

export type EditorSettingsPorts = {
  setProblemContentSize: (size: number) => void | Promise<void>;
  setCodeEditorSettings: (settings: CodeEditorSettings) => void | Promise<void>;
  updateCodeEditorSettings: (
    settings: CodeEditorSettings,
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
      result = await ports.updateCodeEditorSettings(input.settings);
    } catch {
      result = editorSettingsSaveRequestFailed();
    }
  }

  if (result.type !== "success") return result;

  await ports.setProblemContentSize(input.problemContentSize);
  await ports.setCodeEditorSettings(input.settings);
  await ports.close();
  return result;
};
