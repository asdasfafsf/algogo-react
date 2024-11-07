import { Card } from '@components/Card/index';
import { useState } from 'react';
import ProblemStateChip from '../Chip/ProblemStateChip';
import Typography from '../Typography/Typography';

export default function ProblemTable() {
  const [problemSort, setProblemSort] = useState(0);
  const [isOpenProblemGrade, setProblemOpenGrade] = useState(false);

  return (
    <Card>
      반가워
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed">
          <thead>
            <tr>
              <th className="w-24 pl-2.5 text-left">
                <Typography weight="semibold" variant="medium">상태</Typography>
              </th>
              <th className="w-full text-left min-w-24">
                <Typography weight="semibold"variant="medium">제목</Typography>
              </th>
              <th className="w-24 text-left">
                <Typography weight="semibold"variant="medium">난이도</Typography>
              </th>
              <th className="w-24 text-left">
                <Typography weight="semibold" variant="medium">정답률</Typography>
              </th>
              <th className="w-24 text-left">
                <Typography weight="semibold" variant="medium">제출</Typography>
              </th>
              <th className="w-24 text-left">
                <Typography weight="semibold" variant="medium">출처</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><ProblemStateChip state={0} value="" /></td>
              <td>테dd스트 제목</td>
              <td>상</td>
              <td>90%</td>
              <td>100회</td>
              <td>사이트</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
