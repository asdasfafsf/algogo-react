import {
  TranslucentOverlay, Line, Typography,
} from '@components/common/index';
import { Button } from '@components/Button/index';
import { useCallback, useEffect } from 'react';
import useModal from '@plugins/modal/useModal';
import CodeEditorFontSizeDropdown from './CodeEditorFontSizeDropdown';
import CodeEditorThemeDropdown from './CodeEditorThemeDropdown';

export default function CodeEditorSettingsModal() {
  const modal = useModal();
  const handleClose = useCallback(async () => {
    modal.top().resolve(false);
  }, [modal]);
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  return (
    <TranslucentOverlay className="items-start py-16">
      <div
        className="rounded-md bg-white w-full max-w-[640px] p-0"
      >
        <div className="flex px-8 py-4">
          <Typography variant="h6">
            에디터 설정
          </Typography>
        </div>
        <Line className="mb-4" />

        <div className="h-full">
          <div className="px-8">
            <div className="flex mb-2">
              <CodeEditorThemeDropdown theme="vs-dark" />
            </div>
            <div className="flex">
              <CodeEditorFontSizeDropdown fontSize={14} />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-1 px-8 my-4">
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
