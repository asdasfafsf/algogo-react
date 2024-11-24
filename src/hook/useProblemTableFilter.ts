// src/hooks/useProblemTableFilter.ts

import { useCallback } from 'react';
import { useProblemTableFilterStore } from '../zustand/ProblemTableFilterStore';

function useProblemTableFilter() {
  const problemTitle = useProblemTableFilterStore((state) => state.problemTitle);
  const problemOptionList = useProblemTableFilterStore((state) => state.problemOptionList);
  const problemSort = useProblemTableFilterStore((state) => state.problemSort);

  const setProblemTitle = useProblemTableFilterStore((state) => state.setProblemTitle);
  const setProblemOptionList = useProblemTableFilterStore((state) => state.setProblemOptionList);
  const setProblemSort = useProblemTableFilterStore((state) => state.setProblemSort);

  const resetProblemOptions = useCallback(() => {
    setProblemOptionList([]);
  }, [setProblemOptionList]);

  const removeProblemOption = useCallback(
    (index: number) => {
      setProblemOptionList((prevList) => [
        ...prevList.slice(0, index),
        ...prevList.slice(index + 1),
      ]);
    },
    [setProblemOptionList],
  );

  return {
    problemTitle,
    problemOptionList,
    problemSort,
    setProblemTitle,
    setProblemOptionList,
    setProblemSort,
    resetProblemOptions,
    removeProblemOption,
  };
}

export default useProblemTableFilter;
