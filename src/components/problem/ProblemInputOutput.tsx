import React from 'react';
import { Line, Typography, MathJaxNode } from '@components/common/index';

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

      <Typography
        scale={scale}
        variant="paragraph"
        className="font-normal !leading-[2.0rem] my-2"
      >
        <MathJaxNode>{input}</MathJaxNode>
      </Typography>

      <Line className="my-4 opacity-0" />
      <Typography
        scale={scale}
        variant="h5"
      >
        출력
      </Typography>
      <Line className="mt-2 mb-4" />

      <Typography
        scale={scale}
        variant="paragraph"
        className="font-normal !leading-[2.0rem] my-2"
      >
        <MathJaxNode>{output}</MathJaxNode>
      </Typography>
    </>
  );
}

export default React.memo(ProblemInputOutput);
