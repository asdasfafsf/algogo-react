import { useCallback, useEffect, useState } from 'react';

export default function useCategoryViewer(initialState: ProblemCategoryState = 'hide') {
  const [categoryState, setCategoryState] = useState<ProblemCategoryState>(initialState);
  const [tooltipContent, setTootipContent] = useState(initialState === 'hide' ? '보기' : '숨기기');
  const handleClick = useCallback(() => {
    if (categoryState === 'hide') {
      setCategoryState('view');
    } else if (categoryState === 'view') {
      setCategoryState('hide');
    } else if (categoryState === 'none') {
      setCategoryState('none');
    }
  }, [categoryState]);

  useEffect(() => {
    if (categoryState === 'hide') {
      setTootipContent('보기');
    } else if (categoryState === 'view') {
      setTootipContent('숨기기');
    } else if (categoryState === 'none') {
      setTootipContent('알 수 없음');
    }
  }, [categoryState]);

  return [categoryState, tooltipContent, handleClick] as const;
}
