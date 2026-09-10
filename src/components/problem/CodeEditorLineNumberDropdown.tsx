import EditorSettingSelect from "./EditorSettingSelect";

interface Props {
  lineNumber: CodeEditorLineNumber;
  handleSelect: (
    _: unknown,
    value: CodeEditorLineNumber,
  ) => void | Promise<void>;
}
export default function CodeEditorLineNumberDropdown({
  lineNumber,
  handleSelect,
}: Props) {
  return (
    <EditorSettingSelect<CodeEditorLineNumber>
      label="줄 번호"
      value={lineNumber}
      options={["on", "off", "relative"]}
      onValueChange={(value) => handleSelect(undefined, value)}
    />
  );
}
