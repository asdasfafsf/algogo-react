import { ArrowUpIcon } from '@heroicons/react/24/outline';
import CodeControlPanel from '../organism/CodeControlPanel';
import CodeEditor from '../molecule/CodeEditor';
import CodeResultPannel from '../organism/CodeResultPannel';
import { useProblemWidthStore } from '../zustand/ProblemWidthStore';
import useProblemSection from '../hook/useProblemSection';
import { PROBLEM_FOOTER_HEIGHT, PROBLEM_HEADER_HEIGHT } from '../constant/Size';

export default function ProblemSection() {
  const problemWidth = useProblemWidthStore(({ problemWidth }) => problemWidth);
  const handleMouseDown = useProblemSection()[1];
  return (
    <section
      className="gap-0 m-0 p-0"
      style={{
        height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
        width: `calc(100vw - ${problemWidth}px)`,
      }}
    >

      <CodeControlPanel />
      <CodeEditor />
      <div
        className="h-[10px] bg-gray-900 cursor-row-resize flex items-center justify-center group/size1"
      >
        <div
          className="fixed rounded-xl group-hover/size1:visible invisible w-12 h-12 bg-gray-900 flex justify-center"
        >
          <ArrowUpIcon className="w-4 h-4 text-white" />
        </div>
        <div
          onMouseDown={handleMouseDown}
          className="w-full h-full"
        />
      </div>
      <CodeResultPannel />
    </section>
  );
}
