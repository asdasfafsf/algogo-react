import { useCallback, useEffect, useState } from "react";
import { createTemplate, deleteTemplate, updateTemplate } from "@api/code";
import useAlertModal from "@hook/useAlertModal";
import useConfirmModal from "@hook/useConfirmModal";
import useModal from "@plugins/modal/useModal";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import {
  buildCreateTemplateRequest,
  buildUpdateTemplateRequest,
  decideTemplateMutation,
  validateTemplateForm,
} from "@/domain/editor/templateForm";

export type CodeTemplateFormOptions = {
  language: Language;
  uuid: string;
  isEdit: boolean;
  modalKey: string;
  name: string;
  description: string;
  content: string;
};

export default function useCodeTemplateForm(options: CodeTemplateFormOptions) {
  const { language, uuid, isEdit, modalKey, name, description, content } =
    options;
  const settings = useCodeEditorStore((state) => state.settings);
  const loadTemplates = useCodeEditorStore((state) => state.loadTemplates);
  const modal = useModal();
  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();
  const [isVisible, setIsVisible] = useState(false);
  const [templateName, setTemplateName] = useState(name);
  const [templateDescription, setTemplateDescription] = useState(description);
  const [templateLanguage, setTemplateLanguage] = useState<Language>(language);
  const [templateContent, setTemplateContent] = useState(content);
  const [isDefault, setIsDefault] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    modal.remove(modalKey);
  }, [modal, modalKey]);

  useEffect(() => {
    setIsVisible(true);
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modal?.top()?.key === modalKey)
        handleClose();
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [handleClose, modal, modalKey]);

  const handleDelete = useCallback(async () => {
    if (!(await confirm("정말 삭제하시겠습니까?"))) return;
    const response = await deleteTemplate(uuid);
    const decision = decideTemplateMutation("delete", response.statusCode);
    if (decision.reload) await loadTemplates();
    await alert(
      decision.message === "deleted"
        ? "코드 템플릿이 삭제되었습니다."
        : response.errorMessage,
    );
    if (decision.close) handleClose();
  }, [alert, confirm, handleClose, loadTemplates, uuid]);

  const handleSubmit = useCallback(async () => {
    const form = {
      name: templateName,
      description: templateDescription,
      language: templateLanguage,
      content: templateContent,
      isDefault,
    };
    if (validateTemplateForm(form)) return;

    if (isEdit) {
      const response = await updateTemplate(
        buildUpdateTemplateRequest(form, uuid),
      );
      const decision = decideTemplateMutation("update", response.statusCode);
      await alert(
        decision.message === "updated"
          ? "코드 템플릿이 수정되었습니다."
          : response.errorMessage,
      );
      if (decision.reload) await loadTemplates();
      if (decision.close) handleClose();
      return;
    } else {
      const response = await createTemplate(buildCreateTemplateRequest(form));
      const decision = decideTemplateMutation("create", response.statusCode);
      await alert(
        decision.message === "created"
          ? "코드 템플릿이 생성되었습니다."
          : response.errorMessage,
      );
      if (decision.reload) await loadTemplates();
      if (decision.close) handleClose();
      return;
    }
  }, [
    alert,
    handleClose,
    isDefault,
    isEdit,
    loadTemplates,
    templateContent,
    templateDescription,
    templateLanguage,
    templateName,
    uuid,
  ]);

  return {
    settings,
    isVisible,
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
    handleClose,
    handleDelete,
    handleSubmit,
  };
}
