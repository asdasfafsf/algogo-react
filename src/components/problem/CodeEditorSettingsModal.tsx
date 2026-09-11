import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Typography } from "@components/common/index";
import { Button } from "@components/Button/index";
import { Checkbox } from "@components/Checkbox";
import { useCodeEditorSettings } from "@hook/editor/useCodeEditorSettings";
import CodeEditorFontSizeDropdown from "./CodeEditorFontSizeDropdown";
import CodeEditorThemeDropdown from "./CodeEditorThemeDropdown";
import CodeEditorTabSizer from "./CodeEditorTabSizer";
import CodeEditorLineNumberDropdown from "./CodeEditorLineNumberDropdown";
import CodeEditorProblemResizer from "./CodeEditorProblemResizer";
import CodeEditorDefaultLanguageDropdown from "./CodeEditorDefaultLanguageDropdown";
import type { ModalComponentProps } from "@plugins/modal/ModalController";

export default function CodeEditorSettingsModal({
  resolve,
}: ModalComponentProps<boolean>) {
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
  } = useCodeEditorSettings(resolve);

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto p-0">
        <div className="w-full max-w-full animate-in rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl fade-in duration-200">
          {/* 헤더 */}
          <DialogHeader className="border-b border-border px-8 py-6 text-left">
            <DialogTitle>화면 설정</DialogTitle>
            <DialogDescription>
              문제 표시와 코드 편집기 설정을 변경합니다.
            </DialogDescription>
          </DialogHeader>

          {/* 본문 */}
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* 문제 설정 섹션 */}
              <div className="flex-1">
                <Typography
                  variant="paragraph"
                  weight="semibold"
                  className="mb-4 text-foreground"
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
                  className="mb-4 text-foreground"
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
                    handleSelect={(_, lineNumber) =>
                      selectLineNumber(lineNumber)
                    }
                  />
                  <CodeEditorDefaultLanguageDropdown
                    defaultLanguage={settings.defaultLanguage}
                    handleSelect={(_, language) =>
                      selectDefaultLanguage(language)
                    }
                  />
                  <div className="flex justify-start">
                    <Checkbox
                      checked={saveToServer}
                      onCheckedChange={toggleSaveToServer}
                      label="이 설정을 서버에 저장하기"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="flex justify-end gap-2 border-t border-border px-8 py-6">
            <Button color="gray" onClick={close}>
              취소
            </Button>
            <Button color="blue" onClick={save}>
              저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
