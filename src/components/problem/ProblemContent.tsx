import React from 'react';
import { Typography, MathJaxNode } from '@components/common/index';
import ProblemImage from './ProblemImage';
import ProblemContentTable from './ProblemContentTable';

interface ProblemContentProps {
  contentList: ResponseProblemContent[];
  scale?: number;
}

function ProblemContent({ contentList, scale = 1 }: ProblemContentProps) {
  return (
    <>
      {contentList.map((elem, index) => {
        if (elem.type === 'table') {
          return <ProblemContentTable cellList={elem.cellList} />;
        } if (elem.type === 'list') {
          return (

            <Typography
              key={`content-${index}`}
              variant="paragraph"
              className="font-normal leading-[2rem] my-2"
              scale={scale}
            >
              -
              {' '}
              <MathJaxNode>{elem.content}</MathJaxNode>
            </Typography>

          );
        } if (elem.type === 'image') {
          return (
            <ProblemImage
              className="my-1"
              alt={elem.content}
              key={`image-${index}`}
              src={elem.content}
            />
          );
        }

        return (
          <Typography
            key={`content-${index}`}
            variant="paragraph"
            className="font-normal leading-[2rem] my-2"
            scale={scale}
          >
            <MathJaxNode>{elem.content}</MathJaxNode>
          </Typography>
        );
      })}
    </>
  );
}

export default React.memo(ProblemContent);
