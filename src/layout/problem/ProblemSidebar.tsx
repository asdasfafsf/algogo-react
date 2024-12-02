import React, {
  useRef,
} from 'react';
import MathJax from 'react-mathjax';

import useProblemSidebar from '../../hook/useProblemSidebar';
import { useScreenSize } from '../../context/ScreenSizeContext';

interface ProblemSidebarProps {
  children: React.ReactNode
}

export function ProblemSidebar({ children }: ProblemSidebarProps) {
  const draggableRef = useRef<HTMLDivElement>(null);

  const [problemWidth, handleMouseDown] = useProblemSidebar();
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
        <div
          ref={draggableRef}
          onMouseDown={handleMouseDown}
          className="z-10 h-[calc(100vh-96px)]  text-white -right-5 absolute w-5 cursor-col-resize"
        />
      </aside>
    </MathJax.Provider>
  );
}

export default React.memo(ProblemSidebar);
