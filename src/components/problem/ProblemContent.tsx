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
      {contentList.map((elem, index, arr) => (
        elem.type === 'image' ? (
          <ProblemImage
            className="my-1"
            alt={elem.content}
            key={`image-${index}`}
            src={elem.content}
          />
        ) : (
          <Typography
            key={`content-${index}`}
            variant="paragraph"
            className={`${index === 0 ? 'mb-4' : index === arr.length - 1 ? 'mt-4' : 'my-4'} font-normal`}
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
