import useCodeControlPanel from '@hook/useCodeControlPanel';
import useExecuteTestCase from '@hook/useExecuteTestCase';
import useExecute from '@hook/useExecute';
import { Button } from '@components/Button';
import useSubmit from '@hook/useSubmit';
import LanguageDropdown from './LanguageDropdown';
import CodeTemplateDropdown from './CodeTemplateDropdown';

export default function CodeControlPanel() {
  const {
    handleClickReset,
    handleClickAddTestCase,
  } = useCodeControlPanel();

  const { state, handleTest } = useExecuteTestCase();
  const { handleExecute } = useExecute();
  const { handleSubmit } = useSubmit();

  return (
    <div
      className="flex items-center justify-end w-full h-12 max-w-full px-2 overflow-hidden text-white bg-gray-900"
    >
      <div className="absolute sm:min-w-[480px] flex">
        <LanguageDropdown />
        <CodeTemplateDropdown />
        <div className="hidden gap-1 ml-4 sm:flex">
          <Button
            onClick={handleClickReset}
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
            color="blue"
            size="small"
          >
            초기화
          </Button>
          <Button
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
            color="blue"
            size="small"
            onClick={handleExecute}
          >
            실행
          </Button>
          <Button
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
            size="small"
            color="blue"
            onClick={handleClickAddTestCase}
          >
            테스트 케이스 추가
          </Button>

          <Button
            disabled={state === 'PENDING'}
            className={`${state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}`}
            color="blue"
            size="small"
            onClick={handleTest}
          >
            테스트
          </Button>

          <Button
            disabled={state === 'PENDING'}
            className={state === 'PENDING' ? 'bg-gray-600 cursor-not-allowed' : ''}
            color="blue"
            size="small"
            onClick={handleSubmit}
          >
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}
