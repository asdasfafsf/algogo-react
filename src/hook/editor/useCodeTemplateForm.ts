import { useCallback, useRef, useState } from "react";
import { createTemplate, deleteTemplate, updateTemplate } from "@api/code";
import useAlertModal from "@hook/useAlertModal";
import useConfirmModal from "@hook/useConfirmModal";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import {
  buildCreateTemplateRequest,
  buildUpdateTemplateRequest,
  decideTemplateMutation,
  runExclusiveTemplateMutation,
  templateFormErrorMessage,
  validateTemplateForm,
} from "@/domain/editor/templateForm";

export type CodeTemplateFormOptions = {
  language: Language;
  uuid: string;
  isEdit: boolean;
  name: string;
  description: string;
  content: string;
  resolve: (value: boolean) => void;
};

export default function useCodeTemplateForm(options: CodeTemplateFormOptions) {
  const { language, uuid, isEdit, name, description, content, resolve } =
    options;
  const settings = useCodeEditorStore((state) => state.settings);
  const loadTemplates = useCodeEditorStore((state) => state.loadTemplates);
  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();
  const [templateName, setTemplateName] = useState(name);
  const [templateDescription, setTemplateDescription] = useState(description);
  const [templateLanguage, setTemplateLanguage] = useState<Language>(language);
  const [templateContent, setTemplateContent] = useState(content);
  const [isDefault, setIsDefault] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "submit" | "delete" | null
  >(null);
  const mutationLock = useRef(false);

  const closeModal = useCallback(() => {
    resolve(false);
  }, [resolve]);

  const handleClose = useCallback(() => {
    if (mutationLock.current) return;
    closeModal();
  }, [closeModal]);

  const handleDelete = useCallback(async () => {
    await runExclusiveTemplateMutation(mutationLock, async () => {
      setPendingAction("delete");
      try {
        if (!(await confirm("정말 삭제하시겠습니까?"))) return;

        const response = await deleteTemplate(uuid);
        const decision = decideTemplateMutation("delete", response.statusCode);
        if (decision.reload) await loadTemplates();
        await alert(
          decision.message === "deleted"
            ? "코드 템플릿이 삭제되었습니다."
            : response.errorMessage || "코드 템플릿을 삭제하지 못했습니다.",
        );
        if (decision.close) closeModal();
      } catch {
        await alert("코드 템플릿을 삭제하지 못했습니다.");
      } finally {
        setPendingAction(null);
      }
    });
  }, [alert, closeModal, confirm, loadTemplates, uuid]);

  const handleSubmit = useCallback(async () => {
    await runExclusiveTemplateMutation(mutationLock, async () => {
      setPendingAction("submit");
      try {
        const form = {
          name: templateName,
          description: templateDescription,
          language: templateLanguage,
          content: templateContent,
          isDefault,
        };
        const validationError = validateTemplateForm(form);
        if (validationError) {
          await alert(templateFormErrorMessage[validationError]);
          return;
        }

        const response = isEdit
          ? await updateTemplate(buildUpdateTemplateRequest(form, uuid))
          : await createTemplate(buildCreateTemplateRequest(form));
        const decision = decideTemplateMutation(
          isEdit ? "update" : "create",
          response.statusCode,
        );
        await alert(
          decision.message === "updated"
            ? "코드 템플릿이 수정되었습니다."
            : decision.message === "created"
              ? "코드 템플릿이 생성되었습니다."
              : response.errorMessage ||
                `코드 템플릿을 ${isEdit ? "수정" : "생성"}하지 못했습니다.`,
        );
        if (decision.reload) await loadTemplates();
        if (decision.close) closeModal();
      } catch {
        await alert(
          `코드 템플릿을 ${isEdit ? "수정" : "생성"}하지 못했습니다.`,
        );
      } finally {
        setPendingAction(null);
      }
    });
  }, [
    alert,
    closeModal,
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
    isSubmitting: pendingAction === "submit",
    isDeleting: pendingAction === "delete",
    isPending: pendingAction !== null,
    handleClose,
    handleDelete,
    handleSubmit,
  };
}
