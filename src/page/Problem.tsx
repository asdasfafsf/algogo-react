import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import ProblemFooter from '../template/ProblemFooter';
import ProblemHeader from '../template/ProblemHeader';
import ProblemSection from '../template/ProblemSection';
import useTestCaseListStore from '../zustand/TestCaseListStore';
import useExecuteResultListStore from '../zustand/ExecuteResultListStore';
import { getProblem } from '../api/problems';

export default function ProblemPage() {
  const [problem, setProblem] = useState<ResponseProblem>();
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
      input, output, readOnly: true,
    })));
    setExecuteResultList(problem.inputOutputList.map(({ input, output }) => ({
      input, output: '', expected: output, state: '실행 전',
    })));
  }, []);

  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <div className="h-screen overflow-x-hidden">
      <ProblemHeader problemTitle={problem ? problem.title : '불러오는 중'} />
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
  );
}
