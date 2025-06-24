import {
  Typography, Line,
} from '@components/common/index';
import React from 'react';
import { ProblemState } from '@/type/Problem.type';
import ProblemStateChip from '../Chip/ProblemStateChip';

interface ProblemTitleProps {
  title: string,
  scale?: number
  state?: ProblemState
}
function ProblemTitle({ title, scale = 1, state }: ProblemTitleProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Typography
          scale={scale}
          variant="h4"
        >
          {title}
        </Typography>
        {state && <ProblemStateChip state={state} value="" />}
      </div>
      <Line className="my-2" />
    </>
  );
}

export default React.memo(ProblemTitle);
