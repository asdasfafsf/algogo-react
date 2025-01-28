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
import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import { collectProblem } from '@api/problems';
import useDidMountEffect from '../useDidMount';
import usePromptModal from '../modal/usePromptModal';
import useAlertModal from '../useAlertModal';
import useConfirmModal from '../useConfirmModal';

export default function useProblemListTable() {
  const problemOptionList = useProblemTableFilterStore((state) => state.problemOptionList);
  const problemSort = useProblemTableFilterStore((state) => state.problemSort);
  const setProblemSort = useProblemTableFilterStore((state) => state.setProblemSort);
  const [prompt] = usePromptModal();
  const [alert] = useAlertModal();
  const [confirm] = useConfirmModal();

  const [isSearching, setSearching] = useState(false);

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
    const { problemTitle } = useProblemTableFilterStore.getState();
    fetchProblemList(pagingInfo, problemOptionList, problemSort, problemTitle);
  }, [pagingInfo, problemSort]);

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

  const handleClickProblemCollectModal = useCallback(async () => {
    setSearching(true);
    const res = await prompt('URL을 입력하세요', false, 'URL 입력');

    if (res === false) {
      setSearching(false);
      return;
    }

    const url = res as string;

    if (!url.includes('https://www.acmicpc.net/problem/')) {
      await alert('지원하지 않는 사이트의 url입니다.');
      setSearching(false);
      return;
    }

    const collectResult = await collectProblem({ url });

    if (collectResult.errorCode !== '0000') {
      await alert(collectResult.errorMessage);
      setSearching(false);
      return;
    }

    const isOk = await confirm('추가가 완료되었습니다. 새 페이지로 이동할까요?');
    if (isOk) {
      window.open(`/problem/${collectResult.data}`);
    }

    setSearching(false);
  }, [setSearching]);

  return {
    isSearching,
    isFetching,
    problemList,
    problemSort,
    handleClickProblem,
    handleClickProblemTh,
    handleClickProblemCollectModal,
  };
}
