import React, { useCallback } from 'react';
import useProblemListStore from '@zustand/ProblemListStore';

export default function useProblemListPagebar() {
  const pagingInfo = useProblemListStore((state) => state.pagingInfo);
  const setPagingInfo = useProblemListStore((state) => state.setPagingInfo);
  const maxPageNo = useProblemListStore((state) => state.maxPageNo);


  const handleChangePageNo = useCallback((_: React.MouseEvent<HTMLElement>, pageNo: number) => {
    if (pageNo < 1 || pageNo > maxPageNo) {
      return;
    }

    setPagingInfo((pagingInfo) => ({ ...pagingInfo, pageNo }));
  }, [setPagingInfo, maxPageNo]);

  return {
    pagingInfo,
    maxPageNo,
    handleChangePageNo,
  };
}
