import Editor from '@monaco-editor/react';
import useCodeEditor from '@hook/useCodeEditor';

export default function CodeEditorBody() {
  const {
    code, settings, language, handleEditorMount, handleEditorChange,
  } = useCodeEditor();

  const monocoLanguageMap = {
    'Node.js': 'javascript',
    'C++': 'cpp',
    Java: 'java',
    Python: 'python',
  };

  return (
    <Editor
      height="calc(100% - 48px)"
      width="100%"
      className="h-full"
      language={monocoLanguageMap[language]}
      defaultLanguage={monocoLanguageMap[language]}
      defaultValue="input your code"
      theme={settings.theme}
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
        scrollbar: { vertical: 'auto', horizontal: 'auto' },
        codeLens: false,
        autoIndent: 'advanced',
      }}
    />
  );
}
