import { create } from 'zustand';
import { getProblemList } from '@api/problems-v2';
import { PROBLEM_SORT_DEFAULT } from '@constant/ProblemSort';
import { ProblemSummary, ProblemType } from '@/type/Problem.type';

type PagingInfo = {
  pageNo: number;
  pageSize: number;
};

type ProblemListStore = {
  problemList: ProblemSummary[];
  setProblemList: (updater: Updater<ProblemSummary[]>) => void | Promise<void>;
  pagingInfo: PagingInfo;
  setPagingInfo: (updater: Updater<PagingInfo>) => void | Promise<void>;
  maxPageNo: number;
  setMaxPageNo: (updater: Updater<number>) => void | Promise<void>;
  isFetching: boolean;
  setFetching: (updater: Updater<boolean>) => void | Promise<void>;
  fetchProblemList: (
    pagingInfo: PagingInfo,
    problemOptionList: ProblemOption[],
    problemSort?: ProblemSort,
    problemTitle?: string) => Promise<void> | void

};

export const useProblemListStore = create<ProblemListStore>((set) => ({
  problemList: [],
  setProblemList: (updater) => set((state) => ({
    problemList:
        typeof updater === 'function'
          ? (updater as (prev: ProblemSummary[]) => ProblemSummary[])(state.problemList)
          : updater,
  })),
  pagingInfo: {
    pageNo: 1,
    pageSize: 20,
  },
  setPagingInfo: (updater) => set((state) => ({
    pagingInfo:
        typeof updater === 'function'
          ? (updater as (prev: PagingInfo) => PagingInfo)(state.pagingInfo)
          : updater,
  })),
  maxPageNo: 1,
  setMaxPageNo: (updater) => set((state) => ({
    maxPageNo:
        typeof updater === 'function'
          ? (updater as (prev: number) => number)(state.maxPageNo)
          : updater,
  })),
  isFetching: false,
  setFetching: (updater) => set((state) => ({
    isFetching:
        typeof updater === 'function'
          ? (updater as (prev: boolean) => boolean)(state.isFetching)
          : updater,
  })),

  fetchProblemList: async (
    pagingInfo: PagingInfo,
    problemOptionList: ProblemOption[],
    problemSort: ProblemSort = PROBLEM_SORT_DEFAULT,
    problemTitle: string = '',
  ) => {
    const { pageNo, pageSize } = pagingInfo;

    const skeletonTimeout = setTimeout(() => {
      set({ isFetching: true });
    }, pageNo === 1 ? 0 : 200);

    try {
      const response = await getProblemList({
        pageNo,
        pageSize,
        levelList: problemOptionList
          .filter((elem) => elem.isSelected && elem.type === '난이도')
          .map((elem) => elem.value)
          .map(Number),
        typeList: problemOptionList
          .filter((elem) => elem.isSelected && elem.type === '유형')
          .map((elem) => elem.value) as ProblemType[],
        sort: problemSort,
        title: problemTitle,
      });
      clearTimeout(skeletonTimeout);
      const { data } = response;
      const {
        problemList, totalCount,
      } = data;
      const maxPageNo = Math.ceil(totalCount / pageSize);
      set(() => ({
        problemList,
        maxPageNo,
        isFetching: false,
      }));
    } finally {
      clearTimeout(skeletonTimeout);
      set(() => ({ isFetching: false }));
    }
  },
}));

export default useProblemListStore;
