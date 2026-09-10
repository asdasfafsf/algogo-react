import EditorSettingSelect from "./EditorSettingSelect";
import { languageList } from "@constant/Language";
interface Props {
  defaultLanguage: Language;
  handleSelect: (_: unknown, value: Language) => void | Promise<void>;
}
export default function CodeEditorDefaultLanguageDropdown({
  defaultLanguage,
  handleSelect,
}: Props) {
  return (
    <EditorSettingSelect<Language>
      label="기본 언어"
      value={defaultLanguage}
      options={languageList}
      onValueChange={(value) => handleSelect(undefined, value)}
    />
  );
}
