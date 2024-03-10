// eslint-disable-next-line import/no-extraneous-dependencies
import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import ProblemControlPanel from '../molecule/ProblemControlPanel';
import Line from '../atom/Line';

const defaultValue = `

`.trim();
export default function ProblemSection() {
  const editorRef = useRef<unknown>(null);

  return (
    <section style={{
      width: 'calc(100vw - 500px)',
    }}
    >
      <Line className='bg-gray-800'/>
      <ProblemControlPanel />
      <Line className='bg-gray-800'/>
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
