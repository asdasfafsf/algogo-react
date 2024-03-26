/* eslint-disable react/no-array-index-key */
import {
  Button, Chip, Textarea, Typography,
} from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/outline';
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
    removeTestCase,
    handleClickClose,
    handleChangeInput,
    handleChangeOutput] = useTestCase(testCaseList);

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
            <div key={index} className="w-full">
              <div className="flex relative mb-2 w-full">
                <Chip
                  value={`입력 ${index + 1}`}
                  variant="ghost"
                  className="w-14 flex items-center"
                  color={readOnly ? 'red' : 'blue'}
                />
                {readOnly
                  ? ''
                  : (
                    <div
                      onClick={() => removeTestCase(index)}
                      className="w-full h-6 bg-white cursor-pointer flex items-center justify-end"
                    >
                      <TrashIcon className="text-gray-600 w-5 h-5" />
                    </div>
                  )}

              </div>
              {readOnly
                ? (
                  <Textarea
                    value={input}
                    readOnly
                  />
                )
                : (
                  <Textarea
                    value={input}
                    onChange={(e) => handleChangeInput(index, e.target.value)}
                    placeholder="입력을 입력하세요"
                  />
                )}

              <Chip
                value={`출력 ${index + 1}`}
                variant="ghost"
                className="w-14 flex items-center  mb-2"
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
                  <Textarea
                    value={output}
                    onChange={(e) => handleChangeOutput(index, e.target.value)}
                    placeholder="출력을 입력하세요"
                  />
                )}

              {index + 1 < arr.length ? <Line className="my-4 bg-white" /> : ''}

            </div>
          ))

          : (
            <div className="h-24 flex items-center justify-center">
              <Typography variant="h6" className="text-gray-600">테스트 케이스가 없습니다.</Typography>
            </div>
          )}

        {testCases.length < 10
          ? (
            <div className="flex justify-center mb-5">
              <Button onClick={handleClickAddTestCase} className="w-full" color="blue">테스트 케이스 추가</Button>
            </div>
          )
          : ''}
        <div className="flex justify-end gap-1">
          <Button onClick={handleClickTest} color="blue">테스트</Button>
          <Button onClick={handleClickClose} className="bg-gray-600" color="blue-gray">닫기</Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
