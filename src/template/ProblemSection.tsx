import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import CodeEditor from '../molecule/CodeEditor';
import CodeResultPannel from '../organism/CodeResultPannel';
import { useProblemWidthStore } from '../zustand/ProblemWidthStore';
import { CODE_CONTROL_PANEL_HEIGHT, PROBLEM_FOOTER_HEIGHT, PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import { useScreenSize } from '../context/ScreenSizeContext';
import ProblemSidebar from './ProblemSidebar';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';
import { useProblemScreenStore } from '../zustand/ProblemScreenStore';

export default function ProblemSection() {
  const problemWidth = useProblemWidthStore(({ problemWidth }) => problemWidth);
  const problemHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
  const { isMobile } = useScreenSize();
  const { selectedIndex, setSelectedIndex } = useProblemScreenStore(((state) => state));
  return (
    <section
      className="transition-[left] overflow-x-hidden gap-0 m-0 p-0 h-full relative trasi"
      style={isMobile
        ? {
          display: 'flex',
          width: '300vw',
          left: `-${33.33333333333333 * selectedIndex}%`,
        }
        : {
          display: 'grid',
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
          gridTemplateColumns: `${problemWidth}px calc(100vw - ${problemWidth})`, // 왼쪽에 1열, 오른쪽에 1열 설정
          gridTemplateRows: `${problemHeight}px calc(100vh - ${problemHeight - 10}px)`, // 왼쪽에 1행, 오른쪽에 3행 설정
        }}
    >
      <div
        style={isMobile
          ? {
            width: '100vw',
            height: 'calc(100vh - 96px)',
          }
          : {
            height: 'calc(100vh - 96px)',
            width: `${problemWidth}px`,
            gridRow: 'span 2',
            gridColumn: 1,
          }}
        className="relative"
      >
        <ProblemSidebar />
      </div>
      <div
        style={isMobile ? {
          width: '100vw',
          height: 'calc(100vh - 96px)',
        } : {
          gridRow: 1,
          gridColumn: 2,
          width: `calc(100vw - ${problemWidth}px`,
          height: `${problemHeight}px`,
        }}
        className="relative"
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
          height: `calc(100vh - ${problemHeight
                + PROBLEM_HEADER_HEIGHT
                + CODE_CONTROL_PANEL_HEIGHT
          }px)`,
        }}
        className="relative"
      >
        <CodeResultPannel />
      </div>

      <div
        onClick={() => { setSelectedIndex(Math.max(0, selectedIndex - 1)); }}
        className="ssmd:hidden ssm:block z-30 fixed top-1/2 left-0 w-12 h-12"
      >
        <ChevronLeftIcon className="text-blue-gray-500" />
      </div>
      <div
        onClick={() => { setSelectedIndex(Math.min(2, selectedIndex + 1)); }}
        className="ssmd:hidden ssm:block z-30 fixed top-1/2 right-0 w-12 h-12"
      >
        <ChevronRightIcon className="text-blue-gray-500" />
      </div>
      <div
        className="ssmd:hidden z-30 bg-blue-500 justify-center items-center w-12 h-12 fixed bottom-20 right-14 rounded-full cursor-crosshair"
      >
        <div className="h-full w-full flex justify-center items-center">
          <PlusIcon className="text-white w-6 h-6" />
        </div>
      </div>
    </section>
  );
}
