import { useCallback, useEffect, useState } from 'react';
import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import useConfirmModal from '../useConfirmModal';
import defaultProblemTypeList from '../../constant/ProblemTypeList';

interface ProblemType {
  name: string;
  value: string;
  isSelected: boolean;
}

export default function useProblemTypeDropdown() {
  const [open, setOpen] = useState(false);
  const [problemTypeList, setProblemTypeList] = useState<ProblemType[]>(
    defaultProblemTypeList.map((elem) => ({ ...elem })),
  );
  const [realProblemTypeList, setRealProblemTypeList] = useState<ProblemType[]>(
    defaultProblemTypeList.map((elem) => ({ ...elem })),
  );

  const problemOptionList = useProblemTableFilterStore((state) => state.problemOptionList);
  const setProblemOptionList = useProblemTableFilterStore((state) => state.setProblemOptionList);

  const [confirm] = useConfirmModal();

  useEffect(() => {
    const filteredProblemOptionList = problemOptionList.filter(({ type }) => type === '유형');
    setRealProblemTypeList((prevList) => prevList.map((problemType) => {
      const target = filteredProblemOptionList.find((elem) => problemType.name === elem.name);
      return target ? { ...problemType, isSelected: true } : { ...problemType, isSelected: false };
    }));
  }, [problemOptionList]);

  const handleUpdateProblemOptionList = useCallback((updatedProblemTypes: ProblemType[]) => {
    setProblemOptionList((prevList) => {
      const newProblemOptionList = prevList.filter((problemOption) => {
        if (problemOption.type !== '유형') return true;
        const target = updatedProblemTypes.find((ptype) => ptype.name === problemOption.name);
        return target ? target.isSelected : false;
      });

      updatedProblemTypes.forEach((problemType) => {
        if (problemType.isSelected
          && !newProblemOptionList.find((po) => po.name === problemType.name)) {
          newProblemOptionList.push({
            type: '유형',
            name: problemType.name,
            value: problemType.value,
            isSelected: problemType.isSelected,
          });
        }
      });

      return newProblemOptionList;
    });
  }, [setProblemOptionList]);

  const handleSelect = useCallback((e: React.MouseEvent<Element, MouseEvent>, index: number) => {
    e.stopPropagation();
    setProblemTypeList((prevList) => {
      const newList = [...prevList];
      newList[index].isSelected = !newList[index].isSelected;
      return newList;
    });
  }, []);

  const handleReset = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    const isOk = await confirm('초기화 하시겠습니까?');
    if (!isOk) return;

    const resetList = problemTypeList.map((elem) => ({ ...elem, isSelected: false }));
    setProblemTypeList(resetList);
    setRealProblemTypeList(resetList);
    handleUpdateProblemOptionList(resetList);
  }, [problemTypeList, confirm, handleUpdateProblemOptionList]);

  const handleOk = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    handleUpdateProblemOptionList(problemTypeList);
    setOpen(false);
  }, [problemTypeList, handleUpdateProblemOptionList]);

  const handler = useCallback(() => {
    setProblemTypeList(realProblemTypeList.map((elem) => ({ ...elem })));
    setOpen((prev) => !prev);
  }, [realProblemTypeList]);

  return {
    open,
    problemTypeList,
    handleSelect,
    handleReset,
    handleOk,
    handler,
  };
}
