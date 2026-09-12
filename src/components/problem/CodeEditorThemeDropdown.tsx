import EditorSettingSelect from "./EditorSettingSelect";

interface Props {
  theme: CodeEditorThemePreference;
  handleSelect: (
    _: unknown,
    value: CodeEditorThemePreference,
  ) => void | Promise<void>;
}
export default function CodeEditorThemeDropdown({
  theme,
  handleSelect,
}: Props) {
  return (
    <EditorSettingSelect<CodeEditorThemePreference>
      label="테마"
      value={theme}
      options={["site", "light", "vs-dark"]}
      triggerClassName="w-40"
      getOptionLabel={(value) =>
        value === "site"
          ? "사이트 설정 따르기"
          : value === "vs-dark"
            ? "어둡게"
            : "밝게"
      }
      onValueChange={(value) => handleSelect(undefined, value)}
    />
  );
}
