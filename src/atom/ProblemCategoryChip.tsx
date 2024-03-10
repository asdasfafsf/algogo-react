import { Chip } from '@material-tailwind/react';

interface ProblemCategoryChipProps {
  category: ProblemCategory
}

export default function ProblemCategoryChip({ category } : ProblemCategoryChipProps) {
  return (
    <Chip
      variant="ghost"
      color={(category === '알 수 없음') ? 'red' : category === '알고리즘 유형 숨김' ? 'gray' : 'green'}
      size="sm"
      value={category}
    />
  );
}
