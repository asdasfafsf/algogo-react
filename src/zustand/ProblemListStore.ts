import { create } from "zustand";
import { getProblemList } from "@api/problems-v2";
import { PROBLEM_SORT_DEFAULT } from "@constant/ProblemSort";
import { ProblemState, ProblemSummary, ProblemType } from "@/type/Problem.type";
import {
  buildProblemListRequest,
  calculateMaxPage,
  type ProblemPaging,
} from "@/domain/problems";

type PagingInfo = ProblemPaging;

type ProblemListStore = {
  problemList: ProblemSummary[];
  setProblemList: (updater: Updater<ProblemSummary[]>) => void | Promise<void>;
  pagingInfo: PagingInfo;
  setPagingInfo: (updater: Updater<PagingInfo>) => void | Promise<void>;
  maxPageNo: number;
  setMaxPageNo: (updater: Updater<number>) => void | Promise<void>;
  isFetching: boolean;
  totalCount: number;
  setFetching: (updater: Updater<boolean>) => void | Promise<void>;
  fetchProblemList: (
    pagingInfo: PagingInfo,
    problemOptionList: ProblemOption[],
    problemSort?: ProblemSort,
    problemTitle?: string,
  ) => Promise<void> | void;
};

export const useProblemListStore = create<ProblemListStore>((set) => ({
  problemList: [],
  setProblemList: (updater) =>
    set((state) => ({
      problemList:
        typeof updater === "function"
          ? (updater as (prev: ProblemSummary[]) => ProblemSummary[])(
              state.problemList,
            )
          : updater,
    })),
  pagingInfo: {
    pageNo: 1,
    pageSize: 20,
  },
  setPagingInfo: (updater) =>
    set((state) => ({
      pagingInfo:
        typeof updater === "function"
          ? (updater as (prev: PagingInfo) => PagingInfo)(state.pagingInfo)
          : updater,
    })),
  maxPageNo: 1,
  totalCount: 0,
  setMaxPageNo: (updater) =>
    set((state) => ({
      maxPageNo:
        typeof updater === "function"
          ? (updater as (prev: number) => number)(state.maxPageNo)
          : updater,
    })),
  isFetching: true,
  setFetching: (updater) =>
    set((state) => ({
      isFetching:
        typeof updater === "function"
          ? (updater as (prev: boolean) => boolean)(state.isFetching)
          : updater,
    })),

  fetchProblemList: async (
    pagingInfo: PagingInfo,
    problemOptionList: ProblemOption[],
    problemSort: ProblemSort = PROBLEM_SORT_DEFAULT,
    problemTitle: string = "",
  ) => {
    const { pageNo, pageSize } = pagingInfo;

    const skeletonTimeout = setTimeout(
      () => {
        set({ isFetching: true });
      },
      pageNo === 1 ? 0 : 200,
    );

    try {
      const request = buildProblemListRequest(
        pagingInfo,
        problemOptionList,
        problemSort,
        problemTitle,
      );
      const response = await getProblemList({
        ...request,
        typeList: request.typeList as ProblemType[],
        states: request.states as ProblemState[],
        sort: request.sort as ProblemSort,
      });
      clearTimeout(skeletonTimeout);
      const { data } = response;
      const { problemList, totalCount } = data;
      const maxPageNo = calculateMaxPage(totalCount, pageSize);
      set(() => ({
        problemList,
        maxPageNo,
        totalCount,
        isFetching: false,
      }));
    } finally {
      clearTimeout(skeletonTimeout);
      set(() => ({ isFetching: false }));
    }
  },
}));

export default useProblemListStore;
