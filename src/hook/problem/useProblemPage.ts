import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getProblem } from "@api/problems-v2";
import {
  createInitialExecuteResultList,
  createInitialTestCaseList,
} from "@/domain/problems/initialization";
import useExecuteResultListStore from "@zustand/ExecuteResultListStore";
import useProblemStore from "@zustand/ProblemStore";
import useTestCaseListStore from "@zustand/TestCaseListStore";

export default function useProblemPage() {
  const problem = useProblemStore((state) => state.problem);
  const setProblem = useProblemStore((state) => state.setProblem);
  const { problemUuid } = useParams<"problemUuid">();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const setTestCaseList = useTestCaseListStore(
    (state) => state.setTestCaseList,
  );
  const setExecuteResultList = useExecuteResultListStore(
    (state) => state.setExecuteResultList,
  );

  useEffect(() => {
    let cancelled = false;

    const fetchProblem = async () => {
      setProblem(undefined);
      setError(null);
      setIsLoading(true);

      if (!problemUuid) {
        setError("문제 주소가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProblem(problemUuid);
        if (cancelled) return;

        if (response.statusCode !== 200 || !response.data) {
          setError(
            response.statusCode === 404
              ? "요청한 문제를 찾을 수 없습니다. 삭제되었거나 주소가 변경되었을 수 있습니다."
              : response.errorMessage || "문제를 불러오지 못했습니다.",
          );
          setIsLoading(false);
          return;
        }

        const fetchedProblem = response.data;
        setProblem(fetchedProblem);
        setTestCaseList(
          createInitialTestCaseList(fetchedProblem.inputOutputList),
        );
        setExecuteResultList(
          createInitialExecuteResultList(fetchedProblem.inputOutputList),
        );
        setIsLoading(false);
      } catch (requestError: unknown) {
        if (cancelled) return;
        const isNotFound =
          axios.isAxiosError(requestError) &&
          requestError.response?.status === 404;
        setError(
          isNotFound
            ? "요청한 문제를 찾을 수 없습니다. 삭제되었거나 주소가 변경되었을 수 있습니다."
            : "문제를 불러오지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
        );
        setIsLoading(false);
      }
    };

    void fetchProblem();
    return () => {
      cancelled = true;
    };
  }, [
    problemUuid,
    retryCount,
    setExecuteResultList,
    setProblem,
    setTestCaseList,
  ]);

  const retry = useCallback(() => setRetryCount((count) => count + 1), []);

  return { problem, error, isLoading, retry };
}
