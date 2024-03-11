import CodeControlPanel from '../molecule/CodeControlPanel';
import CodeEditor from '../molecule/CodeEditor';
import CodeResultPannel from '../molecule/CodeResultPannel';

export default function ProblemSection() {
  return (
    <section
      className='grid gap-0 m-0 p-0 h-[calc(100vh-48px)] min-w-[800px]'
      style={{
        width: 'calc(100vw - 500px)',
        gridTemplateRows: "48px auto 300px",
        gridTemplateColumns : "100%"
      }}
    >
      <CodeControlPanel />
      <CodeEditor />
      <CodeResultPannel />
    </section>
  );
}
