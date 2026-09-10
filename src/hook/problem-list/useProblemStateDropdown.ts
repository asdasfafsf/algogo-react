import { useCallback, useEffect, useState } from "react";
import { PROBLEM_STATE } from "@/constant/problem.state.constant";
import { useProblemTableFilterStore } from "../../zustand/ProblemTableFilterStore";
import { replaceProblemFilters } from "@/domain/problems";

interface ProblemState {
  name: string;
  value: string;
  isSelected: boolean;
}

export default function useProblemStateDropdown() {
  const [problemStateList, setProblemStateList] = useState([
    { isSelected: false, name: "안 푼 문제", value: PROBLEM_STATE.NONE },
    { isSelected: false, name: "맞힌 문제", value: PROBLEM_STATE.SOLVED },
    { isSelected: false, name: "틀린 문제", value: PROBLEM_STATE.FAILED },
  ]);

  const [open, setOpen] = useState(false);

  const problemOptionList = useProblemTableFilterStore(
    (state) => state.problemOptionList,
  );
  const setProblemOptionList = useProblemTableFilterStore(
    (state) => state.setProblemOptionList,
  );

  useEffect(() => {
    const filteredProblemOptionList = problemOptionList.filter(
      ({ type }) => type === "상태",
    );
    setProblemStateList((prevList) => {
      const newList = [...prevList].map((problemType) => {
        const target = filteredProblemOptionList.find(
          (elem) => problemType.name === elem.name,
        );

        if (!target) {
          return { ...problemType, isSelected: false };
        }

        return { ...problemType, isSelected: true };
      });

      return newList;
    });
  }, [problemOptionList]);

  const handleUpdateProblemOptionList = useCallback(
    (problemStateList: ProblemState[]) => {
      setProblemOptionList((prevList) =>
        replaceProblemFilters(prevList, "상태", problemStateList),
      );
    },
    [setProblemOptionList],
  );

  const handleClick = useCallback(
    (value: string) => {
      const updatedProblemStateList = problemStateList.map((problemState) =>
        problemState.value === value
          ? { ...problemState, isSelected: !problemState.isSelected }
          : { ...problemState },
      );
      setProblemStateList(updatedProblemStateList);
      handleUpdateProblemOptionList(updatedProblemStateList);
    },
    [handleUpdateProblemOptionList, problemStateList],
  );

  const handleReset = useCallback(() => {
    const resetProblemStateList = problemStateList.map((problemState) => ({
      ...problemState,
      isSelected: false,
    }));
    setProblemStateList(resetProblemStateList);
    handleUpdateProblemOptionList(resetProblemStateList);
  }, [handleUpdateProblemOptionList, problemStateList]);

  return {
    problemStateList,
    handleClick,
    handleReset,
    isOpen: open,
    handleOpenChange: setOpen,
  };
}
