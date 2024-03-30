import Editor from '@monaco-editor/react';
import useCodeEditor from '../hook/useCodeEditor';

export default function CodeEditor() {
  const [
    codeEditorHeight,
    code,
    language,
    handleEditorMount,
    handleEditorChange] = useCodeEditor();

  return (
    <div
      style={{
        height: `${codeEditorHeight}px`,
      }}
      className="bg-gray-900 flex"
    >
      <Editor
        height="100%"
        width="100%"
        className="h-full"
        language={language}
        defaultLanguage={language}
        defaultValue="input your code"
        theme="vs-dark"
        value={code}
        onMount={handleEditorMount}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
          codeLens: false,
          autoIndent: 'advanced',
        }}
      />
    </div>
  );
}
