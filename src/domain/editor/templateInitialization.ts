import { getDefaultTemplateContent } from "./templates";

export type TemplateInitializationDecision =
  | {
      type: "loaded";
      templates: ResponseTemplates;
      defaultTemplate: string | undefined;
    }
  | { type: "unauthenticated" }
  | { type: "invalid-response"; statusCode: number }
  | { type: "invalid-data"; statusCode: number }
  | { type: "request-failed" };

type TemplateResponse = {
  statusCode: number;
  data: unknown;
};

export const canInitializeEditor = ({
  hasStoredUser,
  accessToken,
  refreshToken,
}: {
  hasStoredUser: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}) => hasStoredUser || Boolean(accessToken) || Boolean(refreshToken);

const isString = (value: unknown): value is string => typeof value === "string";

const isDefaultTemplate = (
  value: unknown,
): value is ResponseDefaultTemplate => {
  if (!value || typeof value !== "object") return false;

  const template = value as Record<string, unknown>;
  return (
    isString(template.uuid) &&
    isString(template.name) &&
    isString(template.description) &&
    isString(template.language) &&
    isString(template.content)
  );
};

const isSummaryTemplate = (
  value: unknown,
): value is ResponseSummaryTemplate => {
  if (!value || typeof value !== "object") return false;

  const template = value as Record<string, unknown>;
  return (
    isString(template.uuid) &&
    isString(template.name) &&
    isString(template.language)
  );
};

export const isResponseTemplates = (
  value: unknown,
): value is ResponseTemplates => {
  if (!value || typeof value !== "object") return false;

  const templates = value as Record<string, unknown>;
  return (
    Array.isArray(templates.defaultList) &&
    Array.isArray(templates.summaryList) &&
    templates.defaultList.every(isDefaultTemplate) &&
    templates.summaryList.every(isSummaryTemplate)
  );
};

export const decideTemplateInitialization = (
  response: TemplateResponse,
  language: Language,
): TemplateInitializationDecision => {
  if (response.statusCode === 401) return { type: "unauthenticated" };
  if (response.statusCode !== 200) {
    return { type: "invalid-response", statusCode: response.statusCode };
  }
  if (!isResponseTemplates(response.data)) {
    return { type: "invalid-data", statusCode: response.statusCode };
  }

  return {
    type: "loaded",
    templates: response.data,
    defaultTemplate: getDefaultTemplateContent(
      response.data.defaultList,
      language,
    ),
  };
};

export const templateRequestFailed = (): TemplateInitializationDecision => ({
  type: "request-failed",
});
