import { useShallow } from 'zustand/react/shallow';
// import { collectProblem } from '@api/problems';
import { useProblemListStore } from '@zustand/ProblemListStore';
import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import { useCallback, useEffect, useState } from 'react';
import useAlertModal from '../useAlertModal';
// import usePromptModal from '../modal/usePromptModal';
// import useConfirmModal from '../useConfirmModal';
import useDidMountEffect from '../useDidMount';
import { DEFAULT_PROBLEM_PAGE, nextProblemSort } from '@/domain/problems';

export default function useProblemListTable() {
  const problemOptionList = useProblemTableFilterStore(
    state => state.problemOptionList,
  );
  const problemSort = useProblemTableFilterStore(state => state.problemSort);
  const problemHidden = useProblemTableFilterStore(
    state => state.problemHidden,
  );
  const setProblemSort = useProblemTableFilterStore(
    state => state.setProblemSort,
  );
  const [alert] = useAlertModal();
  // const [prompt] = usePromptModal();
  // const [confirm] = useConfirmModal();

  const [isSearching, setSearching] = useState(false);

  const {
    isFetching,
    problemList,
    pagingInfo,
    setPagingInfo,
    fetchProblemList,
  } = useProblemListStore(
    useShallow(state => ({
      isFetching: state.isFetching,
      problemList: state.problemList,
      pagingInfo: state.pagingInfo,
      setPagingInfo: state.setPagingInfo,
      fetchProblemList: state.fetchProblemList,
    })),
  );

  useEffect(() => {
    fetchProblemList(DEFAULT_PROBLEM_PAGE, []);
  }, [fetchProblemList]);

  useDidMountEffect(() => {
    setPagingInfo(DEFAULT_PROBLEM_PAGE);
  }, [problemOptionList]);

  useDidMountEffect(() => {
    const { problemTitle } = useProblemTableFilterStore.getState();
    fetchProblemList(pagingInfo, problemOptionList, problemSort, problemTitle);
  }, [pagingInfo, problemSort]);

  const handleClickProblem = useCallback(
    (_e: React.MouseEvent<HTMLElement>, problemUuid: string) => {
      window.open(
        `${window.location.origin}/problem/${problemUuid}`,
        '_blank',
        'noopener, noreferrer',
      );
    },
    [],
  );
  const handleClickProblemTh = useCallback(
    (
      _e: React.MouseEvent<HTMLElement>,
      head: '제목' | '난이도' | '정답률' | '제출',
    ) => {
      setProblemSort(prevSort => {
        return nextProblemSort(prevSort, head) as ProblemSort;
      });
    },
    [setProblemSort],
  );

  const handleClickProblemCollectModal = useCallback(async () => {
    await alert('준비중입니다.');

    // setSearching(true);
    // const res = await prompt('URL을 입력하세요', false, 'URL 입력');

    // if (res === false) {
    //   setSearching(false);
    //   return;
    // }

    // const url = res as string;

    // if (!url.includes('https://www.acmicpc.net/problem/')) {
    //   await alert('지원하지 않는 사이트의 url입니다.');
    //   setSearching(false);
    //   return;
    // }

    // const collectResult = await collectProblem({ url });

    // if (collectResult.errorCode !== '0000') {
    //   await alert(collectResult.errorMessage);
    //   setSearching(false);
    //   return;
    // }

    // const isOk = await confirm('추가가 완료되었습니다. 새 페이지로 이동할까요?');
    // if (isOk) {
    //   window.open(`/problem/${collectResult.data}`);
    // }

    // setSearching(false);
  }, [setSearching]);

  return {
    isSearching,
    isFetching,
    problemList,
    problemSort,
    problemHidden,
    handleClickProblem,
    handleClickProblemTh,
    handleClickProblemCollectModal,
  };
}
