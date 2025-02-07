/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography, Tooltip } from '@components/common/index';
import useProblemLevelViewer from '@hook/useProblemLevelViewer';
import React from 'react';
import { ProblemLevelChip } from '../Chip';

interface ProblemLevelViewerProps {
  intialState: ProblemCategoryState;
  level: ProblemLevel
}

function ProblemLevelViewer({ intialState, level }: ProblemLevelViewerProps) {
  const [levelState, tooltipContent, handleClick] = useProblemLevelViewer(intialState);
  return (
    <Tooltip
      content={tooltipContent}
    >
      <div
        onClick={handleClick}
        className="flex flex-wrap items-center mr-1 cursor-pointer"
      >
        <Typography variant="medium" className="font-bold whitespace-nowrap">난이도 : </Typography>
        <span className="ml-1">
          {levelState === 'hide' ? <ProblemLevelChip level="숨김" /> : <ProblemLevelChip level={level} />}
        </span>
      </div>
    </Tooltip>
  );
}

export default React.memo(ProblemLevelViewer);
