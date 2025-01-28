import React from 'react';
import { Typography, MathJaxNode } from '@components/common/index';
import ProblemImage from './ProblemImage';

interface ProblemContentProps {
  contentList: ResponseProblemContent[];
  scale?: number;
}

function ProblemContent({ contentList, scale = 1 }: ProblemContentProps) {
  return (
    <>
      {contentList.map((elem, index) => (
        elem.type === 'image' ? (
          <ProblemImage
            className="mt-1"
            alt={elem.content}
            key={`image-${index}`}
            src={elem.content}
          />
        ) : (
          <Typography
            key={`content-${index}`}
            variant="paragraph"
            className="mt-1 font-normal"
            scale={scale}
          >
            <MathJaxNode>{elem.content}</MathJaxNode>
          </Typography>
        )
      ))}
    </>
  );
}

export default React.memo(ProblemContent);
