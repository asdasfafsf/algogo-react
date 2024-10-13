import Editor from '@monaco-editor/react';
import useCodeEditor from '../hook/useCodeEditor';
import CodeControlPanel from '../organism/CodeControlPanel';

export default function CodeEditor() {
  const {
    code,
    language,
    handleEditorMount,
    handleEditorChange,
  } = useCodeEditor();

  const monocoLanguageMap: LangugeToMonacoEditorLanguage = {
    'Node.js': 'javasript',
    'C++': 'cpp',
    Java: 'java',
    Python: 'python',
  };

  return (
    <div
      className="flex w-full h-full bg-gray-900"
    >
      <div className="w-full">
        <CodeControlPanel />
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
