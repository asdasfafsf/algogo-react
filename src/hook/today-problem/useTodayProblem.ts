import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodayProblems } from '@api/problems-v2';
import { useSearchParams } from 'react-router-dom';
import { TodayProblem } from '@/type/Problem.type';
import {
  millisecondsUntilNextUtcMidnight,
  nextTodayProblemIndex,
  parseTodayProblemDay,
  previousTodayProblemIndex,
} from '@/domain/problems';

export const useTodayProblem = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [searchParam] = useSearchParams();
  const rawDay = searchParam.get('day') ?? 0;
  const day = parseTodayProblemDay(searchParam.get('day'));
  const cacheLifetime = millisecondsUntilNextUtcMidnight(Date.now());
  const {
    data: todayProblems = [],
    isLoading,
    isFetched,
    isSuccess,
  } = useQuery<TodayProblem[]>({
    queryKey: ['todayProblems', rawDay],
    queryFn: async () => {
      const response = await getTodayProblems(day);
      return response.data;
    },
    staleTime: cacheLifetime,
    gcTime: cacheLifetime,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const nextProblem = () => {
    setCurrentProblemIndex(prev =>
      nextTodayProblemIndex(prev, todayProblems.length),
    );
  };

  const prevProblem = () => {
    setCurrentProblemIndex(prev =>
      previousTodayProblemIndex(prev, todayProblems.length),
    );
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
