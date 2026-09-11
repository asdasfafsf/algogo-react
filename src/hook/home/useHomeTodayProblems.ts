import { useQuery } from "@tanstack/react-query";
import { getTodayProblems } from "@api/problems-v2";
import {
  todayProblemsLoadFailureMessage,
  todayProblemsQueryOutcome,
} from "@/domain/problems";
import type { TodayProblem } from "@/type/Problem.type";

export default function useHomeTodayProblems() {
  return useQuery<TodayProblem[]>({
    queryKey: ["todayProblems", 0],
    queryFn: async () => {
      try {
        const response = await getTodayProblems(0);
        const outcome = todayProblemsQueryOutcome(response);
        if (outcome.type === "failure") {
          throw new Error(outcome.message);
        }
        return outcome.data;
      } catch {
        throw new Error(todayProblemsLoadFailureMessage);
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
