import axios from "axios";
import apiClient from "./apiClient";
import { getProblem as getLegacyProblem } from "./problems-v2";
import { toProblemView } from "@/domain/problems/problemV3";
import type { ProblemV3 } from "@/domain/problems/problemV3";
import type { Problem } from "@/type/Problem.type";

export async function getProblem(
  problemUuid: string,
): Promise<ApiResponse<Problem>> {
  try {
    const { data } = await apiClient.get<ApiResponse<ProblemV3>>(
      `/api/v3/problems/${encodeURIComponent(problemUuid)}`,
    );
    if (data.statusCode === 404) return getLegacyProblem(problemUuid);
    if (data.statusCode !== 200 || !data.data)
      throw new Error("문제 문서를 불러오지 못했습니다.");
    return { ...data, data: toProblemView(data.data) };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return getLegacyProblem(problemUuid);
    }
    throw error;
  }
}
