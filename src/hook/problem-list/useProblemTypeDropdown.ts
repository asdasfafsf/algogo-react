import { useCallback, useMemo, useState } from "react";
import { useProblemTableFilterStore } from "@zustand/ProblemTableFilterStore";
import useConfirmModal from "../useConfirmModal";
import defaultProblemTypeList from "../../constant/ProblemTypeList";
import { replaceProblemFilters } from "@/domain/problems";

interface ProblemType {
  name: string;
  value: string;
  isSelected: boolean;
}

const copyProblemTypeList = (problemTypeList: readonly ProblemType[]) =>
  problemTypeList.map((problemType) => ({ ...problemType }));

export default function useProblemTypeDropdown() {
  const [open, setOpen] = useState(false);
  const [problemTypeList, setProblemTypeList] = useState<ProblemType[]>(
    defaultProblemTypeList.map((elem) => ({ ...elem })),
  );
  const problemOptionList = useProblemTableFilterStore(
    (state) => state.problemOptionList,
  );
  const setProblemOptionList = useProblemTableFilterStore(
    (state) => state.setProblemOptionList,
  );

  const [confirm] = useConfirmModal();

  const appliedProblemTypeList = useMemo(() => {
    const selectedValues = new Set(
      problemOptionList
        .filter(({ type }) => type === "유형")
        .map(({ value }) => value),
    );
    return defaultProblemTypeList.map((problemType) => ({
      ...problemType,
      isSelected: selectedValues.has(problemType.value),
    }));
  }, [problemOptionList]);
  const appliedSelectedCount = useMemo(
    () => appliedProblemTypeList.filter(({ isSelected }) => isSelected).length,
    [appliedProblemTypeList],
  );

  const handleUpdateProblemOptionList = useCallback(
    (updatedProblemTypes: readonly ProblemType[]) => {
      setProblemOptionList((prevList) =>
        replaceProblemFilters(prevList, "유형", updatedProblemTypes),
      );
    },
    [setProblemOptionList],
  );

  const handleSelect = useCallback((value: string) => {
    setProblemTypeList((prevList) =>
      prevList.map((problemType) =>
        problemType.value === value
          ? { ...problemType, isSelected: !problemType.isSelected }
          : { ...problemType },
      ),
    );
  }, []);

  const handleSelectAll = useCallback((values: readonly string[]) => {
    const visibleValues = new Set(values);
    setProblemTypeList((prevList) => {
      const isEveryVisibleTypeSelected = prevList
        .filter(({ value }) => visibleValues.has(value))
        .every(({ isSelected }) => isSelected);

      return prevList.map((problemType) =>
        visibleValues.has(problemType.value)
          ? { ...problemType, isSelected: !isEveryVisibleTypeSelected }
          : { ...problemType },
      );
    });
  }, []);

  const handleReset = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      const isOk = await confirm("초기화 하시겠습니까?");
      if (!isOk) return;

      const resetList = problemTypeList.map((elem) => ({
        ...elem,
        isSelected: false,
      }));
      setProblemTypeList(resetList);
      handleUpdateProblemOptionList(resetList);
    },
    [problemTypeList, confirm, handleUpdateProblemOptionList],
  );

  const handleOk = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      handleUpdateProblemOptionList(problemTypeList);
      setOpen(false);
    },
    [problemTypeList, handleUpdateProblemOptionList],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setProblemTypeList(copyProblemTypeList(appliedProblemTypeList));
      setOpen(nextOpen);
    },
    [appliedProblemTypeList],
  );

  return {
    isOpen: open,
    problemTypeList,
    appliedSelectedCount,
    handleSelect,
    handleSelectAll,
    handleReset,
    handleOk,
    handleOpenChange,
  };
}
