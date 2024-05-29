/* eslint-disable import/no-named-as-default */
import { useCallback, useEffect, useState } from 'react';
import useConfirmModal from './useConfirmModal';
import defaultProblemTypeList from '../constant/ProblemTypeList';
import { useProblemTableFilterStore } from '../zustand/ProblemTableFilterStore';

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

  const { problemOptionList, setProblemOptionList } = useProblemTableFilterStore(({
    problemOptionList,
    setProblemOptionList,
  }) => ({ problemOptionList, setProblemOptionList }));

  const [confirm] = useConfirmModal();

  useEffect(() => {
    const filteredProblemOptionList = problemOptionList.filter(({ type }) => type === '유형');
    setRealProblemTypeList((prevList) => {
      const newList = [...prevList].map((problemType) => {
        const target = filteredProblemOptionList.find((elem) => problemType.name === elem.name);

        if (!target) {
          return { ...problemType, isSelected: false };
        }

        return { ...problemType, isSelected: true };
      });

      return newList;
    });
  }, [problemOptionList]);

  const handleUpdateProblemOptionList = useCallback((realProblemTypeList: ProblemType[]) => {
    setProblemOptionList((prevList) => {
      const newProblemOptionList = prevList.filter((problemOption) => {
        if (problemOption.type !== '유형') {
          return true;
        }

        const target = realProblemTypeList.find(
          (problemType) => problemType.name === problemOption.name,
        );

        if (!target) {
          return false;
        }

        return target.isSelected;
      });

      realProblemTypeList.forEach((problemType) => {
        const target = newProblemOptionList.find(
          (problemOption) => problemOption.name === problemType.name,
        );

        if (target) {
          return true;
        }

        if (problemType.isSelected) {
          const { name, value, isSelected } = problemType;
          newProblemOptionList.push({
            type: '유형',
            name,
            value,
            isSelected,
          });
        }

        return true;
      });

      return newProblemOptionList;
    });
  }, [setProblemOptionList]);

  const handleSelect = useCallback(async (
    e: React.MouseEvent<Element, MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation();

    const newProblemList = [...problemTypeList];
    newProblemList[index].isSelected = !newProblemList[index].isSelected;

    setProblemTypeList(newProblemList);
  }, [problemTypeList]);

  const handleReset = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
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
    handleUpdateProblemOptionList(newTypeProblemList);
  }, [problemTypeList]);

  const handleOk = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();

    setRealProblemTypeList(problemTypeList.map((elem) => ({ ...elem })));
    handleUpdateProblemOptionList(problemTypeList);
    setOpen(false);
  }, [problemTypeList]);

  const handler = useCallback(async () => {
    setProblemTypeList(realProblemTypeList.map((elem) => ({ ...elem })));
    setOpen((open) => !open);
  }, [realProblemTypeList]);

  return [open,
    problemTypeList,
    handleSelect,
    handleReset,
    handleOk,
    handler] as const;
}
