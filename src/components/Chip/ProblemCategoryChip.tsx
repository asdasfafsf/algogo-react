import Chip from './Chip';

interface ProblemCategoryChipProps {
  category: ProblemCategory
}

export default function ProblemCategoryChip({ category } : ProblemCategoryChipProps) {
  return (
    <Chip
      variant="ghost"
      color={(category === '알 수 없음') ? 'blue' : category === '알고리즘 유형 숨김' ? 'gray' : 'red'}
    //   size="sm"
      value={category}
    />
  );
}
