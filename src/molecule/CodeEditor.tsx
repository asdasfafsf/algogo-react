import Editor from '@monaco-editor/react';
import useCodeEditor from '../hook/useCodeEditor';
import CodeControlPanel from '../organism/CodeControlPanel';

export default function CodeEditor() {
  const [
    code,
    language,
    handleEditorMount,
    handleEditorChange] = useCodeEditor();

  return (
    <div
      className="bg-gray-900 flex w-full h-full"
    >
      <div className="w-full">
        <CodeControlPanel />
        <Editor
          height="calc(100% - 48px)"
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
    </div>
  );
}
