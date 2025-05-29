import React, {
  useRef,
} from 'react';
import MathJax from 'react-mathjax';

import useProblemSidebar from '../../hook/useProblemSidebar';
import { useScreenSize } from '../../context/ScreenSizeContext';

interface ProblemSidebarProps {
  children: React.ReactNode
  open: boolean
  handleClickOpen: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProblemSidebar({ children, open, handleClickOpen }: ProblemSidebarProps) {
  const draggableRef = useRef<HTMLDivElement>(null);

  const {
    problemWidth, handleMouseDown,
  } = useProblemSidebar();
  const { isMobile } = useScreenSize();

  return (
    <MathJax.Provider>
      <aside
        style={isMobile
          ? { height: 'calc(100vh - 96px)' }
          : {
            height: 'calc(100vh - 96px)',
            width: `${problemWidth}px`,
            gridRow: 'span 2',
            gridColumn: 1,
          }}
        className="relative z-30 flex bg-white sm:w-screen"
      >
        {children}
        <div className="relative">
          <div
            ref={draggableRef}
            onMouseDown={open ? (e) => handleMouseDown(e) : undefined}
            className="group z-10 h-[calc(100vh-96px)] -right-5 absolute w-5 cursor-col-resize"
          >
            <div className={`absolute top-1/2 -translate-y-1/2 -right-4 transition-opacity z-20 ${
              open ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}
            >
              <button
                type="button"
                onClick={handleClickOpen}
                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {open ? (
                    <path d="M15 19l-7-7 7-7" />
                  ) : (
                    <path d="M9 5l7 7-7 7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </MathJax.Provider>
  );
}

export default React.memo(ProblemSidebar);
