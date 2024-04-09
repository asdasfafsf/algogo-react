/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Tooltip } from '@material-tailwind/react';
import ProblemCategoryChip from '../atom/ProblemCategoryChip';
import useProblemCategoryViewer from '../hook/useProblemCategoryViewer';

interface ProblemCategoryProps {
  initialState: ProblemCategoryState;
  categoryList: ProblemCategory[]
}

export default function ProblemCategoryViewer(
  { initialState = 'hide', categoryList }: ProblemCategoryProps,
) {
  const [categoryState, tooltipContent, handleClick] = useProblemCategoryViewer(initialState);

  return (
    <Tooltip
      content={tooltipContent}
      placement="top-start"
    >
      <div className="min-h-12 my-4 max-w-[calc(100%-48px)] ">

        <div className="lex items-center flex-wrap max-w-[calc(100%-48px)] ">
          {/* <Typography variant="small" className="font-bold mx-2 h-full w-8">유형 </Typography> */}

          <div
            onClick={handleClick}
            className="flex flex-wrap gap-1 w-full cursor-pointer"
          >
            {categoryState === 'hide'
              ? <ProblemCategoryChip category="알고리즘 유형 숨김" />
              : categoryState === 'none'
                ? <ProblemCategoryChip category="알 수 없음" />
                : categoryList.map((category) => <ProblemCategoryChip category={category} />)}
          </div>
        </div>
      </div>
    </Tooltip>

  );
}
