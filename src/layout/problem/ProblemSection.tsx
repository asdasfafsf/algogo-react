import {
  ChevronLeftIcon, ChevronRightIcon,
} from '@heroicons/react/24/outline';

import CodeEditor from '../../molecule/CodeEditor';
import CodeResultPannel from '../../organism/CodeResultPannel';
import { useProblemWidthStore } from '../../zustand/ProblemWidthStore';
import { PROBLEM_FOOTER_HEIGHT, PROBLEM_HEADER_HEIGHT } from '../../constant/Size';
import { useScreenSize } from '../../context/ScreenSizeContext';
import ProblemSidebar from './ProblemSidebar';
import { useCodeEditorHeightStore } from '../../zustand/CodeResultHeightStore';
import { useProblemScreenStore } from '../../zustand/ProblemScreenStore';
import CodeDropUp from '../../molecule/CodeDropUp';
import ProblemSidebarSkeleton from './ProblemSidebarSkeleton';
import Problem from './Problem';

interface ProblemSectionProps {
  problem: ResponseProblem | undefined;
}

export default function ProblemSection({ problem }: ProblemSectionProps) {
  const problemWidth = useProblemWidthStore(({ problemWidth }) => problemWidth);
  const problemHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
  const { isMobile } = useScreenSize();
  const { selectedIndex, setSelectedIndex } = useProblemScreenStore(((state) => state));

  return (
    <section
      className="transition-[left] overflow-x-hidden gap-0 m-0 p-0 h-full relative"
      style={isMobile
        ? {
          display: 'flex',
          width: '300vw',
          left: `-${100 * selectedIndex}%`,
        }
        : {
          display: 'grid',
          width: '100vw',
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
          gridTemplateColumns: `${problemWidth}px calc(100vw - ${problemWidth})`,
          gridTemplateRows: `${problemHeight}px calc(100vh - ${problemHeight + PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
        }}
    >
      <div
        style={isMobile
          ? {}
          : {
            width: `${problemWidth}px`,
            height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
            gridRow: 'span 2',
            gridColumn: 1,
          }}
        className="relative w-screen h-full"
      >
        {
          problem ? (
            <ProblemSidebar>
              <Problem problem={problem} />
            </ProblemSidebar>
          ) : <ProblemSidebarSkeleton />
        }
      </div>

      <div
        style={isMobile ? {
          width: '100vw',
          height: 'calc(100vh - 96px)',
        } : {
          width: `calc(100vw - ${problemWidth}px`,
          height: `${problemHeight}px`,
        }}
        className="relative w-screen"
      >
        <CodeEditor />
      </div>

      <div
        style={isMobile ? {
          width: '100vw',
          height: 'calc(100vh - 96px)',
        } : {

          gridRow: 2,
          gridColumn: 2,
          width: `calc(100vw - ${problemWidth}px`,
          height: `calc(100vh - ${problemHeight
                + PROBLEM_HEADER_HEIGHT
                + PROBLEM_FOOTER_HEIGHT
          }px)`,
        }}
        className="relative"
      >
        <CodeResultPannel />
      </div>

      <div
        onClick={() => { setSelectedIndex(Math.max(0, selectedIndex - 1)); }}
        className="fixed left-0 z-30 block w-12 h-12 sm:hidden top-1/2"
      >
        <ChevronLeftIcon className="text-blue-gray-500" />
      </div>
      <div
        onClick={() => { setSelectedIndex(Math.min(2, selectedIndex + 1)); }}
        className="fixed right-0 z-30 block w-12 h-12 sm:hidden top-1/2"
      >
        <ChevronRightIcon className="text-blue-gray-500" />
      </div>

      <CodeDropUp />
    </section>
  );
}
