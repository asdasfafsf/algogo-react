import { useCallback, useMemo, useState } from "react";
import useConfirmModal from "../useConfirmModal";
import defaultProblemLevelList from "../../constant/ProblemLevelList";
import { useProblemTableFilterStore } from "../../zustand/ProblemTableFilterStore";
import {
  normalizeProblemLevelOptions,
  toggleProblemLevel,
  toggleProblemTier,
  type ProblemLevelOption,
} from "@/domain/problems/problemLevelSelection";

const initialProblemLevelList = normalizeProblemLevelOptions([
  { name: "알 수 없음", value: "0", isSelected: false },
  ...defaultProblemLevelList,
]);

const copyProblemLevelList = (
  problemLevelList: readonly ProblemLevelOption[],
) => problemLevelList.map((problemLevel) => ({ ...problemLevel }));

export default function useProblemLevelDropdown() {
  const [open, setOpen] = useState(false);
  const [problemLevelList, setProblemLevelList] = useState<
    ProblemLevelOption[]
  >(copyProblemLevelList(initialProblemLevelList));
  const problemOptionList = useProblemTableFilterStore(
    (state) => state.problemOptionList,
  );
  const setProblemOptionList = useProblemTableFilterStore(
    (state) => state.setProblemOptionList,
  );
  const [confirm] = useConfirmModal();

  const appliedProblemLevelList = useMemo(() => {
    const selectedValues = new Set(
      problemOptionList
        .filter(({ type }) => type === "난이도")
        .map(({ value }) => value),
    );
    return initialProblemLevelList.map((problemLevel) => ({
      ...problemLevel,
      isSelected: selectedValues.has(problemLevel.value),
    }));
  }, [problemOptionList]);
  const appliedSelectedCount = useMemo(
    () => appliedProblemLevelList.filter(({ isSelected }) => isSelected).length,
    [appliedProblemLevelList],
  );

  const handleUpdateProblemOptionList = useCallback(
    (updatedProblemLevels: readonly ProblemLevelOption[]) => {
      setProblemOptionList((prevList) => [
        ...prevList.filter(({ type }) => type !== "난이도"),
        ...updatedProblemLevels
          .filter(({ isSelected }) => isSelected)
          .map((problemLevel) => ({
            type: "난이도" as const,
            ...problemLevel,
          })),
      ]);
    },
    [setProblemOptionList],
  );

  const handleSelect = useCallback((value: string) => {
    setProblemLevelList((prevList) => toggleProblemLevel(prevList, value));
  }, []);

  const handleSelectTier = useCallback((tierValues: readonly string[]) => {
    setProblemLevelList((prevList) => toggleProblemTier(prevList, tierValues));
  }, []);

  const handleReset = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.currentTarget.blur();
      const isOk = await confirm("초기화 하시겠습니까?");
      if (!isOk) {
        return;
      }

      const resetProblemLevelList = problemLevelList.map((problemLevel) => ({
        ...problemLevel,
        isSelected: false,
      }));

      setProblemLevelList(resetProblemLevelList);
      handleUpdateProblemOptionList(resetProblemLevelList);
    },
    [confirm, handleUpdateProblemOptionList, problemLevelList],
  );

  const handleOk = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.currentTarget.blur();
      handleUpdateProblemOptionList(problemLevelList);
      setOpen(false);
    },
    [handleUpdateProblemOptionList, problemLevelList],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setProblemLevelList(copyProblemLevelList(appliedProblemLevelList));
      setOpen(nextOpen);
    },
    [appliedProblemLevelList],
  );

  return {
    isOpen: open,
    problemLevelList,
    appliedSelectedCount,
    handleSelect,
    handleSelectTier,
    handleReset,
    handleOk,
    handleOpenChange,
  };
}
