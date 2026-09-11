export type TemplateForm = {
  name: string;
  description: string;
  language: Language;
  content: string;
  isDefault: boolean;
};

export type TemplateFormError = "name-required" | "content-required";

export const templateFormErrorMessage: Record<TemplateFormError, string> = {
  "name-required": "템플릿 이름을 입력해주세요.",
  "content-required": "템플릿 코드를 입력해주세요.",
};

export const templateLoadFailureMessage =
  "코드 템플릿을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";

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

export const templateMutationFailureMessage = (
  operation: "create" | "update" | "delete",
) => {
  const action =
    operation === "create" ? "생성" : operation === "update" ? "수정" : "삭제";
  return `코드 템플릿을 ${action}하지 못했습니다. 잠시 후 다시 시도해 주세요.`;
};

export type TemplateMutationLock = {
  current: boolean;
};

export const runExclusiveTemplateMutation = async <T>(
  lock: TemplateMutationLock,
  mutation: () => Promise<T>,
): Promise<T | undefined> => {
  if (lock.current) return undefined;

  lock.current = true;
  try {
    return await mutation();
  } finally {
    lock.current = false;
  }
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
      : { message: "response-error", reload: false, close: false };
  }
  return statusCode === 200
    ? { message: "updated", reload: true, close: true }
    : { message: "response-error", reload: false, close: false };
};
