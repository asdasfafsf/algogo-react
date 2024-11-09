import { Card } from '@components/Card/index';
import { useState } from 'react';
import { ProblemStateChip, ProblemLevelChip } from '@components/Chip/index';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import ProblemThSort from './ProblemThSort';
import {
  PROBLEM_SORT_ANSWER_RATE_ASC,
  PROBLEM_SORT_ANSWER_RATE_DESC,
  PROBLEM_SORT_LEVEL_ASC, PROBLEM_SORT_LEVEL_DESC, PROBLEM_SORT_TITLE_ASC, PROBLEM_SORT_TITLE_DESC,
} from '../../constant/ProblemSort';

export default function ProblemTable() {
  const [problemSort, setProblemSort] = useState<ProblemSort>(0);
  const [isOpenProblemGrade, setProblemOpenGrade] = useState(false);

  return (
    <Card className="p-0 overflow-x-auto">
      반가워
      <Button type="text" size="small" color="blue">방가</Button>

      <table className="w-full min-w-[800px] table-fixed">
        <thead className="h-12 mb-12 border-b border-gray-300">
          <tr>
            <th className="w-16 pl-3 text-center">
              <Typography weight="semibold" variant="medium">
                상태
              </Typography>
            </th>
            <ProblemThSort
              className="w-full pl-12 min-w-24"
              sort={problemSort === PROBLEM_SORT_TITLE_ASC
                ? 1 : problemSort === PROBLEM_SORT_TITLE_DESC ? 2 : 0}
            >
              제목
            </ProblemThSort>

            <ProblemThSort
              className="text-center w-36"
              sort={problemSort === PROBLEM_SORT_LEVEL_ASC
                ? 1 : problemSort === PROBLEM_SORT_LEVEL_DESC ? 2 : 0}
            >
              난이도
            </ProblemThSort>
            <ProblemThSort
              className="w-32"
              sort={problemSort === PROBLEM_SORT_ANSWER_RATE_ASC
                ? 1 : problemSort === PROBLEM_SORT_ANSWER_RATE_DESC ? 2 : 0}
            >
              정답률
            </ProblemThSort>
            <ProblemThSort
              className="w-24"
              sort={problemSort === 40 ? 1 : problemSort === 41 ? 2 : 0}
            >
              제출
            </ProblemThSort>
            <th className="w-24">
              <Typography weight="semibold" variant="medium">출처</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-16 border-b border-gray-300">
            <td className="flex items-center justify-center w-full h-16 pl-3">
              <ProblemStateChip state={0} value="" />
            </td>
            <td className="w-full pl-12">
              <Typography variant="medium" weight="semilight">저는 문제입니다</Typography>
            </td>
            <td className="w-full">
              <div className="flex items-center w-full justify-left">
                <ProblemLevelChip level="플래티넘 5" />
              </div>
            </td>
            <td>
              <Typography variant="medium" weight="light">100%</Typography>
            </td>
            <td><Typography variant="medium" weight="light">49521312</Typography></td>
            <td>
              <Typography variant="medium" weight="light">49521312</Typography>
            </td>
          </tr>
        </tbody>
      </table>

    </Card>
  );
}
