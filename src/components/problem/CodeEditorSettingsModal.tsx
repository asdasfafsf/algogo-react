import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
              <section className="flex-1" aria-labelledby="problem-settings">
                <h3
                  id="problem-settings"
                  className="mb-4 text-sm font-semibold text-foreground"
                >
                  문제 설정
                </h3>
                <CodeEditorProblemResizer
                  selectedIndex={Math.floor((problemContentSize - 100) / 10)}
                  handleSelect={(_, size) => selectProblemContentSize(size)}
                />
              </section>

              {/* 에디터 설정 섹션 */}
              <section className="flex-1" aria-labelledby="editor-settings">
                <h3
                  id="editor-settings"
                  className="mb-4 text-sm font-semibold text-foreground"
                >
                  에디터 설정
                </h3>
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
                  <div className="flex items-center justify-start gap-2">
                    <Checkbox
                      id="save-editor-settings"
                      checked={saveToServer}
                      onCheckedChange={toggleSaveToServer}
                    />
                    <label
                      htmlFor="save-editor-settings"
                      className="cursor-pointer text-sm font-medium text-foreground"
                    >
                      이 설정을 서버에 저장하기
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* 푸터 */}
          <div className="flex justify-end gap-2 border-t border-border px-8 py-6">
            <Button variant="outline" onClick={close}>
              취소
            </Button>
            <Button onClick={save}>저장</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
