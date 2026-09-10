import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProblem, getTodayProblems } from "@api/problems-v2";
import {
  millisecondsUntilNextUtcMidnight,
  nextTodayProblemIndex,
  previousTodayProblemIndex,
} from "@/domain/problems";
import { normalizeTodayProblemDay } from "@/domain/problems/todayProblemPage";
import type { Problem, TodayProblem } from "@/type/Problem.type";

export const useTodayProblem = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const now = new Date();
  const day = normalizeTodayProblemDay(searchParams.get("day"), now);
  const cacheLifetime = millisecondsUntilNextUtcMidnight(now.getTime());
  const todayProblemsQuery = useQuery<TodayProblem[]>({
    queryKey: ["todayProblems", day],
    queryFn: async () => {
      const response = await getTodayProblems(day);
      if (response.statusCode !== 200 || !Array.isArray(response.data)) {
        throw new Error("오늘의 문제 목록을 불러오지 못했습니다.");
      }
      return response.data;
    },
    staleTime: cacheLifetime,
    gcTime: cacheLifetime,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const todayProblems = todayProblemsQuery.data ?? [];
  const selectedProblem = todayProblems[currentProblemIndex];
  const selectedProblemUuid = selectedProblem?.uuid;
  const selectedProblemQuery = useQuery<Problem>({
    queryKey: ["todayProblemDetail", selectedProblemUuid],
    queryFn: async () => {
      if (!selectedProblemUuid) {
        throw new Error("선택한 문제를 찾을 수 없습니다.");
      }
      const response = await getProblem(selectedProblemUuid);
      if (
        response.statusCode !== 200 ||
        !response.data ||
        typeof response.data !== "object"
      ) {
        throw new Error("문제 상세를 불러오지 못했습니다.");
      }
      return response.data;
    },
    enabled: Boolean(selectedProblemUuid),
    staleTime: cacheLifetime,
    gcTime: cacheLifetime,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setCurrentProblemIndex(0);
  }, [day]);

  useEffect(() => {
    if (
      todayProblems.length > 0 &&
      currentProblemIndex >= todayProblems.length
    ) {
      setCurrentProblemIndex(0);
    }
  }, [currentProblemIndex, todayProblems.length]);

  const nextProblem = () => {
    if (todayProblems.length === 0) return;
    setCurrentProblemIndex((currentIndex) =>
      nextTodayProblemIndex(currentIndex, todayProblems.length),
    );
  };

  const prevProblem = () => {
    if (todayProblems.length === 0) return;
    setCurrentProblemIndex((currentIndex) =>
      previousTodayProblemIndex(currentIndex, todayProblems.length),
    );
  };

  return {
    todayProblems,
    currentProblemIndex,
    selectedProblem,
    selectedProblemDetail: selectedProblemQuery.data,
    nextProblem,
    prevProblem,
    setCurrentProblemIndex,
    isLoading: todayProblemsQuery.isLoading,
    isError: todayProblemsQuery.isError,
    isDetailLoading: selectedProblemQuery.isLoading,
  };
};

export default useTodayProblem;
