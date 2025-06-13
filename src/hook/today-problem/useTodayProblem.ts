import { useCallback, useEffect, useState } from 'react';
import { getTodayProblems } from '@api/problems-v2';
import useLoadingModal from '@hook/modal/useLoadingModal';
import { TodayProblem } from '@/type/Problem.type';

export const useTodayProblem = () => {
  const [todayProblems, setTodayProblems] = useState<TodayProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const { startLoading, endLoading } = useLoadingModal();
  const updateTodayProblems = useCallback(async () => {
    startLoading();
    try {
      const response = await getTodayProblems();
      const todayProblems = response.data;
      setTodayProblems(todayProblems);
    } finally {
      endLoading();
    }
  }, []);

  useEffect(() => {
    updateTodayProblems();
  }, []);

  const nextProblem = () => {
    setCurrentProblemIndex((prev) => (prev + 1) % todayProblems.length);
  };

  const prevProblem = () => {
    setCurrentProblemIndex((prev) => (prev - 1 + todayProblems.length) % todayProblems.length);
  };

  return {
    todayProblems, currentProblemIndex, nextProblem, prevProblem, setCurrentProblemIndex,
  };
};

export default useTodayProblem;
