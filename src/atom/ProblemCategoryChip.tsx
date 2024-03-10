import { Chip } from '@material-tailwind/react';

interface ProblemCategoryChipProps {
  category: ProblemCategory
}

export default function ProblemCategoryChip({ category } : ProblemCategoryChipProps) {
  return (
    <Chip
      variant="ghost"
      color={(category === '알 수 없음' || category === '숨김') ? 'gray' : 'red'}
      size="sm"
      value={category}
    />
  );
}
