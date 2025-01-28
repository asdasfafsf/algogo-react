import {
  ComputerDesktopIcon, PlayIcon, PlusIcon, RocketLaunchIcon, TrashIcon,
} from '@heroicons/react/16/solid';
import useCodeDropUp from '@hook/useCodeDropUp';
import { DropUp, DropUpItem } from '@components/Dropdown/index';

export default function CodeDropUp() {
  const [handleClickAddTestCase, handleClickReset] = useCodeDropUp();

  return (
    <DropUp
      className="z-30 bg-transparent sm:hidden bottom-20 right-8 min-h-14"
    >
      <DropUpItem content="초기화">
        <div
          onClick={handleClickReset}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full"
        >
          <TrashIcon
            className="w-6 h-6"
            color="white"
          />
        </div>
      </DropUpItem>
      <DropUpItem content="제출">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
          <RocketLaunchIcon
            className="w-6 h-6"
            color="white"
          />
        </div>
      </DropUpItem>
      <DropUpItem content="테스트 케이스 추가">
        <div
          onClick={(handleClickAddTestCase)}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full"
        >
          <PlusIcon
            className="w-6 h-6"
            color="white"
          />
        </div>
      </DropUpItem>
      <DropUpItem content="테스트">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
          <ComputerDesktopIcon
            className="w-6 h-6"
            color="white"
          />
        </div>
      </DropUpItem>
      <DropUpItem content="실행">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
          <PlayIcon
            className="w-6 h-6"
            color="white"
          />
        </div>
      </DropUpItem>
    </DropUp>
  );
}
