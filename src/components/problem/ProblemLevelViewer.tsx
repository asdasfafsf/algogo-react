/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@components/common/index';
import useProblemLevelViewer from '@hook/useProblemLevelViewer';
import React from 'react';
import { Tooltip } from 'react-tooltip';
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
        className="flex flex-wrap items-center w-32 cursor-pointer"
      >
        <Typography variant="small" className="font-bold">난이도 : </Typography>
  &nbsp;
        {levelState === 'hide' ? <ProblemLevelChip level="숨김" /> : <ProblemLevelChip level={level} />}

      </div>
    </Tooltip>
  );
}

export default React.memo(ProblemLevelViewer);
