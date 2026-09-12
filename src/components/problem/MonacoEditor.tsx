import Editor from "@monaco-editor/react";
import useCodeEditor from "@hook/useCodeEditor";
import { monocoLanguageMap } from "@constant/Language";
import { useResolvedEditorTheme } from "@hook/editor/useResolvedEditorTheme";

export default function CodeEditorBody() {
  const {
    code,
    settings,
    themePreference,
    language,
    handleEditorMount,
    handleEditorChange,
  } = useCodeEditor();
  const editorTheme = useResolvedEditorTheme(themePreference);

  return (
    <Editor
      height="100%"
      width="100%"
      className="h-full"
      language={monocoLanguageMap[language]}
      defaultLanguage={monocoLanguageMap[language]}
      defaultValue=""
      theme={editorTheme}
      value={code}

      onMount={handleEditorMount}
      onChange={handleEditorChange}
      options={{
        insertSpaces: true,
        lineNumbers: settings.lineNumber,
        contextmenu: false,
        fontSize: settings.fontSize,
        tabSize: settings.tabSize,
        minimap: { enabled: false },
        scrollbar: { vertical: "auto", horizontal: "auto" },
        codeLens: false,
        autoIndent: "advanced",
      }}
    />
  );
}
