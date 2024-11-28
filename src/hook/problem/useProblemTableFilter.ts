// src/hooks/useProblemTableFilter.ts

import { useCallback } from 'react';
import { useProblemTableFilterStore } from '../../zustand/ProblemTableFilterStore';

function useProblemTableFilter() {
  const problemOptionList = useProblemTableFilterStore((state) => state.problemOptionList);
  const problemSort = useProblemTableFilterStore((state) => state.problemSort);

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
    problemOptionList,
    problemSort,
    setProblemOptionList,
    setProblemSort,
    resetProblemOptions,
    removeProblemOption,
  };
}

export default useProblemTableFilter;
