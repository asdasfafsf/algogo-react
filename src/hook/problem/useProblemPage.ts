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
import {
  normalizeProblemPageError,
  type ProblemPageError,
} from "@/domain/problems/problemPageError";

export default function useProblemPage() {
  const problem = useProblemStore((state) => state.problem);
  const setProblem = useProblemStore((state) => state.setProblem);
  const { problemUuid } = useParams<"problemUuid">();
  const [error, setError] = useState<ProblemPageError | null>(null);
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
        setError(normalizeProblemPageError(404));
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProblem(problemUuid);
        if (cancelled) return;

        if (response.statusCode !== 200 || !response.data) {
          setError(normalizeProblemPageError(response.statusCode));
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
        setError(normalizeProblemPageError(isNotFound ? 404 : undefined));
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
