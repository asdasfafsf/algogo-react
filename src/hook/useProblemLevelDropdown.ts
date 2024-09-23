/* eslint-disable import/no-named-as-default */
import { useCallback, useEffect, useState } from 'react';
import useConfirmModal from './useConfirmModal';
import defaultProblemLevelList from '../constant/ProblemLevelList';
import useProblemTableFilterStore from '../zustand/ProblemTableFilterStore';

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
  const [realProblemLevelList, setRealproblemLevelList] = useState<ProblemLevel[]>(
    defaultProblemLevelList.map((elem) => ({ ...elem })),
  );

  const { problemOptionList, setProblemOptionList } = useProblemTableFilterStore((
    { problemOptionList, setProblemOptionList },
  ) => ({ problemOptionList, setProblemOptionList }));

  const [confirm] = useConfirmModal();

  useEffect(() => {
    const filteredProblemOptionList = problemOptionList.filter(({ type }) => type === '난이도');
    setRealproblemLevelList((prevList) => {
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

  const handleUpdateProblemOptionList = useCallback((problemLevelList: ProblemLevel[]) => {
    setProblemOptionList((prevList) => {
      const newProblemOptionList = prevList.filter((problemOption) => {
        if (problemOption.type !== '난이도') {
          return true;
        }

        const target = problemLevelList.find(
          (problemLevel) => problemLevel.name === problemOption.name,
        );

        if (!target) {
          return false;
        }

        return target.isSelected;
      });

      problemLevelList.forEach((problemLevel) => {
        const target = newProblemOptionList.find(
          (problemOption) => problemOption.name === problemLevel.name,
        );

        if (target) {
          return true;
        }

        if (problemLevel.isSelected) {
          const { name, value, isSelected } = problemLevel;
          newProblemOptionList.push({
            type: '난이도',
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
    level: string,
  ) => {
    e.stopPropagation();

    const index = problemLevelList.findIndex(({ name }) => name === level);
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

    const newProblemLevelList = problemLevelList.map((elem) => {
      const isSelected = false;
      return { ...elem, isSelected };
    });

    setProblemLevelList(newProblemLevelList);
    setRealproblemLevelList(newProblemLevelList.map((elem) => ({ ...elem })));
    handleUpdateProblemOptionList(newProblemLevelList);
  }, [problemLevelList]);

  const handleOk = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setOpen(false);
    setRealproblemLevelList(problemLevelList.map((elem) => ({ ...elem })));
    handleUpdateProblemOptionList(problemLevelList);
  }, [problemLevelList]);

  const handler = useCallback(async () => {
    setProblemLevelList(realProblemLevelList.map((elem) => ({ ...elem })));
    setOpen((open) => !open);
  }, [realProblemLevelList]);

  return [open,
    problemLevelList,
    handleSelect,
    handleReset,
    handleOk,
    handler] as const;
}
