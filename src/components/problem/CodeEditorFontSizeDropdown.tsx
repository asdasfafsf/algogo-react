import EditorSettingSelect from "./EditorSettingSelect";

interface Props {
  fontSize: number;
  handleSelect: (_: unknown, value: number) => void | Promise<void>;
}
export default function CodeEditorFontSizeDropdown({
  fontSize,
  handleSelect,
}: Props) {
  return (
    <EditorSettingSelect<number>
      label="글자 크기"
      value={fontSize}
      options={[14, 15, 16, 17, 18, 19, 20, 21]}
      onValueChange={(value) => handleSelect(undefined, value)}
    />
  );
}
