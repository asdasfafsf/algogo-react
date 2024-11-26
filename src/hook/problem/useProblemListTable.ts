import { useCallback, useEffect, useState } from 'react';
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
import { useProblemTableFilterStore } from '../../zustand/ProblemTableFilterStore';

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
    maxPageNo,
    setPagingInfo,
    fetchProblemList,
  } = useProblemListStore((state) => ({
    isFetching: state.isFetching,
    problemList: state.problemList,
    pagingInfo: state.pagingInfo,
    maxPageNo: state.maxPageNo,
    setPagingInfo: state.setPagingInfo,
    fetchProblemList: state.fetchProblemList,
  }));

  const [isOpenGrade] = useState(false);

  useEffect(() => {
    fetchProblemList(1, []);
  }, [fetchProblemList]);

  const handleChangePageNo = useCallback(async (
    _e: React.MouseEvent<HTMLButtonElement>,
    pageNo: number,
  ) => {
    if (pageNo === pagingInfo.pageNo) {
      return;
    }

    if (pageNo < 0 || pageNo > maxPageNo) {
      return;
    }

    setPagingInfo((prev) => ({ ...prev, pageNo }));
  }, [pagingInfo]);

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

  const handleChangeProblemTitle = useCallback(
    (
      _: React.ChangeEvent<HTMLElement>,
      value: string,
    ) => {
      setProblemTitle(value);
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
