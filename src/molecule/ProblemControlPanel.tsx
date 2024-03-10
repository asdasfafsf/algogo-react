import { Button } from '@material-tailwind/react';
import Dropdown from '../atom/Dropdown';

export default function ProblemControlPanel() {
  return (
    <nav
      className="h-12 bg-gray-900 text-white p-2 flex items-center justify-end min-w-[600px]"
    >
      <Dropdown />
      <div className="w-4" />
      <div className="flex gap-1">
        <Button
          color="blue"
          size="sm"
        //   variant="text"
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
        //   variant="text"
        >
          테스트 케이스 추가
        </Button>

        <Button
          color="blue"
          size="sm"
        //   variant="text"
        >
          테스트
        </Button>

        <Button
          color="blue"
          size="sm"
        //   variant="text"
        >
          제출
        </Button>
      </div>
    </nav>
  );
}
