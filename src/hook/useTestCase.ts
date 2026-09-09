import { useCallback, useEffect } from "react";
import useModal from "../plugins/modal/useModal";
import { useTestCaseListStore } from "../zustand/TestCaseListStore";
import {
  addTestCase,
  removeTestCase as remove,
  updateTestCase,
} from "@/domain/editor/testCases";

export default function useTestCase() {
  const modal = useModal();
  const testCaseList = useTestCaseListStore((state) => state.testCaseList);
  const setTestCaseList = useTestCaseListStore(
    (state) => state.setTestCaseList,
  );

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          modal.top()?.resolve(false);
          break;
        default:
          break;
      }
    };

    if (!modal.top()) {
      return () => {
        window.removeEventListener("keydown", handleKeydown);
      };
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [modal]);

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
    modal.top()?.resolve(false);
  }, [modal]);

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
