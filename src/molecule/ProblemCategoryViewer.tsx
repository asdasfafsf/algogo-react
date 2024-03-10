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

    <div className="min-h-12 my-4">
      <div className="lex items-center flex-wrap">
        {/* <Typography variant="small" className="font-bold mx-2 h-full w-8">유형 </Typography> */}
        <Tooltip
          content={tooltipContent}
          placement="left"
        >
          <div
            onClick={handleClick}
            className="flex flex-wrap gap-1 w-[calc(100%-48px)] cursor-pointer"
          >
            {categoryState === 'hide'
              ? <ProblemCategoryChip category="숨김" />
              : categoryState === 'none'
                ? <ProblemCategoryChip category="알 수 없음" />
                : categoryList.map((category) => <ProblemCategoryChip category={category} />)}
          </div>
        </Tooltip>
      </div>
    </div>

  );
}
