import ProblemControlPanel from '../molecule/ProblemControlPanel';
import Line from '../atom/Line';
import CodeEditor from '../molecule/CodeEditor';


export default function ProblemSection() {

  return (
    <section 
      style={{
        width: 'calc(100vw - 500px)',
      }}
    >
      <ProblemControlPanel />
      <CodeEditor />

    </section>
  );
}
