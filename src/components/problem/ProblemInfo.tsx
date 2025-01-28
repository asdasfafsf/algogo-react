import React from 'react';
import { Typography } from '@components/common/index';
import ProblemLevelViewer from './ProblemLevelViewer';

interface ProblemInfoProps {
  levelText: ProblemLevel,
  submitCount: number;
  answerCount: number;
  answerRate: number;
  timeout: number;
  memoryLimit: number;
  answerPeopleCount: number;
}
function ProblemInfo({
  levelText, submitCount, answerCount, answerPeopleCount, answerRate, memoryLimit, timeout,
}: ProblemInfoProps) {
  return (
    <div className="my-2 min-h-4">
      <div className="flex flex-wrap items-center gap-1 jus">
        <ProblemLevelViewer intialState="hide" level={levelText} />
        <div className="flex flex-wrap items-center">
          <Typography variant="medium" className="font-bold">제출 : </Typography>
        &nbsp;
          <Typography variant="medium" className="font-medium">
            {submitCount}
          </Typography>
        </div>
      &nbsp;

        <div className="flex flex-wrap items-center">
          <Typography variant="medium" className="font-bold">정답 : </Typography>
        &nbsp;
          <Typography variant="medium" className="font-medium">{answerCount}</Typography>
        </div>
      &nbsp;
        <div className="flex flex-wrap items-center">
          <Typography variant="medium" className="font-bold">맞힌 사람 : </Typography>
        &nbsp;
          <Typography variant="medium" className="font-medium">{answerPeopleCount}</Typography>
        </div>
      &nbsp;
        <div className="flex flex-wrap items-center">
          <Typography variant="medium" className="font-bold">정답률 : </Typography>
        &nbsp;
          <Typography variant="medium" className="font-medium">
            {answerRate}
            %
          </Typography>
        </div>
      &nbsp;
        <div className="flex flex-wrap items-center">
          <Typography variant="medium" className="font-bold">시간 제한 : </Typography>
        &nbsp;
          <Typography variant="medium" className="font-medium">
            {timeout}
            {' '}
            ms
          </Typography>
        </div>
      &nbsp;
        <div className="flex flex-wrap items-center">
          <Typography variant="medium" className="font-bold"> 메모리 제한 : </Typography>
        &nbsp;
          <Typography variant="medium" className="font-medium">
            {memoryLimit}
            {' '}
            MB
          </Typography>
        </div>
      &nbsp;
      </div>
    </div>
  );
}

export default React.memo(ProblemInfo);
