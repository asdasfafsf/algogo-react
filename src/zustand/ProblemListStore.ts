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
  error: string | null;
  totalCount: number;
  setFetching: (updater: Updater<boolean>) => void | Promise<void>;
  fetchProblemList: (
    pagingInfo: PagingInfo,
    problemOptionList: ProblemOption[],
    problemSort?: ProblemSort,
    problemTitle?: string,
  ) => Promise<void> | void;
};

const PROBLEM_LIST_ERROR_MESSAGE =
  "네트워크 상태를 확인한 뒤 다시 시도해 주세요.";
let latestProblemListRequestId = 0;

export const useProblemListStore = create<ProblemListStore>((set, get) => ({
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
  error: null,
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
    const requestId = ++latestProblemListRequestId;
    const { pageNo, pageSize } = pagingInfo;
    const showSkeletonImmediately = pageNo === 1 || get().error !== null;

    set({
      error: null,
      ...(showSkeletonImmediately ? { isFetching: true } : {}),
    });

    const setProblemListError = (message = PROBLEM_LIST_ERROR_MESSAGE) => {
      set({
        problemList: [],
        maxPageNo: 0,
        totalCount: 0,
        error: message,
      });
    };

    const skeletonTimeout = setTimeout(
      () => {
        if (requestId === latestProblemListRequestId) {
          set({ isFetching: true });
        }
      },
      showSkeletonImmediately ? 0 : 200,
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
      if (requestId !== latestProblemListRequestId) return;

      if (
        response.statusCode !== 200 ||
        !response.data ||
        !Array.isArray(response.data.problemList) ||
        typeof response.data.totalCount !== "number"
      ) {
        setProblemListError(response.errorMessage || undefined);
        return;
      }
      clearTimeout(skeletonTimeout);
      const { data } = response;
      const { problemList, totalCount } = data;
      const maxPageNo = calculateMaxPage(totalCount, pageSize);
      set(() => ({
        problemList,
        maxPageNo,
        totalCount,
        isFetching: false,
        error: null,
      }));
    } catch {
      if (requestId === latestProblemListRequestId) {
        setProblemListError();
      }
    } finally {
      clearTimeout(skeletonTimeout);
      if (requestId === latestProblemListRequestId) {
        set({ isFetching: false });
      }
    }
  },
}));

export default useProblemListStore;
