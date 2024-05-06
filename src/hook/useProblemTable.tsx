/* eslint-disable max-len */
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
  const [confirm] = useConfirmModal();

  const handleSelectProblemTypeDropdown = useCallback((e:React.MouseEvent, index: number) => {
    const newOptionList = [...optionList];
    newOptionList[index].isSelected = !newOptionList[index].isSelected;
    setOptionList(newOptionList);
  }, [optionList]);

  const handleResetProblemTypeDropdown = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
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
  }, [optionList]);

  const handleOkProblemTypeDropdown = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    const isOk = await confirm('초기화 하시겠습니까?');

    if (isOk === false) {
      return;
    }

    setOptionList(optionList);
  }, [optionList]);

  const handleSelectProblemLevelDropdown = useCallback(() => {

  }, [optionList]);

  return [problemList,
    optionList,
    handleSelectProblemTypeDropdown,
    handleOkProblemTypeDropdown,
    handleResetProblemTypeDropdown,
  ] as const;
}
