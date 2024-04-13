/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Tooltip, Typography } from '@material-tailwind/react';
import ProblemLevelChip from '../atom/ProblemLevelChip';
import useProblemLevelViewer from '../hook/useProblemLevelViewer';

interface ProblemLevelViewerProps {
  intialState: ProblemCategoryState;
  level: ProblemLevel
}

export default function ProblemLevelViewer({ intialState, level }: ProblemLevelViewerProps) {
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
