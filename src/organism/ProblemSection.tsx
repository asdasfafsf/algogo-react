// eslint-disable-next-line import/no-extraneous-dependencies
import Editor from '@monaco-editor/react';
import { useRef } from 'react';

const defaultValue = `

`.trim();
export default function ProblemSection() {
  const editorRef = useRef<unknown>(null);

  return (
    <section className="row-span-1">
      <nav className="h-8 bg-pink-300">여기는 컨트롤 패널입니다</nav>
      <Editor
        height="80vh"
        width="100%"
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
