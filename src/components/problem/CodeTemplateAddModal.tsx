import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input as ShadcnInput } from "@/components/ui/input";

import { Button } from "@components/Button/index";
import { languageList, monocoLanguageMap } from "@constant/Language";
import Editor from "@monaco-editor/react";
import { Checkbox } from "../Checkbox";
import useCodeTemplateForm from "@hook/editor/useCodeTemplateForm";

export interface CodeTemplateAddModalProps {
  title?: string;
  language?: Language;
  uuid?: string;
  isEdit?: boolean;
  modalKey: string;
  description?: string;
  content?: string;
  name?: string;
}

export default function CodeTemplateAddModal({
  title = "코드 템플릿 추가",
  language = "Python",
  uuid = "",
  isEdit = false,
  modalKey,
  name = "",
  description = "",
  content = "",
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
    modalKey,
    name,
    description,
    content,
  });

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto p-0">
        <DialogHeader className="border-b border-border px-8 py-6 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            코드 템플릿의 이름, 언어와 내용을 편집합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full animate-in rounded-xl border border-border bg-popover text-popover-foreground shadow-xl fade-in duration-200">
          <div className="px-8 py-6 space-y-5">
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] transition-all duration-200"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] transition-all duration-200"
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
                onChange={(e) =>
                  setTemplateLanguage(e.target.value as Language)
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-[15px] text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
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
              <div className="relative h-[300px] border border-gray-200 rounded-xl overflow-hidden">
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
                onCheckedChange={setIsDefault}
              />
              <label
                htmlFor="isDefault"
                className="cursor-pointer text-sm font-medium text-foreground"
              >
                기본 템플릿으로 설정
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 px-4 pb-4 mx-4">
            <Button onClick={handleClose} color="gray" disabled={isPending}>
              취소
            </Button>
            {isEdit && (
              <Button onClick={handleDelete} color="red" disabled={isPending}>
                {isDeleting ? "삭제 중..." : "삭제"}
              </Button>
            )}
            <Button onClick={handleSubmit} color="blue" disabled={isPending}>
              {isSubmitting
                ? isEdit
                  ? "수정 중..."
                  : "추가 중..."
                : isEdit
                  ? "수정"
                  : "추가"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
