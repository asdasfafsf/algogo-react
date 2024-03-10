import ProblemControlPanel from '../molecule/ProblemControlPanel';
import Line from '../atom/Line';
import CodeEditor from '../molecule/CodeEditor';


export default function ProblemSection() {

  return (
    <section style={{
      width: 'calc(100vw - 500px)',
    }}
    >
      <Line className='bg-gray-800'/>
      <ProblemControlPanel />
      <Line className='bg-gray-800'/>
      <CodeEditor />

    </section>
  );
}
