import React, {
  useRef,
} from 'react';
import MathJax from 'react-mathjax';
import ProblemInputOutputList from '@components/problem/ProblemInputOutputList';
import ProblemInputOutput from '@components/problem/ProblemInputOutput';
import ProblemContent from '@components/problem/ProblemContent';
import ProblemTitle from '@components/problem/ProblemTitle';
import ProblemInfo from '@components/problem/ProblemInfo';
import ProblemSource from '@components/problem/ProblemSource';
import ProblemCategoryViewer from '@components/problem/ProblemCategoryViewer';
import useProblemSidebar from '../../hook/useProblemSidebar';
import { useScreenSize } from '../../context/ScreenSizeContext';

interface ProblemSidebarProps {
  problem: ResponseProblem
}

export function ProblemSidebar({ problem }: ProblemSidebarProps) {
  const draggableRef = useRef<HTMLDivElement>(null);

  const [problemWidth, handleMouseDown] = useProblemSidebar();
  const { isMobile } = useScreenSize();
  const {
    title, levelText, submitCount, typeList, contentList,
    input, output, inputOutputList, answerRate, timeout,
    memoryLimit, answerCount, answerPeopleCount,
  } = problem;

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
        <div className="w-full px-5 py-8 overflow-y-auto">
          <ProblemTitle title={title} />
          <ProblemInfo
            levelText={levelText as ProblemLevel}
            submitCount={submitCount}
            answerCount={answerCount}
            answerRate={answerRate}
            timeout={timeout}
            memoryLimit={memoryLimit}
            answerPeopleCount={answerPeopleCount}
          />
          <ProblemCategoryViewer
            initialState={typeList && typeList.length === 0 ? 'none' : 'hide'}
            categoryList={typeList.map((elem) => elem.name)}
          />
          <ProblemContent contentList={contentList} />
          <ProblemInputOutput input={input} output={output} />
          <div className="my-4 opacity-0" />
          <ProblemInputOutputList inputOutputList={inputOutputList} />
          <div className="my-4 opacity-0" />
          <ProblemSource />
        </div>
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
