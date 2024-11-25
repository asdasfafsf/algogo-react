import { create } from 'zustand';

type PagingInfo = {
  pageNo: number;
  pageSize: number;
};

type ProblemListStore = {
  pagingInfo: PagingInfo;
  setPagingInfo: (updater: Updater<PagingInfo>) => void | Promise<void>;
  maxPageNo: number;
  setMaxPageNo: (updater: Updater<number>) => void | Promise<void>;
  isFetching: boolean,
  setFetching: (updater: Updater<boolean>) => void | Promise<void>;
};

export const useProblemListStore = create<ProblemListStore>((set) => ({
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
}));

export default useProblemListStore;
