/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ProblemCategoryChip } from '@components/Chip/index';
import useProblemCategoryViewer from '@hook/useProblemCategoryViewer';
import React from 'react';
import { Tooltip } from '@components/common/index';

interface ProblemCategoryProps {
  initialState: ProblemCategoryState;
  categoryList: string[]
}

export function ProblemCategoryViewer(
  { initialState = 'hide', categoryList }: ProblemCategoryProps,
) {
  const [categoryState, tooltipContent, handleClick] = useProblemCategoryViewer(initialState);

  return (
    <div className="min-h-12 my-2">

      <div className="flex items-center">
        <Tooltip
          content={tooltipContent}
          placement="top-start"
        >
          {/* <Typography variant="small" className="w-8 h-full mx-2 font-bold">유형 </Typography> */}

          <div
            onClick={handleClick}
            className="flex  gap-1 cursor-pointer"
          >
            {categoryState === 'hide'
              ? <ProblemCategoryChip category="알고리즘 유형 숨김" />
              : categoryState === 'none'
                ? <ProblemCategoryChip category="알 수 없음" />
                : categoryList.map((category) => (
                  <ProblemCategoryChip
                    key={category}
                    category={category}
                  />
                ))}
          </div>
        </Tooltip>
      </div>
    </div>

  );
}

export default React.memo(ProblemCategoryViewer);
