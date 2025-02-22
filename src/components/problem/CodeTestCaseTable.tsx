/* eslint-disable react/no-array-index-key */
import useExecuteTestCase from '@hook/useExecuteTestCase';
import useModal from '@plugins/modal/useModal';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Typography } from '@components/common';
import TestCaseModal from './TestCaseModal';

interface CodeTestCaseTableProps {
  executeResultList: TestCase[];
}

export default function CodeTestCaseTable({ executeResultList } : CodeTestCaseTableProps) {
  const modal = useModal();
  const { state, handleTest } = useExecuteTestCase();
  return (
    <div
      className="w-full h-full bg-gray-900"
    >
      <div className="w-full py-2 overflow-x-hidden flex justify-between">
        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center gap-1 px-3 py-1 rounded bg-opacity-10 bg-green-500">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <Typography variant="small" className="text-green-500 font-medium">
              성공
              {' '}
              {executeResultList.filter((test) => test.state === '일치').length}
            </Typography>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded bg-opacity-10 bg-red-500">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <Typography variant="small" className="text-red-500 font-medium">
              실패
              {' '}
              {executeResultList.filter((test) => test.state === '불일치').length}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 overflow-x-hidden min-w-[215px]">
          <Button
            onClick={() => modal.push('TESTCASE', TestCaseModal, {}) as Promise<void>}
            color="blue"
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
          >
            테스트 케이스 추가
          </Button>
          <Button
            onClick={handleTest}
            color="blue"
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
          >
            테스트
          </Button>
        </div>
      </div>
      <Card className="h-[calc(100%-96px)] w-full overflow-auto bg-gray-900">
        <table className="w-full text-center bg-gray-900 table-fixed min-w-max">
          <thead>
            <tr>
              {['입력', '출력', '예상 결과', '일치 여부'].map((head, index, arr) => (
                <th
                  key={head}
                  className={`${index + 1 !== arr.length ? 'w-[28%]' : 'w-[16%]'} border-b border-blue-gray-100 bg-gray-900 p-4`}
                >
                  <Typography
                    variant="small"
                    className="font-normal leading-none text-white opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-900">
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
