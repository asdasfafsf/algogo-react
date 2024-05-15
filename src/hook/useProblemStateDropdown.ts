import { useEffect, useState } from 'react';
import useProblemTableFilterStore from '../zustand/ProblemTableFilterStore';

export default function useProblemStateDropdown() {
  const [problemStateList, setProblemStateList] = useState([
    { isSelected: false, name: '안 푼 문제', value: '안 푼 문제' },
    { isSelected: false, name: '맞힌 문제', value: '맞힌 문제' },
    { isSelected: false, name: '틀린 문제', value: '틀린 문제' },
  ]);

  const setProblemOptionList = useProblemTableFilterStore((state) => state.setProblemOptionList);

  useEffect(() => {
    setProblemOptionList((prevList) => {
      const newProblemOptionList = prevList.filter((problemOption) => {
        if (problemOption.type !== '상태') {
          return true;
        }

        const target = problemStateList.find(
          (problemState) => problemState.name === problemOption.name,
        );

        if (!target) {
          return false;
        }

        return target.isSelected;
      });

      problemStateList.forEach((problemState) => {
        const target = newProblemOptionList.find(
          (problemOption) => problemOption.name === problemState.name,
        );

        if (target) {
          return true;
        }

        if (problemState.isSelected) {
          newProblemOptionList.push({
            type: '상태',
            ...problemState,
          });
        }
        return true;
      });

      return newProblemOptionList;
    });
  }, [problemStateList]);

  const handleClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newProblemStateList = [...problemStateList];
    newProblemStateList[index].isSelected = !newProblemStateList[index].isSelected;
    setProblemStateList(newProblemStateList);
  };

  return [problemStateList, handleClick] as const;
}
