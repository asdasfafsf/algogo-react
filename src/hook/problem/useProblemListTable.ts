import { useCallback, useEffect } from 'react';
import {
  PROBLEM_SORT_DEFAULT,
  PROBLEM_SORT_ANSWER_RATE_ASC,
  PROBLEM_SORT_ANSWER_RATE_DESC,
  PROBLEM_SORT_LEVEL_ASC,
  PROBLEM_SORT_LEVEL_DESC,
  PROBLEM_SORT_TITLE_ASC,
  PROBLEM_SORT_TITLE_DESC,
  PROBLEM_SORT_SUBMIT_COUNT_ASC,
  PROBLEM_SORT_SUBMIT_COUNT_DESC,
} from '@constant/ProblemSort';
import { useProblemListStore } from '@zustand/ProblemListStore';
import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import useDidMountEffect from '../useDidMount';

export default function useProblemListTable() {
  const {
    problemOptionList, problemSort, setProblemSort, setProblemTitle,
  } = useProblemTableFilterStore((
    {
      problemOptionList, problemSort, setProblemSort, setProblemTitle,
    },
  ) => ({
    problemOptionList, problemSort, setProblemSort, setProblemTitle,
  }));

  const {
    isFetching,
    problemList,
    pagingInfo,
    setPagingInfo,
    fetchProblemList,
  } = useProblemListStore((state) => ({
    isFetching: state.isFetching,
    problemList: state.problemList,
    pagingInfo: state.pagingInfo,
    setPagingInfo: state.setPagingInfo,
    fetchProblemList: state.fetchProblemList,
  }));

  useEffect(() => {
    fetchProblemList({ pageNo: 1, pageSize: 20 }, []);
  }, [fetchProblemList]);

  useDidMountEffect(() => {
    setPagingInfo({
      pageNo: 1,
      pageSize: 20,
    });
  }, [problemOptionList]);

  useDidMountEffect(() => {
    fetchProblemList(pagingInfo, problemOptionList);
  }, [pagingInfo]);

  useDidMountEffect(() => {
    fetchProblemList(pagingInfo, problemOptionList, problemSort);
  }, [problemSort]);

  const handleClickProblem = useCallback(
    (_e: React.MouseEvent<HTMLElement>, problemUuid: string) => {
      window.open(
        location.hostname === 'localhost'
          ? `http://localhost:5173/problem/${problemUuid}`
          : `https://www.algogo.co.kr/problem/${problemUuid}`,
        '_blank',
        'noopener, noreferrer',
      );
    },
    [],
  );

  const handleClickProblemTh = useCallback(
    (_e: React.MouseEvent<HTMLElement>, head: '제목' | '난이도' | '정답률' | '제출') => {
      setProblemSort((prevSort: ProblemSort) => {
        const sortMapping: Record<
        '제목' | '난이도' | '정답률' | '제출',
        ProblemSort[]
        > = {
          제목: [PROBLEM_SORT_TITLE_ASC, PROBLEM_SORT_TITLE_DESC, PROBLEM_SORT_DEFAULT],
          난이도: [PROBLEM_SORT_LEVEL_ASC, PROBLEM_SORT_LEVEL_DESC, PROBLEM_SORT_DEFAULT],
          정답률: [PROBLEM_SORT_ANSWER_RATE_ASC, PROBLEM_SORT_ANSWER_RATE_DESC, PROBLEM_SORT_DEFAULT],
          제출: [PROBLEM_SORT_SUBMIT_COUNT_ASC, PROBLEM_SORT_SUBMIT_COUNT_DESC, PROBLEM_SORT_DEFAULT],
        };

        const sorts = sortMapping[head];
        const currentIndex = sorts.indexOf(prevSort);
        const nextIndex = (currentIndex + 1) % sorts.length;
        return sorts[nextIndex];
      });
    },
    [],
  );

  return {
    isFetching,
    problemList,
    problemSort,
    handleClickProblem,
    handleClickProblemTh,
  };
}
