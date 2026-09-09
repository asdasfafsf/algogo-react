import { TranslucentOverlay, Typography } from "@components/common/index";
import { Button } from "@components/Button/index";
import { Checkbox } from "@components/Checkbox";
import { useCodeEditorSettings } from "@hook/editor/useCodeEditorSettings";
import CodeEditorFontSizeDropdown from "./CodeEditorFontSizeDropdown";
import CodeEditorThemeDropdown from "./CodeEditorThemeDropdown";
import CodeEditorTabSizer from "./CodeEditorTabSizer";
import CodeEditorLineNumberDropdown from "./CodeEditorLineNumberDropdown";
import CodeEditorProblemResizer from "./CodeEditorProblemResizer";
import CodeEditorDefaultLanguageDropdown from "./CodeEditorDefaultLanguageDropdown";

export default function CodeEditorSettingsModal() {
  const {
    settings,
    problemContentSize,
    saveToServer,
    close,
    save,
    selectProblemContentSize,
    selectTheme,
    selectFontSize,
    changeTabSize,
    selectLineNumber,
    selectDefaultLanguage,
    toggleSaveToServer,
  } = useCodeEditorSettings();

  return (
    <TranslucentOverlay className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="rounded-2xl bg-white w-full max-w-[600px] shadow-2xl animate-in fade-in duration-200">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <Typography variant="h6" className="font-bold text-gray-800">
            화면 설정
          </Typography>
        </div>

        {/* 본문 */}
        <div className="p-8">
          <div className="flex gap-12">
            {/* 문제 설정 섹션 */}
            <div className="flex-1">
              <Typography
                variant="paragraph"
                weight="semibold"
                className="mb-4 text-gray-700"
              >
                문제 설정
              </Typography>
              <CodeEditorProblemResizer
                selectedIndex={Math.floor((problemContentSize - 100) / 10)}
                handleSelect={(_, size) => selectProblemContentSize(size)}
              />
            </div>

            {/* 에디터 설정 섹션 */}
            <div className="flex-1">
              <Typography
                variant="paragraph"
                weight="semibold"
                className="mb-4 text-gray-700"
              >
                에디터 설정
              </Typography>
              <div className="space-y-4">
                <CodeEditorThemeDropdown
                  theme={settings.theme}
                  handleSelect={(_, theme) => selectTheme(theme)}
                />
                <CodeEditorFontSizeDropdown
                  fontSize={settings.fontSize}
                  handleSelect={(_, fontSize) => selectFontSize(fontSize)}
                />
                <CodeEditorTabSizer
                  tabSize={settings.tabSize}
                  handleChange={(event) => changeTabSize(event.target.value)}
                />
                <CodeEditorLineNumberDropdown
                  lineNumber={settings.lineNumber}
                  handleSelect={(_, lineNumber) => selectLineNumber(lineNumber)}
                />
                <CodeEditorDefaultLanguageDropdown
                  defaultLanguage={settings.defaultLanguage}
                  handleSelect={(_, language) =>
                    selectDefaultLanguage(language)
                  }
                />
                <div className="flex justify-start">
                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-800 group">
                    <Checkbox
                      checked={saveToServer}
                      onClick={toggleSaveToServer}
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
          <Button color="gray" onClick={close}>
            취소
          </Button>
          <Button color="blue" onClick={save}>
            설정
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
