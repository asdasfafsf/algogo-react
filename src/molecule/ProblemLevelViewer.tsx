import { Tooltip, Typography } from '@material-tailwind/react';
import ProblemLevelChip from '../atom/ProblemLevelChip';

export default function ProblemLevelViewer() {
  return (
    <Tooltip
      content="난이도 보기"
    >
      <div className="flex flex-wrap items-center cursor-pointer w-28">
        <Typography variant="small" className="font-bold">난이도 : </Typography>
  &nbsp;
        <ProblemLevelChip />
      </div>
    </Tooltip>
  );
}
