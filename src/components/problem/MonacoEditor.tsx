import Editor from '@monaco-editor/react';
import useCodeEditor from '@hook/useCodeEditor';

export default function CodeEditorBody() {
  const { code, language, handleEditorMount, handleEditorChange } = useCodeEditor();

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
      theme="vs-dark"
      value={code}
      onMount={handleEditorMount}
      onChange={handleEditorChange}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollbar: { vertical: 'auto', horizontal: 'auto' },
        codeLens: false,
        autoIndent: 'advanced',
      }}
    />
  );
}