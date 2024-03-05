// eslint-disable-next-line import/no-extraneous-dependencies
import Editor from '@monaco-editor/react';

export default function ProblemSection() {
  return (
    <section className="grid col-start-2 col-end-2 row-start-2 row-end-3">
      <nav className="h-4 bg-pink-300">여기는 컨트롤 패널입니다</nav>
      <Editor
        height="90vh"
        width="100%"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme=""
      />
    </section>
  );
}
