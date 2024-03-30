import { Button } from '@material-tailwind/react';
import LanguageDropdown from '../atom/LanguageDropdown';
import useModal from '../plugins/modal/useModal';
import TestCaseModal from '../organism/TestCaseModal';

export default function CodeControlPanel() {
  const modal = useModal();

  return (
    <div
      className="overflow-hidden w-full max-w-full h-12 bg-gray-900 text-white flex items-center justify-end px-2"
    >
      <div className="min-w-[520px] flex">
        <LanguageDropdown />
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
            onClick={() => {
              modal.push('key', TestCaseModal, {});
            }}
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
    </div>
  );
}
