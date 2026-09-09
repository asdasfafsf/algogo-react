export type SaveEditorSettingsInput = {
  settings: CodeEditorSettings;
  problemContentSize: number;
  saveToServer: boolean;
};

export type EditorSettingsPorts = {
  setProblemContentSize: (size: number) => void | Promise<void>;
  setCodeEditorSettings: (settings: CodeEditorSettings) => void | Promise<void>;
  updateCodeEditorSettings: (
    settings: CodeEditorSettings & { saveToServer: boolean },
  ) => void | Promise<void>;
  close: () => void | Promise<void>;
};

export const cancelEditorSettings = (
  ports: Pick<EditorSettingsPorts, "close">,
) => ports.close();

export const saveEditorSettings = async (
  input: SaveEditorSettingsInput,
  ports: EditorSettingsPorts,
) => {
  ports.setProblemContentSize(input.problemContentSize);
  ports.setCodeEditorSettings(input.settings);
  await ports.updateCodeEditorSettings({
    ...input.settings,
    saveToServer: input.saveToServer,
  });
  ports.close();
};
