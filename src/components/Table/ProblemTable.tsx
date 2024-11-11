import { Card } from '@components/Card/index';
import { useState } from 'react';
import { ProblemStateChip, ProblemLevelChip } from '@components/Chip/index';
import { LinkIcon } from '@heroicons/react/24/solid';
import { Pagebar } from '@components/Pagebar/index';
import { Input } from '@components/Input/index';
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
    <Card className="p-0">
      반가워
      <Button variant="text" size="small" color="blue">방가</Button>

      <div>
        방가방
        <Input label="제목" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed">
          <thead className="h-12 mb-12 border-b border-gray-300">
            <tr>
              <th className="w-16 pl-4 text-center">
                <Typography weight="semibold" variant="medium">
                  상태
                </Typography>
              </th>
              <ProblemThSort
                className=" pl-12 min-w-[400px] w-full"
                sort={problemSort === PROBLEM_SORT_TITLE_ASC
                  ? 1 : problemSort === PROBLEM_SORT_TITLE_DESC ? 2 : 0}
              >
                제목
              </ProblemThSort>

              <ProblemThSort
                className="pl-2 text-center w-36"
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
                className="w-28"
                sort={problemSort === 40 ? 1 : problemSort === 41 ? 2 : 0}
              >
                제출
              </ProblemThSort>
              <th className="w-20">
                <div className="flex items-center ">
                  <Typography className="text-left" weight="semibold" variant="medium">출처</Typography>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {['플래티넘 5', '브론즈 1', '다이아 1', '골드 1', '실버 1'].map((elem) => (
              <tr key={elem} className="h-16 border-b border-gray-300">
                <td className="flex items-center justify-center h-16 pl-4 animate-fadeIn">
                  <ProblemStateChip state={0} value="" />
                </td>
                <td className=" pl-12 min-w-[400px]">
                  <Typography className="text-gray-700 animate-fadeIn" variant="medium" weight="semilight">저는 문제입니다</Typography>
                </td>
                <td className="">
                  <div className="flex items-center animate-fadeIn justify-left">
                    <ProblemLevelChip level={elem} />
                  </div>
                </td>
                <td>
                  <Typography className="text-gray-700 animate-fadeIn" variant="medium" weight="semilight">100%</Typography>
                </td>
                <td>
                  <Typography className="text-gray-700 animate-fadeIn" variant="medium" weight="semilight">1</Typography>
                </td>
                <td>
                  <Typography className="text-gray-700 animate-fadeIn" variant="medium" weight="semilight">
                    <LinkIcon className="w-4 h-4" />
                  </Typography>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      <div className="flex items-center w-full h-20">
        <Pagebar
          currentPage={1}
          displayedPageRange={10}
          maxPage={5}
          handleChangePage={() => {}}
        />
      </div>

    </Card>
  );
}
