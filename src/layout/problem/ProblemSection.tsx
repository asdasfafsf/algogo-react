import {
  ChevronLeftIcon, ChevronRightIcon,
} from '@heroicons/react/24/outline';

import CodeEditor from '@components/problem/CodeEditor';
import CodeDropUp from '@components/problem/CodeDropUp';
import CodeResultPannel from '@components/problem/CodeResultPannel';
import { useProblemWidthStore } from '@zustand/ProblemWidthStore';
import { useCodeEditorHeightStore } from '@zustand/CodeResultHeightStore';
import { useProblemScreenStore } from '@zustand/ProblemScreenStore';
import useMeStore from '@zustand/MeStore';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { PROBLEM_FOOTER_HEIGHT, PROBLEM_HEADER_HEIGHT } from '../../constant/Size';
import { useScreenSize } from '../../context/ScreenSizeContext';
import ProblemSidebar from './ProblemSidebar';
import ProblemSidebarSkeleton from './ProblemSidebarSkeleton';
import Problem from './Problem';

interface ProblemSectionProps {
  problem: ResponseProblem | undefined;
}

export default function ProblemSection({ problem }: ProblemSectionProps) {
  const problemWidth = useProblemWidthStore((state) => state.problemWidth);
  const problemHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
  const { isMobile } = useScreenSize();
  const selectedIndex = useProblemScreenStore((state) => state.selectedIndex);
  const setSelectedIndex = useProblemScreenStore((state) => state.setSelectedIndex);
  const navigate = useNavigate();
  const me = useMeStore((state) => state.me);

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
          display: 'flex',
          width: '100vw',
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
        }}
    >
      <div
        style={isMobile
          ? {}
          : {
            width: `${problemWidth}px`,
            height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_FOOTER_HEIGHT}px)`,
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

      {isMobile
        ? (
          <>
            <div
              style={isMobile ? {
                width: '100vw',
                height: 'calc(100vh - 96px)',
              } : {
                height: `${problemHeight}px`,
              }}
              className="relative w-full"
            >
              <CodeEditor />
            </div>
            <div
              style={{
                width: '100vw',
                height: 'calc(100vh - 96px)',
              }}
              className="relative w-full"
            >
              <CodeResultPannel />
            </div>
          </>
        )
        : (
          <div
            className="relative h-full"
            style={isMobile ? {
              width: '100vw',
              height: 'calc(100vh - 96px)',
            } : {
              width: `calc(100vw - ${problemWidth}px`,
            }}
          >

            {!me && (
            <div className="absolute z-20 w-full h-full gap-2 cursor-not-allowed bg-black/70">
              <div className="flex items-center justify-center w-full h-full gap-2">
                <Button
                  onClick={() => {
                    navigate(`/login?destination=${window.location.pathname}`);
                  }}
                  color="blue"
                >
                  로그인
                </Button>
                <Button
                  onClick={() => {
                    navigate(`/signup?destination=${window.location.pathname}`);
                  }}
                  color="blue"
                >
                  회원가입
                </Button>
              </div>

            </div>
            )}

            <div
              style={{
                height: `${problemHeight}px`,
              }}
              className="relative w-full"
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
                  + PROBLEM_FOOTER_HEIGHT
                }px)`,
              }}
              className="relative w-full"
            >
              <CodeResultPannel />
            </div>
          </div>
        )}

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
