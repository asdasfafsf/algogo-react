import { Button } from '@material-tailwind/react';
import LanguageDropdown from '../atom/LanguageDropdown';
import useCodeControlPanel from '../hook/useCodeControlPanel';
import { useExecute } from '../hook/useExecute';

export default function CodeControlPanel() {
  const {
    handleClickReset,
    handleClickAddTestCase,
  } = useCodeControlPanel();

  const { state, handleTest } = useExecute();

  return (
    <div
      className="flex items-center justify-end w-full h-12 max-w-full px-2 overflow-hidden text-white bg-gray-900"
    >
      <div className="sm:min-w-[520px] flex">
        <LanguageDropdown />
        <div className="w-4" />
        <div className="hidden gap-1 sm:flex">
          <Button
            onClick={handleClickReset}
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}

            color="blue"
            size="sm"
          >
            초기화
          </Button>
          <Button
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
            color="blue"
            size="sm"
          >
            실행
          </Button>
          <Button
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
            size="sm"
            color="blue"
            onClick={handleClickAddTestCase}
          >
            테스트 케이스 추가
          </Button>

          <Button
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
            color="blue"
            size="sm"
            onClick={handleTest}
          >
            테스트
          </Button>

          <Button
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
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
