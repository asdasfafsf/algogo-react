import { create } from 'zustand';
import { createSelectors } from './selector';

type TestCaseListStore = {
  testCaseList: TestCase[],
  setTestCaseList: (testCaseList: TestCase[]) => void,
  setRunning: () => void;
  handleRun: (executeResult: ResponseExecuteResult) => void,
  handleExecute: (executeResult: ResponseExecuteResult) => void,
};

export const useTestCaseListStore = create<TestCaseListStore>((set, get) => ({
  testCaseList: [],
  setTestCaseList: (testCaseList) => set(() => ({ testCaseList })),
  setRunning: () => {
    const { testCaseList } = get();
    const newTestCaseList = testCaseList.map((elem) => {
      const newElem = { ...elem };
      newElem.state = '실행 중';
      return newElem;
    });
    set({ testCaseList: newTestCaseList });
  },
  handleRun: (executeResult) => {
    if (executeResult.code === '9002') {
      const { testCaseList } = get();
      const newTestCaseList = testCaseList.map((elem) => {
        const newElem = { ...elem };
        newElem.state = '불일치';
        newElem.output = '컴파일 에러';
        return newElem;
      });

      set({ testCaseList: newTestCaseList });
    }
  },
  handleExecute: (executeResult) => {
    const { testCaseList } = get();
    const index = executeResult.seq;
    const newTestCaseList = [...testCaseList];
    const target = newTestCaseList[index];
    const newTarget = {
      ...target,
      output: executeResult.result,
      state: (target?.expected === executeResult.result ? '일치' : '불일치'),
    } as TestCase;
    newTestCaseList[index] = newTarget;
    set({ testCaseList: newTestCaseList });
  },
}));

export const ProblemWidthSelectors = createSelectors(useTestCaseListStore);
export default useTestCaseListStore;
