import React, { useCallback } from 'react';
import useProblemListStore from '@zustand/ProblemListStore';

export default function useProblemListPagebar() {
  const {
    pagingInfo,
    setPagingInfo,
    maxPageNo,
  } = useProblemListStore(({
    pagingInfo,
    setPagingInfo,
    maxPageNo,
  }) => ({
    pagingInfo,
    setPagingInfo,
    maxPageNo,
  }));

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
