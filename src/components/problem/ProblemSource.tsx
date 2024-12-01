import React from 'react';
import { Typography, Line } from '@components/common/index';

function ProblemSource() {
  return (
    <>
      <Typography variant="h5">출처</Typography>
      <Line className="my-2" />
    </>
  );
}

export default React.memo(ProblemSource);
