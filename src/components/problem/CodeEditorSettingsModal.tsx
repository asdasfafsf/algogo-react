import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ModalBody,
  ModalFooter,
  ModalSurface,
} from "@/components/ui/modal-surface";
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
    isSaving,
    saveError,
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
    <ModalSurface
      open={true}
      onOpenChange={(open) => {
        if (!open) close();
      }}
      size="lg"
      title="화면 설정"
      description="문제 표시와 코드 편집기 설정을 변경합니다."
      contentProps={{ showCloseButton: !isSaving }}
    >
      <ModalBody>
        <fieldset
          disabled={isSaving}
          aria-busy={isSaving}
          className="grid gap-6 sm:grid-cols-2"
        >
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
                handleSelect={(_, lineNumber) => selectLineNumber(lineNumber)}
              />
              <CodeEditorDefaultLanguageDropdown
                defaultLanguage={settings.defaultLanguage}
                handleSelect={(_, language) => selectDefaultLanguage(language)}
              />
              <div className="flex items-center justify-start gap-2">
                <Checkbox
                  id="save-editor-settings"
                  checked={saveToServer}
                  disabled={isSaving}
                  onCheckedChange={toggleSaveToServer}
                />
                <label
                  htmlFor="save-editor-settings"
                  className={`text-sm font-medium ${
                    isSaving
                      ? "cursor-not-allowed text-muted-foreground"
                      : "cursor-pointer text-foreground"
                  }`}
                >
                  이 설정을 서버에 저장하기
                </label>
              </div>
            </div>
          </section>
        </fieldset>
        {saveError && (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {saveError}
          </p>
        )}
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" disabled={isSaving} onClick={close}>
          취소
        </Button>
        <Button
          disabled={isSaving}
          aria-busy={isSaving}
          onClick={() => void save()}
        >
          {isSaving ? "저장 중..." : saveError ? "다시 저장" : "저장"}
        </Button>
      </ModalFooter>
    </ModalSurface>
  );
}
