import { create } from 'zustand';
import { createSelectors } from './selector';

type ExecuteResultListStore = {
  executeResultList: ExecuteResult[],
  setExecuteResultList: (executeResultList: ExecuteResult[]) => void;
};

export const useExecuteResultListStore = create<ExecuteResultListStore>((set) => ({
  executeResultList: [],
  setExecuteResultList: (newExecuteResultList) => set(() => ({
    executeResultList: newExecuteResultList,
  })),
}));

export const ExecuteResultListSelector = createSelectors(useExecuteResultListStore);
export default useExecuteResultListStore;
