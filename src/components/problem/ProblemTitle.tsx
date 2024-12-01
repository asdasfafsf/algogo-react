import {
  Typography, Line,
} from '@components/common/index';
import React from 'react';

interface ProblemTitleProps {
  title: string
}
function ProblemTitle({ title }: ProblemTitleProps) {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Line className="my-2" />
    </>
  );
}

export default React.memo(ProblemTitle);
