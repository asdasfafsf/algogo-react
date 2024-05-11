/* eslint-disable import/no-named-as-default */
import { useCallback, useState } from 'react';
import useConfirmModal from './useConfirmModal';
import defaultProblemTypeList from '../constant/ProblemTypeList';

interface ProblemType {
  name: string;
  value: string;
  isSelected: boolean
}

export default function useProbleTypeDropdown() {
  const [open, setOpen] = useState(false);
  const [problemTypeList, setProblemTypeList] = useState<ProblemType[]>(
    defaultProblemTypeList.map((elem) => ({ ...elem })),
  );
  const [realProblemTypeList, setRealProblemTypeList] = useState<ProblemType[]>(
    defaultProblemTypeList.map((elem) => ({ ...elem })),
  );

  const [confirm] = useConfirmModal();

  const handleSelect = useCallback(async (
    e: React.MouseEvent<Element, MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation();
    // e.currentTarget?.blur();
    const newProblemList = [...problemTypeList];
    newProblemList[index].isSelected = false;
    setProblemTypeList(newProblemList);
  }, [problemTypeList]);

  const handleReset = useCallback(async () => {
    const isOk = await confirm('초기화 하시겠습니까?');
    if (isOk === false) {
      return;
    }

    const newTypeProblemList = problemTypeList.map((elem) => {
      const isSelected = false;
      return { ...elem, isSelected };
    });

    setProblemTypeList(newTypeProblemList);
    setRealProblemTypeList(newTypeProblemList.map((elem) => ({ ...elem })));
  }, [problemTypeList]);

  const handleOk = useCallback(async () => {
    const isOk = await confirm('적용하시겠습니까?');
    if (isOk === false) {
      return;
    }

    setOpen(false);
    setRealProblemTypeList(problemTypeList.map((elem) => ({ ...elem })));
  }, [problemTypeList]);

  const handler = useCallback(async () => {
    if (open === true) {
      setProblemTypeList(realProblemTypeList.map((elem) => ({ ...elem })));
    }
    setOpen(!open);
  }, [open, realProblemTypeList]);

  return [open,
    problemTypeList,
    handleSelect,
    handleReset,
    handleOk,
    handler] as const;
}
