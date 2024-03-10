import { useCallback, useEffect, useState } from 'react';

export default function useProblemLevelViewer(initialState: ProblemCategoryState = 'hide') {
  const [levelState, setLevelState] = useState<ProblemCategoryState>(initialState);
  const [tooltipContent, setTootipContent] = useState(initialState === 'hide' ? '난이도 보기' : initialState === 'view' ? '숨기기' : '알 수 없음');
  const handleClick = useCallback(() => {
    if (levelState === 'hide') {
      setLevelState('view');
    } else if (levelState === 'view') {
      setLevelState('hide');
    } else if (levelState === 'none') {
      setLevelState('none');
    }
  }, [levelState]);

  useEffect(() => {
    if (levelState === 'hide') {
      setTootipContent('난이도 보기');
    } else if (levelState === 'view') {
      setTootipContent('난이도 숨기기');
    } else if (levelState === 'none') {
      setTootipContent('알 수 없음');
    }
  }, [levelState]);

  return [levelState, tooltipContent, handleClick] as const;
}
