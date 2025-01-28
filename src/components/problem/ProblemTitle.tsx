import {
  Typography, Line,
} from '@components/common/index';
import React from 'react';

interface ProblemTitleProps {
  title: string,
  scale?: number
}
function ProblemTitle({ title, scale = 1 }: ProblemTitleProps) {
  return (
    <>
      <div className="flex items-center">
        <Typography
          scale={scale}
          variant="h4"
        >
          {title}
        </Typography>
      </div>
      <Line className="my-2" />
    </>
  );
}

export default React.memo(ProblemTitle);
