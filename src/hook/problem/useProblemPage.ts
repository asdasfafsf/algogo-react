import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { problemUuid } = useParams<"problemUuid">();
  const setTestCaseList = useTestCaseListStore(
    (state) => state.setTestCaseList,
  );
  const setExecuteResultList = useExecuteResultListStore(
    (state) => state.setExecuteResultList,
  );

  const fetchProblem = useCallback(async () => {
    const response = await getProblem(problemUuid as string);
    if (response.statusCode !== 200) {
      navigate("/");
    }

    const fetchedProblem = response.data;
    setProblem(fetchedProblem);
    setTestCaseList(createInitialTestCaseList(fetchedProblem.inputOutputList));
    setExecuteResultList(
      createInitialExecuteResultList(fetchedProblem.inputOutputList),
    );
  }, []);

  useEffect(() => {
    fetchProblem();
  }, []);

  return { problem };
}
