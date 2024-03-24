import {
  Button, Chip, Textarea, Typography,
} from '@material-tailwind/react';
import TranslucentOverlay from '../atom/TranslucentOverlay';
import Line from '../atom/Line';

interface TestCaseModalProps {
  testCaseList: TestCase[]
}

export default function TestCaseModal({ testCaseList }: TestCaseModalProps) {
  const ttestCaseList = [
    { input: 'ddd', outoput: '342423423', readOnly: true },
    { input: 'ddd', outoput: '342423423', readOnly: true },
    { input: 'ddd', outoput: '342423423', readOnly: false },
    { input: 'ddd', outoput: '342423423', readOnly: false },
    { input: 'ddd', outoput: '342423423', readOnly: false },
    { input: 'ddd', outoput: '342423423', readOnly: false },
    { input: 'ddd', outoput: '342423423', readOnly: false },
  ];

  return (
    <TranslucentOverlay className="py-16 items-start">
      <div
        className="min-h-64 h-auto rounded-md bg-white w-[600px] p-8"
      >
        <Typography variant="h5">
          테스트 케이스
        </Typography>
        <Line className="my-2" />

        {ttestCaseList.map(({ input, output, readOnly }, index, arr) => (
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
        ))}

        <div className="flex justify-center gap-1">
          <Button color="blue">테스트 케이스 추가</Button>
          <Button color="blue">테스트</Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
