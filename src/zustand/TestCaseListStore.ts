import { create } from 'zustand';
import { createSelectors } from './selector';

type TestCaseListStore = {
  testCaseList: TestCase[],
  setTestCaseList: (testCaseList: TestCase[]) => void,
  handleRun: (executeResult: ResponseExecuteResult) => void,
  handleExecute: (executeResult: ResponseExecuteResult) => void,
};

export const useTestCaseListStore = create<TestCaseListStore>((set, get) => ({
  testCaseList: [],
  setTestCaseList: (testCaseList) => set(() => ({ testCaseList })),
  handleRun: (executeResult) => {
    if (executeResult.code === '9001') {
      console.log('컴파일 오류');
    }
  },
  handleExecute: (executeResult) => {
    const { testCaseList } = get();
    const index = executeResult.seq;
    console.log('야야야');
    console.log(executeResult);

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
