import Editor, { useMonaco } from '@monaco-editor/react';
import { useCallback, useRef } from 'react';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';

export default function CodeEditor() {
  const editorRef = useRef<unknown>(null);
  const codeEditorHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
  const {
    code, setCode, language, updateCodeFromLanguage, codeFromLanguage,
  } = useCodeEditorStore((state) => state);

  const monaco = useMonaco();

  const handleEditorChange = useCallback((
    value: string | undefined,
  ) => {
    if (!value) {
      return;
    }
    setCode(value);
    updateCodeFromLanguage(language, value);
  }, [code]);

  const handleEditorMount = useCallback((editor: unknown) => {
    editorRef.current = editor;
  }, [editorRef]);

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
