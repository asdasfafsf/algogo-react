import { useState } from 'react';

export default function useProblemStateDropdown() {
  const [problemStateList, setProblemStateList] = useState([
    { isSelected: false, name: '안 푼 문제', value: '안 푼 문제' },
    { isSelected: false, name: '맞힌 문제', value: '맞힌 문제' },
    { isSelected: false, name: '틀린 문제', value: '틀린 문제' },
  ]);

  const handleClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newProblemStateList = [...problemStateList];
    newProblemStateList[index].isSelected = !newProblemStateList[index].isSelected;
    setProblemStateList(newProblemStateList);
  };

  return [problemStateList, handleClick] as const;
}
