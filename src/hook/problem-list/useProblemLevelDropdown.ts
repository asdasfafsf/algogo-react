import { useCallback, useEffect, useState } from 'react';
import useConfirmModal from '../useConfirmModal';
import defaultProblemLevelList from '../../constant/ProblemLevelList';
import { useProblemTableFilterStore } from '../../zustand/ProblemTableFilterStore';
import { replaceProblemFilters } from '@/domain/problems';

interface ProblemLevel {
  name: string;
  value: string;
  isSelected: boolean;
}

export default function useProblemLevelDropdown() {
  const [open, setOpen] = useState(false);
  const [problemLevelList, setProblemLevelList] = useState<ProblemLevel[]>(
    defaultProblemLevelList.map(elem => ({ ...elem })),
  );
  const [realProblemLevelList, setRealproblemLevelList] = useState<
    ProblemLevel[]
  >(defaultProblemLevelList.map(elem => ({ ...elem })));

  const problemOptionList = useProblemTableFilterStore(
    state => state.problemOptionList,
  );
  const setProblemOptionList = useProblemTableFilterStore(
    state => state.setProblemOptionList,
  );
  const [confirm] = useConfirmModal();

  useEffect(() => {
    const filteredProblemOptionList = problemOptionList.filter(
      ({ type }) => type === '난이도',
    );
    setRealproblemLevelList(prevList => {
      const newList = [...prevList].map(problemType => {
        const target = filteredProblemOptionList.find(
          elem => problemType.name === elem.name,
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
    (problemLevelList: ProblemLevel[]) => {
      setProblemOptionList(prevList =>
        replaceProblemFilters(prevList, '난이도', problemLevelList),
      );
    },
    [setProblemOptionList],
  );

  const handleSelect = useCallback(
    async (e: React.MouseEvent<Element, MouseEvent>, level: string) => {
      e.stopPropagation();

      const index = problemLevelList.findIndex(({ name }) => name === level);
      if (index === -1) {
        return;
      }

      const newProblemList = [...problemLevelList];
      newProblemList[index].isSelected = !newProblemList[index].isSelected;

      setProblemLevelList(newProblemList);
    },
    [problemLevelList],
  );

  const handleReset = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      const isOk = await confirm('초기화 하시겠습니까?');
      if (isOk === false) {
        return;
      }

      const newProblemLevelList = problemLevelList.map(elem => {
        const isSelected = false;
        return { ...elem, isSelected };
      });

      setProblemLevelList(newProblemLevelList);
      setRealproblemLevelList(newProblemLevelList.map(elem => ({ ...elem })));
      handleUpdateProblemOptionList(newProblemLevelList);
    },
    [problemLevelList],
  );

  const handleOk = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      setOpen(false);
      setRealproblemLevelList(problemLevelList.map(elem => ({ ...elem })));
      handleUpdateProblemOptionList(problemLevelList);
    },
    [problemLevelList],
  );

  const handler = useCallback(async () => {
    setProblemLevelList(realProblemLevelList.map(elem => ({ ...elem })));
    setOpen(open => !open);
  }, [realProblemLevelList]);

  return [
    open,
    problemLevelList,
    handleSelect,
    handleReset,
    handleOk,
    handler,
  ] as const;
}
