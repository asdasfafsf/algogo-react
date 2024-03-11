import { Button } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';

export default function CodeControlPanel() {
  return (
    <div
      className="w-full max-w-full h-12 bg-gray-900 text-white flex items-center justify-end px-2"
    >
      <Dropdown />
      <div className="w-4" />
      <div className="flex gap-1">
        <Button
          color="blue"
          size="sm"
        >
          초기화
        </Button>
        <Button
        //   variant="text"
          color="blue"
          size="sm"
        >
          실행
        </Button>
        <Button
          color="blue"
          size="sm"
        >
          테스트 케이스 추가
        </Button>

        <Button
          color="blue"
          size="sm"
        >
          테스트
        </Button>

        <Button
          color="blue"
          size="sm"
        >
          제출
        </Button>
      </div>
    </div>
  );
}
