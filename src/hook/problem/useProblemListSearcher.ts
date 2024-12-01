import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import { useCallback } from 'react';
import { useProblemListStore } from '@zustand/ProblemListStore';

export default function useProblemListSearcher() {
  const setProblemTitle = useProblemTableFilterStore((state) => state.setProblemTitle);

  const handleChangeProblemTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProblemTitle(e.target.value);
  }, [setProblemTitle]);

  const setPagingInfo = useProblemListStore((state) => state.setPagingInfo);

  const handleClickSearch = useCallback(() => {
    setPagingInfo((prev) => ({ ...prev, pageNo: 1 }));
  }, [setPagingInfo]);

  return {
    handleChangeProblemTitle,
    handleClickSearch,
  };
}
