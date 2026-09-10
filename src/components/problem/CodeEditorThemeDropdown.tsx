import EditorSettingSelect from "./EditorSettingSelect";

interface Props {
  theme: CodeEditorTheme;
  handleSelect: (_: unknown, value: CodeEditorTheme) => void | Promise<void>;
}
export default function CodeEditorThemeDropdown({
  theme,
  handleSelect,
}: Props) {
  return (
    <EditorSettingSelect<CodeEditorTheme>
      label="테마"
      value={theme}
      options={["vs-dark", "light"]}
      getOptionLabel={(value) => (value === "vs-dark" ? "어둡게" : "밝게")}
      onValueChange={(value) => handleSelect(undefined, value)}
    />
  );
}
