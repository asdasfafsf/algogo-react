import { create } from "zustand";

type ExecuteResultListStore = {
  executeResultList: ExecuteResult[];
  setExecuteResultList: (executeResultList: ExecuteResult[]) => void;
};

export const useExecuteResultListStore = create<ExecuteResultListStore>(
  (set) => ({
    executeResultList: [],
    setExecuteResultList: (newExecuteResultList) =>
      set(() => ({
        executeResultList: newExecuteResultList,
      })),
  }),
);

export default useExecuteResultListStore;
