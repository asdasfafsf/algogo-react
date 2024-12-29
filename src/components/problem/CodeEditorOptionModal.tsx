import {
  TranslucentOverlay, Line, Typography,
} from '@components/common/index';
import { Button } from '@components/Button/index';

export default function CodeEditorOptionModal() {
  return (
    <TranslucentOverlay className="items-start py-16">
      <div
        className="min-h-64 rounded-md bg-white w-[600px] p-0"
      >
        <div className="flex px-8 pt-8">
          <Typography variant="h6">
            테스트 케이스
          </Typography>
        </div>
        <Line className="my-2 bg-white" />

        <div className="flex justify-end gap-1 px-8 mb-4">
          <Button
            color="blue"
          >
            설정
          </Button>
          <Button
            className="bg-gray-600"

          >
            닫기
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
