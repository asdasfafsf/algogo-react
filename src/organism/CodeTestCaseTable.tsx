/* eslint-disable react/no-array-index-key */
import { Button, Card, Typography } from '@material-tailwind/react';
import useModal from '../plugins/modal/useModal';
import TestCaseModal from './TestCaseModal';

interface CodeTestCaseTableProps {
  executeResultList: ExecuteResult[];
}

export default function CodeTestCaseTable({ executeResultList } : CodeTestCaseTableProps) {
  const modal = useModal();
  return (
    <div
      className="w-full h-full bg-gray-900"
    >
      <div className="w-full py-2 overflow-x-hidden">
        <div className="flex items-center justify-end gap-1 overflow-x-hidden min-w-[215px]">
          <Button onClick={() => modal.push('testCase', TestCaseModal, {})} color="blue">테스트 케이스 추가</Button>
          <Button color="blue">실행</Button>
        </div>
      </div>
      <Card className="h-[calc(100%-56px)] w-full overflow-scroll bg-gray-900">
        <table className="w-full text-center table-fixed min-w-max">
          <thead>
            <tr>
              {['입력', '출력', '예상 결과', '일치 여부'].map((head, index, arr) => (
                <th
                  key={head}
                  className={`${index + 1 !== arr.length ? 'w-[28%]' : 'w-[16%]'} border-b border-blue-gray-100 bg-black p-4`}
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {executeResultList.map(({
              input, output, expected, state,
            }, index, arr) => {
              const isLast = index === arr.length - 1;
              const classes = `bg-gray-900 p-4 ${isLast ? '' : 'border-b'}`;

              return (
                <tr className="h-12" key={index}>
                  <td className={`${classes} w-28%`}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal text-center break-words"
                    >
                      {input}
                    </Typography>
                  </td>
                  <td className={`${classes} w-28%`}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal text-center break-words"
                    >
                      {output}
                    </Typography>
                  </td>
                  <td className={`${classes} w-28%`}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal text-center break-words"
                    >
                      {expected}
                    </Typography>
                  </td>
                  <td className={`${classes} w-16%`}>
                    <Typography
                      variant="small"
                      color={state === '불일치' ? 'red' : (state === '일치' ? 'green' : 'gray')}
                      className="font-normal break-words"
                    >
                      {state}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
