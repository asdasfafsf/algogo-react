// eslint-disable-next-line import/no-extraneous-dependencies
import Editor from '@monaco-editor/react';
import { useRef } from 'react';

const defaultValue = `

`.trim();
export default function ProblemSection() {
  const editorRef = useRef<unknown>(null);

  return (
    <section style={{
      width: 'calc(100vw - 500px)',
    }}
    >
      <nav className="h-8 bg-pink-300">여기는 컨트롤 패널입니다</nav>
      <Editor
        height="calc(100vh - 80px)"
        width="calc(100vw - 500px)"
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        theme="vs-dark"
        // eslint-disable-next-line no-return-assign
        onMount={(editor) => editorRef.current = editor}
        options={{
          codeLens: false,
          autoIndent: 'advanced',
        }}
      />
    </section>
  );
}
