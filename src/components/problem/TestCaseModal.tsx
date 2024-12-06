import { TrashIcon } from '@heroicons/react/24/outline';
import useTestCase from '@hook/useTestCase';
import useExecuteTestCase from '@hook/useExecuteTestCase';
import {
  TranslucentOverlay, Line, Typography, Textarea,
} from '@components/common/index';
import { Button } from '@components/Button/index';
import { Chip } from '@components/Chip/index';

export default function TestCaseModal() {
  const {
    testCaseList,
    handleClickAddTestCase,
    removeTestCase,
    handleClickClose,
    handleChangeInput,
    handleChangeOutput,
  } = useTestCase();

  const { handleTest } = useExecuteTestCase();

  return (
    <TranslucentOverlay className="items-start py-16">
      <div
        className="min-h-64 h-auto rounded-md bg-white w-[600px] p-8"
      >
        <div className="flex">
          <Typography variant="h6">
            테스트 케이스
          </Typography>
        </div>
        <Line className="my-2 bg-white" />

        {testCaseList.length
          ? testCaseList.map(({ input, expected, readOnly }, index, arr) => (
            <div key={index} className="w-full">
              <div className="relative flex w-full mb-2">
                <Chip
                  value={`입력 ${index + 1}`}
                  variant="ghost"
                  className="flex items-center w-16"
                  color={readOnly ? 'red' : 'blue'}
                />
                {readOnly
                  ? ''
                  : (
                    <div
                      onClick={() => removeTestCase(index)}
                      className="flex items-center justify-end w-full h-6 bg-white cursor-pointer"
                    >
                      <TrashIcon className="w-5 h-5 text-gray-600" />
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
                    className="font-D2Coding"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleChangeInput(index, e.target.value);
                    }}
                    placeholder="입력을 입력하세요"
                  />
                )}

              <Chip
                value={`출력 ${index + 1}`}
                variant="ghost"
                className="flex items-center w-16 mb-2"
                color={readOnly ? 'red' : 'blue'}
              />
              {' '}
              {readOnly
                ? (
                  <Textarea
                    value={expected}
                    readOnly
                  />
                )
                : (
                  <Textarea
                    value={expected}
                    className="font-D2Coding"
                    onChange={
                      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleChangeOutput(index, e.target.value);
                      }
                    }
                    placeholder="출력을 입력하세요"
                  />
                )}

              {index + 1 < arr.length ? <Line className="my-4 bg-white" /> : ''}

            </div>
          ))

          : (
            <div className="flex items-center justify-center h-24">
              <Typography variant="h6" className="text-gray-600">테스트 케이스가 없습니다.</Typography>
            </div>
          )}

        {testCaseList.length < 10
          ? (
            <div className="flex justify-center mb-5">
              <Button onClick={handleClickAddTestCase} className="w-full" color="blue">테스트 케이스 추가</Button>
            </div>
          )
          : ''}
        <div className="flex justify-end gap-1">
          <Button
            onClick={handleTest}
            color="blue"
          >
            테스트
          </Button>
          <Button
            onClick={handleClickClose}
            className="bg-gray-600"

          >
            닫기
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
