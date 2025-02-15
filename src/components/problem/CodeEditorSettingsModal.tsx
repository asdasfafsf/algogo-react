/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TranslucentOverlay, Line, Typography,
} from '@components/common/index';
import { Button } from '@components/Button/index';
import { useCallback, useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import useCodeEditorStore from '@zustand/CodeEditorStore';
import { useProblemContentSizeStore } from '@zustand/ProblemContentSizeStore';
import { Checkbox } from '@components/Checkbox';
import CodeEditorFontSizeDropdown from './CodeEditorFontSizeDropdown';
import CodeEditorThemeDropdown from './CodeEditorThemeDropdown';
import CodeEditorTabSizer from './CodeEditorTabSizer';
import CodeEditorLineNumberDropdown from './CodeEditorLineNumberDropdown';
import CodeEditorProblemResizer from './CodeEditorProblemResizer';
import CodeEditorDefaultLanguageDropdown from './CodeEditorDefaultLanguageDropdown';

export default function CodeEditorSettingsModal() {
  const [, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const modal = useModal();

  const handleClose = useCallback(() => {
    modal.top().resolve(false);
  }, [modal]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleClose]);

  const problemContentSize = useProblemContentSizeStore((state) => state.size);
  const setProblemContentSize = useProblemContentSizeStore((state) => state.setSize);
  const codeEditorSettings = useCodeEditorStore((state) => state.settings);
  const setCodeEditorSettings = useCodeEditorStore((state) => state.setSettings);
  const [settings, setSettings] = useState(codeEditorSettings);
  const [size, setSize] = useState(problemContentSize);
  const [saveToServer, setSaveToServer] = useState(true);
  const updateCodeEditorSettings = useCodeEditorStore((state) => state.updateSetting);

  const handleOk = useCallback(async () => {
    setProblemContentSize(size);
    setCodeEditorSettings(settings);

    await updateCodeEditorSettings({
      ...settings,
      saveToServer,
    });

    modal.top().resolve(false);
  }, [size, settings, setCodeEditorSettings, setProblemContentSize, modal, saveToServer]);

  return (
    <TranslucentOverlay className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="rounded-2xl bg-white w-full max-w-[600px] shadow-2xl animate-in fade-in duration-200">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <Typography variant="h6" className="font-bold text-gray-800">화면 설정</Typography>
        </div>

        {/* 본문 */}
        <div className="p-8">
          <div className="flex gap-12">
            {/* 문제 설정 섹션 */}
            <div className="flex-1">
              <Typography variant="paragraph" weight="semibold" className="mb-4 text-gray-700">
                문제 설정
              </Typography>
              <CodeEditorProblemResizer
                selectedIndex={Math.floor((size - 100) / 10)}
                handleSelect={(_, size) => { setSize(size); }}
              />
            </div>

            {/* 에디터 설정 섹션 */}
            <div className="flex-1">
              <Typography variant="paragraph" weight="semibold" className="mb-4 text-gray-700">
                에디터 설정
              </Typography>
              <div className="space-y-4">
                <CodeEditorThemeDropdown
                  theme={settings.theme}
                  handleSelect={(_, theme) => {
                    setSettings((prev) => ({ ...prev, theme }));
                  }}
                />
                <CodeEditorFontSizeDropdown
                  fontSize={settings.fontSize}
                  handleSelect={(_, fontSize) => {
                    setSettings((prev) => ({ ...prev, fontSize }));
                  }}
                />
                <CodeEditorTabSizer
                  tabSize={settings.tabSize}
                  handleChange={(e) => {
                    const tabSize = Number(e.target.value || 4);
                    setSettings((prev) => ({ ...prev, tabSize }));
                  }}
                />
                <CodeEditorLineNumberDropdown
                  lineNumber={settings.lineNumber}
                  handleSelect={(_, lineNumber) => {
                    setSettings((prev) => ({ ...prev, lineNumber }));
                  }}
                />
                <CodeEditorDefaultLanguageDropdown
                  defaultLanguage={settings.defaultLanguage}
                  handleSelect={(_, defaultLanguage) => {
                    setSettings((prev) => ({ ...prev, defaultLanguage }));
                  }}
                />
                <div className="flex justify-start">
                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-800 group">
                    <Checkbox
                      checked={saveToServer}
                      onClick={() => {
                        setSaveToServer((prev) => !prev);
                      }}
                      className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <span className="text-sm font-medium transition-colors group-hover:text-gray-800">
                      이 설정을 서버에 저장하기
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-2 px-8 py-6 border-t border-gray-100">
          <Button
            color="gray"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            color="blue"
            onClick={handleOk}
          >
            설정
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
