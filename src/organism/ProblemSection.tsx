import useCodeResultPanel from '../hook/useuseProblemSection';
import CodeControlPanel from '../molecule/CodeControlPanel';
import CodeEditor from '../molecule/CodeEditor';
import CodeResultPannel from '../molecule/CodeResultPannel';
import { useProblemWidthStore } from '../zustand/ProblemWidthStore';

export default function ProblemSection() {
  const problemWidth = useProblemWidthStore(({ problemWidth }) => problemWidth);
  const [codeResultHeight, handleMouseDown] = useCodeResultPanel();
  return (
    <section
      className="grid gap-0 m-0 p-0 h-[calc(100vh-48px)]"
      style={{
        gridTemplateRows: `48px ${codeResultHeight}px 5px auto`,
        gridTemplateColumns: `calc(100vw - ${problemWidth}px)`,
      }}
    >
      <CodeControlPanel />
      <CodeEditor />
      <div
        onMouseDown={handleMouseDown}
        className="bg-gray-900 cursor-row-resize"
      />
      <CodeResultPannel />
    </section>
  );
}
