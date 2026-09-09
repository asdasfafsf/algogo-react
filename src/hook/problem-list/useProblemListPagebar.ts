import React, { useCallback } from 'react';
import useProblemListStore from '@zustand/ProblemListStore';
import { changeProblemPage } from '@/domain/problems';

export default function useProblemListPagebar() {
  const pagingInfo = useProblemListStore(state => state.pagingInfo);
  const setPagingInfo = useProblemListStore(state => state.setPagingInfo);
  const maxPageNo = useProblemListStore(state => state.maxPageNo);

  const handleChangePageNo = useCallback(
    (_: React.MouseEvent<HTMLElement>, pageNo: number) => {
      setPagingInfo(pagingInfo =>
        changeProblemPage(pagingInfo, pageNo, maxPageNo),
      );
    },
    [setPagingInfo, maxPageNo],
  );

  return {
    pagingInfo,
    maxPageNo,
    handleChangePageNo,
  };
}
