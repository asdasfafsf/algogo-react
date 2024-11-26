import { create } from 'zustand';
import { getProblemList } from '@api/problems';

type PagingInfo = {
  pageNo: number;
  pageSize: number;
};

type ProblemListStore = {
  problemList: ResponseProblem[];
  setProblemList: (updater: Updater<ResponseProblem[]>) => void | Promise<void>;
  pagingInfo: PagingInfo;
  setPagingInfo: (updater: Updater<PagingInfo>) => void | Promise<void>;
  maxPageNo: number;
  setMaxPageNo: (updater: Updater<number>) => void | Promise<void>;
  isFetching: boolean;
  setFetching: (updater: Updater<boolean>) => void | Promise<void>;
  fetchProblemList: (pageNo: number, problemOptionList: ProblemOption[]) => Promise<void> | void
};

export const useProblemListStore = create<ProblemListStore>((set) => ({
  problemList: [],
  setProblemList: (updater) => set((state) => ({
    problemList:
        typeof updater === 'function'
          ? (updater as (prev: ResponseProblem[]) => ResponseProblem[])(state.problemList)
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

  fetchProblemList: async (pageNo: number, problemOptionList: ProblemOption[]) => {
    const skeletonTimeout = setTimeout(() => {
      set({ isFetching: true });
    }, pageNo === 1 ? 0 : 200);

    try {
      const response = await getProblemList({
        pageNo,
        pageSize: 20,
        levelList: problemOptionList
          .filter((elem) => elem.isSelected && elem.type === '난이도')
          .map((elem) => elem.value)
          .map(Number),
        typeList: problemOptionList
          .filter((elem) => elem.isSelected && elem.type === '유형')
          .map((elem) => elem.value),
      });
      clearTimeout(skeletonTimeout);
      const { data } = response;
      const {
        problemList, pageSize, totalCount,
      } = data;
      const maxPageNo = Math.ceil(totalCount / pageSize);
      set(() => ({
        problemList,
        pagingInfo: { pageNo, pageSize },
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
