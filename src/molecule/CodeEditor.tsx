import Editor from '@monaco-editor/react';
import { useRef } from 'react';

export default function CodeEditor() {
  const editorRef = useRef<unknown>(null);

  return (
    <Editor
      height="calc(100vh - 80px)"
      width="calc(100vw - 500px)"
      defaultLanguage="javascript"
      defaultValue=""
      theme="vs-dark"
    // eslint-disable-next-line no-return-assign
      onMount={(editor) => editorRef.current = editor}
      options={{
        codeLens: false,
        autoIndent: 'advanced',
      }}
    />
  );
}
