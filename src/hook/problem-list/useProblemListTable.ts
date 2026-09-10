import { useShallow } from "zustand/react/shallow";
import { useProblemListStore } from "@zustand/ProblemListStore";
import { useProblemTableFilterStore } from "@zustand/ProblemTableFilterStore";
import { useCallback, useEffect } from "react";
import useDidMountEffect from "../useDidMount";
import { DEFAULT_PROBLEM_PAGE, nextProblemSort } from "@/domain/problems";

export default function useProblemListTable() {
  const problemOptionList = useProblemTableFilterStore(
    (state) => state.problemOptionList,
  );
  const problemSort = useProblemTableFilterStore((state) => state.problemSort);
  const problemHidden = useProblemTableFilterStore(
    (state) => state.problemHidden,
  );
  const setProblemSort = useProblemTableFilterStore(
    (state) => state.setProblemSort,
  );
  const {
    error,
    isFetching,
    problemList,
    pagingInfo,
    setPagingInfo,
    fetchProblemList,
  } = useProblemListStore(
    useShallow((state) => ({
      error: state.error,
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
    setPagingInfo({ ...DEFAULT_PROBLEM_PAGE });
  }, [problemOptionList]);

  useDidMountEffect(() => {
    const { problemTitle } = useProblemTableFilterStore.getState();
    fetchProblemList(pagingInfo, problemOptionList, problemSort, problemTitle);
  }, [pagingInfo, problemSort]);

  const handleClickProblem = useCallback(
    (_e: React.MouseEvent<HTMLElement>, problemUuid: string) => {
      window.open(
        `${window.location.origin}/problem/${problemUuid}`,
        "_blank",
        "noopener, noreferrer",
      );
    },
    [],
  );
  const handleClickProblemTh = useCallback(
    (
      _e: React.MouseEvent<HTMLElement>,
      head: "제목" | "난이도" | "정답률" | "제출",
    ) => {
      setProblemSort((prevSort) => {
        return nextProblemSort(prevSort, head) as ProblemSort;
      });
    },
    [setProblemSort],
  );

  const handleRetryProblemList = useCallback(() => {
    const { problemTitle } = useProblemTableFilterStore.getState();
    void fetchProblemList(
      pagingInfo,
      problemOptionList,
      problemSort,
      problemTitle,
    );
  }, [fetchProblemList, pagingInfo, problemOptionList, problemSort]);

  return {
    error,
    isFetching,
    problemList,
    problemSort,
    problemHidden,
    handleClickProblem,
    handleClickProblemTh,
    handleRetryProblemList,
  };
}
