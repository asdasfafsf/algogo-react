import { Button } from '@material-tailwind/react';
import { useCallback } from 'react';
import LanguageDropdown from '../atom/LanguageDropdown';
import useModal from '../plugins/modal/useModal';
import TestCaseModal from '../organism/TestCaseModal';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';
import * as CODE_MAP from '../constant/Code';
import useConfirmModal from '../hook/useConfirmModal';

export default function CodeControlPanel() {
  const modal = useModal();
  const [comfirm] = useConfirmModal();
  const { language, setCode, codeFromLanguage } = useCodeEditorStore((state) => ({
    language: state.language,
    setCode: state.setCode,
    codeFromLanguage: state.codeFromLanguage,
  }));
  const handleClickReset = useCallback(async () => {
    const isOk = await comfirm('초기화 하시겠습니까?');

    if (!isOk) {
      return;
    }

    const initializedCode = CODE_MAP[language];
    setCode(initializedCode);
    codeFromLanguage[language] = initializedCode;
  }, [language]);

  return (
    <div
      className="overflow-hidden w-full max-w-full h-12 bg-gray-900 text-white flex items-center justify-end px-2"
    >
      <div className="min-w-[520px] flex">
        <LanguageDropdown />
        <div className="w-4" />
        <div className="flex gap-1">
          <Button
            onClick={handleClickReset}
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
