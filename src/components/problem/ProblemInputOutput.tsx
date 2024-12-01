import React from 'react';
import { Line, Typography, MathJaxNode } from '@components/common/index';

interface ProblemInputOutputProps {
  input: string;
  output: string;
}
export function ProblemInputOutput({ input, output }: ProblemInputOutputProps) {
  return (
    <>
      <Line className="my-4 opacity-0" />
      <Typography variant="h5">입력</Typography>
      <Line className="mt-2 mb-4" />

      <Typography variant="paragraph" className="font-normal">
        <MathJaxNode>{input}</MathJaxNode>
      </Typography>

      <Line className="my-4 opacity-0" />
      <Typography variant="h5">출력</Typography>
      <Line className="mt-2 mb-4" />

      <Typography variant="paragraph" className="font-normal">
        <MathJaxNode>{output}</MathJaxNode>
      </Typography>
    </>
  );
}

export default React.memo(ProblemInputOutput);
