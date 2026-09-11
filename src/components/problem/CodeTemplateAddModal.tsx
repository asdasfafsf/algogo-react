import { NativeSelect } from "@/components/ui/native-select";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ModalBody,
  ModalFooter,
  ModalSurface,
} from "@/components/ui/modal-surface";
import { languageList, monocoLanguageMap } from "@constant/Language";
import Editor from "@monaco-editor/react";
import useCodeTemplateForm from "@hook/editor/useCodeTemplateForm";
import type { ModalComponentProps } from "@plugins/modal/ModalController";

export interface CodeTemplateAddModalProps extends ModalComponentProps<boolean> {
  title?: string;
  language?: Language;
  uuid?: string;
  isEdit?: boolean;
  description?: string;
  content?: string;
  name?: string;
}

export default function CodeTemplateAddModal({
  title = "코드 템플릿 추가",
  language = "Python",
  uuid = "",
  isEdit = false,
  name = "",
  description = "",
  content = "",
  resolve,
}: CodeTemplateAddModalProps) {
  const {
    settings,
    templateName,
    setTemplateName,
    templateDescription,
    setTemplateDescription,
    templateLanguage,
    setTemplateLanguage,
    templateContent,
    setTemplateContent,
    isDefault,
    setIsDefault,
    isSubmitting,
    isDeleting,
    isPending,
    handleClose,
    handleDelete,
    handleSubmit,
  } = useCodeTemplateForm({
    language,
    uuid,
    isEdit,
    name,
    description,
    content,
    resolve,
  });

  return (
    <ModalSurface
      open={true}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      size="lg"
      title={title}
      description="코드 템플릿의 이름, 언어와 내용을 편집합니다."
      contentProps={{ showCloseButton: !isPending }}
    >
      <ModalBody>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="templateName"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              템플릿 이름
            </label>
            <ShadcnInput
              id="templateName"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="템플릿 이름을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="templateDescription"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              설명
            </label>
            <ShadcnInput
              id="templateDescription"
              type="text"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="템플릿 설명을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="templateLanguage"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              언어
            </label>
            <NativeSelect
              id="templateLanguage"
              value={templateLanguage}
              onChange={(e) => setTemplateLanguage(e.target.value as Language)}
            >
              {languageList.map((elem) => (
                <option key={elem} value={elem}>
                  {elem}
                </option>
              ))}
            </NativeSelect>
          </div>

          <div>
            <label
              htmlFor="templateContent"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              템플릿 코드
            </label>
            <div className="relative h-56 overflow-hidden rounded-lg border border-input sm:h-[300px]">
              <Editor
                height="100%"
                language={monocoLanguageMap[templateLanguage]}
                className="h-full"
                theme={settings.theme}
                value={templateContent}
                onChange={(value) => setTemplateContent(value ?? "")}
                options={{
                  insertSpaces: true,
                  lineNumbers: settings.lineNumber,
                  contextmenu: false,
                  fontSize: settings.fontSize,
                  tabSize: settings.tabSize,
                  minimap: { enabled: false },
                  scrollbar: { vertical: "auto", horizontal: "auto" },
                  codeLens: false,
                  autoIndent: "advanced",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isDefault"
              checked={isDefault}
              onCheckedChange={(checked) => setIsDefault(checked === true)}
            />
            <label
              htmlFor="isDefault"
              className="cursor-pointer text-sm font-medium text-foreground"
            >
              기본 템플릿으로 설정
            </label>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" onClick={handleClose} disabled={isPending}>
          취소
        </Button>
        {isEdit && (
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={isPending}>
          {isSubmitting
            ? isEdit
              ? "수정 중..."
              : "추가 중..."
            : isEdit
              ? "수정"
              : "추가"}
        </Button>
      </ModalFooter>
    </ModalSurface>
  );
}
