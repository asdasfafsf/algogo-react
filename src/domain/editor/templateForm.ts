export type TemplateForm = {
  name: string;
  description: string;
  language: Language;
  content: string;
  isDefault: boolean;
};

export type TemplateFormError = "name-required" | "content-required";

export const validateTemplateForm = (
  form: TemplateForm,
): TemplateFormError | null => {
  if (!form.name.trim()) return "name-required";
  if (!form.content.trim()) return "content-required";
  return null;
};

export const buildCreateTemplateRequest = (
  form: TemplateForm,
): RequestCreateTemplate => ({ ...form });

export const buildUpdateTemplateRequest = (
  form: TemplateForm,
  uuid: string,
): RequestUpdateTemplate => ({ ...form, uuid });

export type TemplateMutationDecision = {
  message: "response-error" | "created" | "updated" | "deleted";
  reload: boolean;
  close: boolean;
};

export const decideTemplateMutation = (
  operation: "create" | "update" | "delete",
  statusCode: number,
): TemplateMutationDecision => {
  if (operation === "delete") {
    return statusCode === 200
      ? { message: "deleted", reload: true, close: true }
      : { message: "response-error", reload: false, close: false };
  }
  if (operation === "create") {
    return statusCode === 200
      ? { message: "created", reload: true, close: true }
      : { message: "response-error", reload: false, close: true };
  }
  // 기존 동작: 수정 성공 응답은 오류 메시지로 처리하고, 그 외 응답은 성공으로 처리한다.
  return statusCode === 200
    ? { message: "response-error", reload: false, close: true }
    : { message: "updated", reload: true, close: true };
};
