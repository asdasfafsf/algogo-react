import ProblemInputOutputList from '@components/problem/ProblemInputOutputList';
import ProblemInputOutput from '@components/problem/ProblemInputOutput';
import ProblemContent from '@components/problem/ProblemContent';
import ProblemTitle from '@components/problem/ProblemTitle';
import ProblemInfo from '@components/problem/ProblemInfo';
import ProblemSource from '@components/problem/ProblemSource';
import ProblemCategoryViewer from '@components/problem/ProblemCategoryViewer';
import React from 'react';

interface ProblemProps {
  problem: ResponseProblem
}

function Problem({ problem }: ProblemProps) {
  const {
    title, levelText, submitCount, typeList, contentList,
    input, output, inputOutputList, answerRate, timeout,
    memoryLimit, answerCount, answerPeopleCount,
  } = problem;
  return (
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
  );
}

export default React.memo(Problem);
