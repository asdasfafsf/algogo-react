import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodayProblems } from '@api/problems-v2';
import { useSearchParams } from 'react-router-dom';
import { TodayProblem } from '@/type/Problem.type';

const getTimeUntilUTCMidnight = () => {
  const now = new Date();
  const utcMidnight = new Date();
  utcMidnight.setUTCHours(24, 0, 0, 0);
  return utcMidnight.getTime() - now.getTime();
};

export const useTodayProblem = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [searchParam] = useSearchParams();
  const day = searchParam.get('day') ?? 0;
  const {
    data: todayProblems = [], isLoading, isFetched, isSuccess,
  } = useQuery<TodayProblem[]>({
    queryKey: ['todayProblems', day],
    queryFn: async () => {
      const response = await getTodayProblems(Number(day));
      return response.data;
    },
    staleTime: getTimeUntilUTCMidnight(),
    gcTime: getTimeUntilUTCMidnight(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const nextProblem = () => {
    setCurrentProblemIndex((prev) => (prev + 1) % todayProblems.length);
  };

  const prevProblem = () => {
    setCurrentProblemIndex((prev) => (prev - 1 + todayProblems.length) % todayProblems.length);
  };

  return {
    todayProblems,
    currentProblemIndex,
    nextProblem,
    prevProblem,
    setCurrentProblemIndex,
    isLoading,
    isFetched,
    isSuccess,
  };
};

export default useTodayProblem;
