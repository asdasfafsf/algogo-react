import { useCallback, useEffect, useState } from 'react';
import { PROBLEM_STATE } from '@/constant/problem.state.constant';
import { useProblemTableFilterStore } from '../../zustand/ProblemTableFilterStore';

interface ProblemState {
  name: string;
  value: string;
  isSelected: boolean
}

export default function useProblemStateDropdown() {
  const [problemStateList, setProblemStateList] = useState([
    { isSelected: false, name: '안 푼 문제', value: PROBLEM_STATE.NONE },
    { isSelected: false, name: '맞힌 문제', value: PROBLEM_STATE.SOLVED },
    { isSelected: false, name: '틀린 문제', value: PROBLEM_STATE.FAILED },
  ]);

  const [open, setOpen] = useState(false);

  const problemOptionList = useProblemTableFilterStore((state) => state.problemOptionList);
  const setProblemOptionList = useProblemTableFilterStore((state) => state.setProblemOptionList);

  useEffect(() => {
    const filteredProblemOptionList = problemOptionList.filter(({ type }) => type === '상태');
    setProblemStateList((prevList) => {
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

  const handleUpdateProblemOptionList = useCallback((problemStateList: ProblemState[]) => {
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
  }, [setProblemOptionList]);

  const handleClick = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newProblemStateList = [...problemStateList];
    newProblemStateList[index].isSelected = !newProblemStateList[index].isSelected;
    setProblemStateList(newProblemStateList);
    handleUpdateProblemOptionList(newProblemStateList);
  }, [problemStateList]);

  const handler = useCallback(() => setOpen((open) => !open), [setOpen]);

  return {
    problemStateList, handleClick, open, handler,
  };
}
