import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTestCaseListStore from '@zustand/TestCaseListStore';
import { PROBLEM_HEADER_HEIGHT } from '@constant/Size';
import useExecuteResultListStore from '@zustand/ExecuteResultListStore';
import { getProblem } from '@api/problems-v2';
import ProblemSection from '@layout/problem/ProblemSection';
import ProblemHeader from '@layout/problem/ProblemHeader';
import ProblemFooter from '@layout/problem/ProblemFooter';
import useProblemStore from '@zustand/ProblemStore';

export default function ProblemPage() {
  const problem = useProblemStore((state) => state.problem);
  const setProblem = useProblemStore((state) => state.setProblem);
  const navigate = useNavigate();
  const { problemUuid } = useParams<'problemUuid'>();
  const setTestCaseList = useTestCaseListStore((state) => state.setTestCaseList);
  const setExecuteResultList = useExecuteResultListStore((state) => state.setExecuteResultList);

  const fetchProblem = useCallback(async () => {
    const response = await getProblem(problemUuid as string);
    if (response.statusCode !== 200) {
      navigate('/');
    }

    const problem = response.data;
    setProblem(problem);
    setTestCaseList(problem.inputOutputList.map(({ input, output }) => ({
      input, output: '', expected: output, readOnly: true, state: '실행 전',
    })));
    setExecuteResultList(problem.inputOutputList.map(({ input, output }) => ({
      input, output: '', expected: output, state: '실행 전',
    })));
  }, []);

  useEffect(() => {
    fetchProblem();
  }, []);

  return (
    <>
      {problem?.style && (<style>{problem.style}</style>)}
      <div className="h-screen overflow-x-hidden">
        <ProblemHeader problem={problem} />
        <div
          className="relative w-screen overflow-x-hidden"
          style={{
            height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_HEADER_HEIGHT}px)`,
          }}
        >
          <ProblemSection problem={problem} />
        </div>
        <ProblemFooter />
      </div>
    </>
  );
}
