import { useCallback } from "react";
import { useTestCaseListStore } from "../zustand/TestCaseListStore";
import {
  addTestCase,
  removeTestCase as remove,
  updateTestCase,
} from "@/domain/editor/testCases";

export default function useTestCase(resolve: (value: boolean) => void) {
  const testCaseList = useTestCaseListStore((state) => state.testCaseList);
  const setTestCaseList = useTestCaseListStore(
    (state) => state.setTestCaseList,
  );

  const handleClickAddTestCase = useCallback(() => {
    setTestCaseList(addTestCase(testCaseList));
  }, [testCaseList]);

  const removeTestCase = useCallback(
    (testCaseIndex: number) => {
      setTestCaseList(remove(testCaseList, testCaseIndex));
    },
    [testCaseList],
  );

  const handleClickClose = useCallback(() => {
    resolve(false);
  }, [resolve]);

  const handleChangeInput = useCallback(
    (index: number, value: string) => {
      setTestCaseList(updateTestCase(testCaseList, index, { input: value }));
    },
    [testCaseList],
  );

  const handleChangeOutput = useCallback(
    (index: number, value: string) => {
      setTestCaseList(updateTestCase(testCaseList, index, { expected: value }));
    },
    [testCaseList],
  );

  return {
    testCaseList,
    handleClickAddTestCase,
    removeTestCase,
    handleClickClose,
    handleChangeInput,
    handleChangeOutput,
  };
}
