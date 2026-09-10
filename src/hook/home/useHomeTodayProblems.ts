import { useQuery } from "@tanstack/react-query";
import { getTodayProblems } from "@api/problems-v2";
import type { TodayProblem } from "@/type/Problem.type";

export default function useHomeTodayProblems() {
  return useQuery<TodayProblem[]>({
    queryKey: ["todayProblems", 0],
    queryFn: async () => {
      const response = await getTodayProblems(0);
      if (
        response.statusCode !== 200 ||
        response.errorCode !== "0000" ||
        !Array.isArray(response.data)
      ) {
        throw new Error(
          response.errorMessage || "오늘의 문제 응답이 올바르지 않습니다.",
        );
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
