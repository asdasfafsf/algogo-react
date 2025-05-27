import React from 'react';
import { Line, Typography } from '@components/common/index';
import ProblemContent from './ProblemContent';

interface ProblemInputOutputProps {
  input: string;
  output: string;
  scale?: number;
}
export function ProblemInputOutput({ input, output, scale = 1 }: ProblemInputOutputProps) {
  return (
    <>
      <Line className="my-4 opacity-0" />
      <Typography
        scale={scale}
        variant="h5"
      >
        입력
      </Typography>
      <Line className="mt-2 mb-4" />

      <ProblemContent scale={scale} content={input} />

      <Line className="my-4 opacity-0" />
      <Typography
        scale={scale}
        variant="h5"
      >
        출력
      </Typography>
      <Line className="mt-2 mb-4" />
      <ProblemContent scale={scale} content={output} />

    </>
  );
}

export default React.memo(ProblemInputOutput);
