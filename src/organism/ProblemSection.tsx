import ProblemControlPanel from '../molecule/ProblemControlPanel';
import CodeEditor from '../molecule/CodeEditor';
import CodeResultPannel from '../molecule/CodeResultPannel';

export default function ProblemSection() {
  return (
    <section
      style={{
        width: 'calc(100vw - 500px)',
      }}
    >
      <ProblemControlPanel />
      <CodeEditor />
      <CodeResultPannel />
    </section>
  );
}
