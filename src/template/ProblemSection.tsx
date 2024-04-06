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
      className="transition-[left] overflow-x-hidden gap-0 m-0 p-0 h-full"
      style={isMobile
        ? {
          display: 'flex',
          width: '300vw',
          left: `-${33.33333333333333 * selectedIndex}%`,
        }
        : {
          display: 'flex',
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
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
          }}
        className=""
      >
        <ProblemSidebar />
      </div>
      <div className="h-full">
        <div
          style={isMobile ? {
            width: '100vw',
            height: 'calc(100vh - 96px)',
          } : {
            width: `calc(100vw - ${problemWidth}px`,
            height: `${problemHeight}px`,
          }}
          className=""
        >
          <CodeEditor />
        </div>

        <div
          style={isMobile ? {
            width: '100vw',
            height: 'calc(100vh - 96px)',
          } : {
            width: `calc(100vw - ${problemWidth}px`,
            // height: '500px',
            height: `calc(100vh - ${problemHeight
                + PROBLEM_HEADER_HEIGHT
                + PROBLEM_FOOTER_HEIGHT
            }px)`,
          }}
          className=""
        >
          <CodeResultPannel />
        </div>
      </div>

      <div
        onClick={() => { setSelectedIndex(Math.max(0, selectedIndex - 1)); }}
        className="block sm:hidden z-30 fixed top-1/2 left-0 w-12 h-12"
      >
        <ChevronLeftIcon className="text-blue-gray-500" />
      </div>
      <div
        onClick={() => { setSelectedIndex(Math.min(2, selectedIndex + 1)); }}
        className="block sm:hidden z-30 fixed top-1/2 right-0 w-12 h-12"
      >
        <ChevronRightIcon className="text-blue-gray-500" />
      </div>
      <div
        className="block sm:hidden z-30 bg-blue-500 justify-center items-center w-12 h-12 fixed bottom-20 right-14 rounded-full cursor-crosshair"
      >
        <div className="h-full w-full flex justify-center items-center">
          <PlusIcon className="text-white w-6 h-6" />
        </div>
      </div>
    </section>
  );
}
