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
import ProblemContentWrapper from '@components/problem/ProblemContentWrapper';
import { Problem as ProblemType } from '@/type/Problem.type';

interface ProblemProps {
  problem: ProblemType
}

function Problem({ problem }: ProblemProps) {
  const {
    title, levelText, submitCount, typeList, content,
    input, output, inputOutputList, answerRate, timeout,
    memoryLimit, answerCount, answerPeopleCount,
    limit, hint, subTask, subTaskList,
    customExample, customImplementation, customGrader,
    customNotes, customAttachment,
    problemSource,
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

      {customExample && (
        <>
          <div className="my-8 opacity-0" />
          <ProblemContentWrapper
            title="예시"
            content={customExample}
          />
        </>
      )}

      {customImplementation && (
        <>
          <div className="my-8 opacity-0" />
          <ProblemContentWrapper
            title="구현"
            content={customImplementation}
          />
        </>
      )}

      {customGrader && (
        <>
          <div className="my-8 opacity-0" />
          <ProblemContentWrapper
            title="예제"
            content={customGrader}
          />
        </>
      )}
      {input && output && (
        <>
          <ProblemInputOutput
            input={input}
            output={output}
            scale={(problemContentSize / 100)}
          />
          <div className="my-8 opacity-0" />
          <ProblemInputOutputList
            inputOutputList={inputOutputList}
          />
        </>
      )}

      {limit && (
        <>
          <div className="my-8 opacity-0" />
          <ProblemContentWrapper
            title="제한"
            content={limit}
          />
        </>
      )}

      {subTaskList.map((subTask) => (
        <>
          <div className="my-8 opacity-0" />
          <ProblemContentWrapper
            title={subTask.title}
            content={subTask.content}
          />
        </>
      ))}

      {customNotes && (
        <>
          <div className="my-8 opacity-0" />
          <ProblemContentWrapper
            title="테스트용 입력 형식"
            content={customNotes}
          />
        </>
      )}

      {customAttachment && (
        <>
          <div className="my-8 opacity-0" />
          <ProblemContentWrapper
            title="첨부파일"
            content={customAttachment}
          />
        </>
      )}
      {hint && (
      <>
        <div className="my-8 opacity-0" />
        <ProblemContentWrapper
          title="힌트"
          content={hint}
        />
      </>
      )}

      <div className="my-8 opacity-0" />
      {problemSource ? (
        <ProblemContentWrapper
          title="출처"
          content={problemSource}
        />
      ) : (
        <ProblemSource />
      )}
    </div>
  );
}

export default React.memo(Problem);
