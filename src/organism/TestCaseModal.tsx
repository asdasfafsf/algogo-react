import {
  Button, Chip, Textarea, Typography,
} from '@material-tailwind/react';
import TranslucentOverlay from '../atom/TranslucentOverlay';
import Line from '../atom/Line';
import useTestCase from '../hook/useTestCase';

interface TestCaseModalProps {
  testCaseList: TestCase[]
}

export default function TestCaseModal({ testCaseList = [] }: TestCaseModalProps) {
  const [testCases,
    handleClickAddTestCase,
    handleClickTest,
    handleClickRemoveTestCase,
    handleClickClose] = useTestCase(testCaseList);

  return (
    <TranslucentOverlay className="py-16 items-start">
      <div
        className="min-h-64 h-auto rounded-md bg-white w-[600px] p-8"
      >
        <div className="flex">
          <Typography variant="h6">
            테스트 케이스
          </Typography>
        </div>
        <Line className="my-2 bg-white" />

        {testCases.length
          ? testCases.map(({ input, output, readOnly }, index, arr) => (
            <div className="w-full">
              <div className="flex mb-2">
                <Chip
                  value={`입력 ${index + 1}`}
                  variant="ghost"
                  className="w-14 flex items-center"
                  color={readOnly ? 'red' : 'blue'}
                />
              </div>
              {readOnly
                ? (
                  <Textarea
                    value={input}
                    readOnly
                  />
                )
                : (
                  <Textarea />
                )}

              <Chip
                value={`출력 ${index + 1}`}
                variant="ghost"
                className="w-14 flex items-center mb-2"
                color={readOnly ? 'red' : 'blue'}
              />
              {' '}
              {readOnly
                ? (
                  <Textarea
                    value={output}
                    readOnly
                  />
                )
                : (
                  <Textarea />
                )}

              {index + 1 < arr.length ? <Line className="my-4 bg-white" /> : ''}

            </div>
          ))

          : (
            <div className="h-24 flex items-center justify-center">
              <Typography variant="h6" className="text-gray-600">테스트 케이스가 없습니다.</Typography>
            </div>
          )}

        <div className="flex justify-center mb-5">
          <Button onClick={handleClickAddTestCase} className="w-full" color="blue">테스트 케이스 추가</Button>
        </div>
        <div className="flex justify-end gap-1">
          <Button onClick={handleClickTest} color="blue">테스트</Button>
          <Button onClick={handleClickClose} className="bg-gray-600" color="blue-gray">닫기</Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
