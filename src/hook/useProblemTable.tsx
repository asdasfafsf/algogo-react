import { useCallback, useState } from 'react';
import defaultProblemOption from '../constant/ProblemOption';
import useConfirmModal from './useConfirmModal';

export default function useProblemTable() {
  const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((elem) => ({
    state: Math.floor((Math.random() * 100) % 2),
    title: '저는 문제입니다아아아아아아아아아아아아아아',
    grade: `다이아 ${(elem % 5) + 1}`,
    rate: '88.88',
    submitCount: (Math.random() * 10000).toFixed(0),
    source: 'https://acimpc.net/problem/3455',
  }));

  const [problemList, setProblemList] = useState(problems);
  const [optionList, setOptionList] = useState<ProblemOption[]>(defaultProblemOption);
  const [realOptionList, setRealOptionList] = useState<ProblemOption[]>(defaultProblemOption);
  const [confirm] = useConfirmModal();

  const handleSelectProblemTypeDropdown = useCallback((
    e:React.MouseEvent,
    index: number,
  ) => {
    e.stopPropagation();

    const newOptionList = [...optionList];
    newOptionList[index].isSelected = !newOptionList[index].isSelected;
    setOptionList(newOptionList);
  }, [optionList]);

  const handleResetProblemTypeDropdown = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    e.currentTarget.blur();

    const isOk = await confirm('초기화 하시겠습니까?');

    if (isOk === false) {
      return;
    }

    const newOptionList = optionList.map((elem) => {
      if (elem.type === '유형') {
        const isSelected = false;
        return { ...elem, isSelected };
      }
      return elem;
    });
    setOptionList(newOptionList);
    setRealOptionList(newOptionList.map((elem) => ({ ...elem })));
  }, [optionList]);

  const handleOkProblemTypeDropdown = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    e.currentTarget.blur();

    const isOk = await confirm('적용하시겠습니까?');

    if (isOk === false) {
      return;
    }

    setOptionList(optionList);
    setRealOptionList(optionList.map((elem) => ({ ...elem })));
  }, [optionList]);

  const handleSelectProblemLevelDropdown = useCallback((
    e: React.MouseEvent<HTMLButtonElement>,
    value: string,
  ) => {
    e.stopPropagation();

    const newOptionList = [...optionList];
    const index = newOptionList.findIndex((elem) => elem.value === value);

    if (index === -1) {
      return;
    }
    newOptionList[index].isSelected = !newOptionList[index].isSelected;
    setOptionList(newOptionList);
  }, [optionList]);

  const handleOkProblemLevelDropdown = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    e.currentTarget.blur();

    const isOk = await confirm('적용하시겠습니까?');

    if (!isOk) {
      return;
    }

    setRealOptionList(optionList.map((elem) => ({ ...elem })));
  }, [optionList]);

  const handleResetProblemLevelDropdown = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    e.currentTarget.blur();

    const isOk = await confirm('초기화 하시겠습니까?');

    if (!isOk) {
      return;
    }
    const newOptionList = optionList.map((elem) => {
      if (elem.type === '난이도') {
        const isSelected = false;
        return { ...elem, isSelected };
      }

      return elem;
    });
    setOptionList(newOptionList);
    setRealOptionList(newOptionList.map((elem) => ({ ...elem })));
  }, [optionList]);

  return [problemList,
    optionList,
    realOptionList,
    handleSelectProblemTypeDropdown,
    handleOkProblemTypeDropdown,
    handleResetProblemTypeDropdown,
    handleSelectProblemLevelDropdown,
    handleOkProblemLevelDropdown,
    handleResetProblemLevelDropdown,
  ] as const;
}
