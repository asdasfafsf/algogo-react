import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';

export default function CodeEditor() {
  const editorRef = useRef<unknown>(null);
  const codeEditorHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);

  return (
    <div
      style={{
        height: `${codeEditorHeight}px`,
      }}
      className="bg-gray-900"
    >
      <Editor
        height="100%"
        width="100%"
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
    </div>
  );
}
