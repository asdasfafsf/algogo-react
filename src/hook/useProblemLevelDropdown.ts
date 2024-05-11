/* eslint-disable import/no-named-as-default */
import { useCallback, useState } from 'react';
import useConfirmModal from './useConfirmModal';
import defaultProblemLevelList from '../constant/ProblemLevelList';

interface ProblemLevel {
  name: string;
  value: string;
  isSelected: boolean
}

export default function useProblemLevelDropdown() {
  const [open, setOpen] = useState(false);
  const [problemLevelList, setProblemLevelList] = useState<ProblemLevel[]>(
    defaultProblemLevelList.map((elem) => ({ ...elem })),
  );
  const [realproblemLevelList, setRealproblemLevelList] = useState<ProblemLevel[]>(
    defaultProblemLevelList.map((elem) => ({ ...elem })),
  );

  const [confirm] = useConfirmModal();

  const handleSelect = useCallback(async (
    e: React.MouseEvent<Element, MouseEvent>,
    level: string,
  ) => {
    e.stopPropagation();

    const index = problemLevelList.findIndex(({ value }) => value === level);
    if (index === -1) {
      return;
    }

    const newProblemList = [...problemLevelList];
    newProblemList[index].isSelected = !newProblemList[index].isSelected;

    setProblemLevelList(newProblemList);
  }, [problemLevelList]);

  const handleReset = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const isOk = await confirm('초기화 하시겠습니까?');
    if (isOk === false) {
      return;
    }

    const newTypeProblemList = problemLevelList.map((elem) => {
      const isSelected = false;
      return { ...elem, isSelected };
    });

    setProblemLevelList(newTypeProblemList);
    setRealproblemLevelList(newTypeProblemList.map((elem) => ({ ...elem })));
  }, [problemLevelList]);

  const handleOk = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const isOk = await confirm('적용하시겠습니까?');
    if (isOk === false) {
      return;
    }

    setOpen(false);
    setRealproblemLevelList(problemLevelList.map((elem) => ({ ...elem })));
  }, [problemLevelList]);

  const handler = useCallback(async () => {
    // if (open === true) {
    setProblemLevelList(realproblemLevelList.map((elem) => ({ ...elem })));
    // }
    setOpen((open) => !open);
  }, [realproblemLevelList]);

  return [open,
    problemLevelList,
    handleSelect,
    handleReset,
    handleOk,
    handler] as const;
}
