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
      {problem?.style && <style>{problem.style}</style>}
      <style>
        {`
          .problem-content .no-mathjax{ 
            display: none;
          }
          .problem-content * {
            list-style-position: inside;
          }

          .problem-content img {
            display: inline;
          }

          .problem-content ul {
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            box-sizing: border-box;
            color: rgb(51, 51, 51);
            display: block;
            font-size: 16px;
            line-height: 30px;
            list-style-type: disc;
            margin-block-end: 10px;
            margin-block-start: 0px;
            margin-bottom: 10px;
            margin-left: 0px;
            margin-right: 0px;
            margin-top: 0px;
            padding-bottom: 0px;
            padding-inline-start: 0px;
            padding-left: 0px;
            padding-right: 0px;
            padding-top: 0px;
            text-size-adjust: 100%;
            unicode-bidi: isolate;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }
            
          .problem-content p {
            border-radius: 0px;
            box-sizing: border-box;
            color: rgb(85, 85, 85);
            display: block;
            font-size: 16px;
            line-height: 30px;
            margin: 0px 0px 10px 0px;
            padding: 0px;
            text-size-adjust: 100%;
          }
          
          .problem-content pre {
            display: block;
            padding: 9.5px;
            margin: 0 0 10px;
            font-size: 13px;
            line-height: 1.42857143;
            color: #333;
            word-break: break-all;
            word-wrap: break-word;
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .problem-content ol {
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            box-sizing: border-box;
            color: rgb(51, 51, 51);
            display: block;
            font-size: 16px;
            line-height: 30px;
            list-style-type: decimal;
            margin-block-end: 10px;
            margin-block-start: 10px;
            margin-bottom: 10px;
            margin-left: 0px;
            margin-right: 0px;
            margin-top: 0px;
            padding-bottom: 0px;
            padding-right: 0px;
            padding-top: 0px;
   
            text-size-adjust: 100%;
            unicode-bidi: isolate;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          .problem-content li {
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            box-sizing: border-box;
            color: rgb(85, 85, 85);
            font-size: 16px;
            line-height: 30px;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            margin-top: 0px;
            padding-bottom: 0px;
            
            padding-right: 0px;
            padding-top: 0px;
            text-align: left;
            text-size-adjust: 100%;
            unicode-bidi: isolate;
            
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

    
          /* 테이블 스타일 추가 */
          .problem-content table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
            border-spacing: 0;
          }
          
          .problem-content table th,
          .problem-content table td {
            padding: 8px;
            line-height: 1.42857143;
            vertical-align: top;
            border: 1px solid #ddd;
            text-align: left;
          }
          
          .problem-content table th {
            font-weight: bold;
            background-color: #f5f5f5;
          }
          
          .problem-content table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          
          .problem-content table tr:hover {
            background-color: #f5f5f5;
          }
          
          /* 반응형 테이블 */
          @media screen and (max-width: 767px) {
            .problem-content table {
              display: block;
              width: 100%;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }
          }
          
        `}
      </style>
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
