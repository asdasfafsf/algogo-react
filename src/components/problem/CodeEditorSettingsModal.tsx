import {
  TranslucentOverlay, Line, Typography,
} from '@components/common/index';
import { Button } from '@components/Button/index';
import { useCallback, useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import useCodeEditorStore from '@zustand/CodeEditorStore';
import { useProblemContentSizeStore } from '@zustand/ProblemContentSizeStore';
import CodeEditorFontSizeDropdown from './CodeEditorFontSizeDropdown';
import CodeEditorThemeDropdown from './CodeEditorThemeDropdown';
import CodeEditorTabSizer from './CodeEditorTabSizer';
import CodeEditorLineNumberDropdown from './CodeEditorLineNumberDropdown';
import CodeEditorProblemResizer from './CodeEditorProblemResizer';

export default function CodeEditorSettingsModal() {
  const modal = useModal();
  const handleClose = useCallback(async () => {
    while (modal?.top()?.Component === null) {
      modal.top().resolve(false);
    }
    modal.top().resolve(false);
  }, [modal]);
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          if (modal.top().Component !== null) {
            modal.top().resolve(false);
          }
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

  const problemContentSize = useProblemContentSizeStore((state) => state.size);
  const setProblemContentSize = useProblemContentSizeStore((state) => state.setSize);
  const codeEditorSettings = useCodeEditorStore((state) => state.settings);
  const setCodeEditorSettings = useCodeEditorStore((state) => state.setSettings);
  const [settings, setSettings] = useState(codeEditorSettings);
  const [size, setSize] = useState(problemContentSize);

  const handleOk = useCallback(async () => {
    setProblemContentSize(size);
    setCodeEditorSettings(settings);
    while (modal.top().Component === null) {
      modal.top().resolve(false);
    }
    modal.top().resolve(false);
  }, [size, settings, setSettings, setProblemContentSize]);

  return (
    <TranslucentOverlay className="items-start py-16">
      <div
        className="rounded-md bg-white w-full max-w-[600px] p-0"
      >
        <div className="flex px-8 py-4">
          <Typography variant="h6">
            화면 설정
          </Typography>
        </div>
        <Line className="mb-4" />

        <div className="h-full">
          <div className="flex w-full px-8">
            <div className="w-1/2">
              <Typography variant="paragraph" weight="semilight">
                문제 설정
              </Typography>
              <div className="mb-2" />
              <CodeEditorProblemResizer
                selectedIndex={Math.floor((size - 100) / 10)}
                handleSelect={(_, size) => { setSize(size); }}
              />
            </div>
            <div className="w-1/2">
              <Typography variant="paragraph" weight="semilight">
                에디터 설정
              </Typography>
              <div className="mb-2" />
              <div className="flex mb-2">
                <CodeEditorThemeDropdown
                  handleSelect={(_, theme) => {
                    setSettings((prev) => ({ ...prev, theme }));
                  }}
                  theme={settings.theme}
                />
              </div>
              <div className="flex mb-2">
                <CodeEditorFontSizeDropdown
                  handleSelect={(_, fontSize) => {
                    setSettings((prev) => ({ ...prev, fontSize }));
                  }}
                  fontSize={settings.fontSize}
                />
              </div>
              <div className="flex mb-2">
                <CodeEditorTabSizer
                  handleChange={(e) => {
                    const tabSize = Number(e.target.value || 4);
                    setSettings((prev) => ({ ...prev, tabSize }));
                  }}
                  tabSize={settings.tabSize}
                />
              </div>
              <div className="flex mb-2">
                <CodeEditorLineNumberDropdown
                  handleSelect={
                    (_, lineNumber) => {
                      setSettings((prev) => ({ ...prev, lineNumber }));
                    }
                  }
                  lineNumber={settings.lineNumber}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-1 px-8 my-4">
          <Button
            onClick={handleOk}
            color="blue"
          >
            설정
          </Button>
          <Button
            onClick={handleClose}
            className="bg-gray-600"

          >
            닫기
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
