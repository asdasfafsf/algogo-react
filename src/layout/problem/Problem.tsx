import ProblemInputOutputList from '@components/problem/ProblemInputOutputList';
import ProblemInputOutput from '@components/problem/ProblemInputOutput';
import ProblemContent from '@components/problem/ProblemContent';
import ProblemTitle from '@components/problem/ProblemTitle';
import ProblemInfo from '@components/problem/ProblemInfo';
import ProblemSource from '@components/problem/ProblemSource';
import ProblemCategoryViewer from '@components/problem/ProblemCategoryViewer';
import React from 'react';
import ProblemContentResizer from '@components/problem/ProblemContentSizeResizer';
import { useProblemContentSizeStore } from '@zustand/ProblemContentSizeStore';
import { Problem as ProblemType } from '@/type/Problem.type';

interface ProblemProps {
  problem: ProblemType
}

function Problem({ problem }: ProblemProps) {
  const {
    title, levelText, submitCount, typeList, content,
    input, output, inputOutputList, answerRate, timeout,
    memoryLimit, answerCount, answerPeopleCount,
  } = problem;

  const problemContentSize = useProblemContentSizeStore((state) => state.size);
  return (
    <div className="w-full px-5 py-4 overflow-y-auto">
      <ProblemContentResizer />
      <div className="mb-1" />
      <ProblemTitle
        scale={(problemContentSize / 100)}
        title={title}
      />
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
        categoryList={typeList.map((elem) => elem)}
      />
      <ProblemContent
        scale={(problemContentSize / 100)}
        content={content}
      />
      {/* <ProblemInputOutput
        input={input}
        output={output}
        scale={(problemContentSize / 100)}
      /> */}
      <div className="my-8 opacity-0" />
      <ProblemInputOutputList
        inputOutputList={inputOutputList}
      />
      <div className="my-8 opacity-0" />
      <ProblemSource />
    </div>
  );
}

export default React.memo(Problem);
