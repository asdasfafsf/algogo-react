export const EDITOR_CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;
export const EDITOR_CODE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

export const editorCodeStorageKey = (problemUuid: string, language: Language) =>
  `code-${problemUuid}-${language}`;

export const isEditorCleanupDue = (
  now: number,
  lastCleanup: number | null,
  interval = EDITOR_CLEANUP_INTERVAL_MS,
) => lastCleanup === null || now - lastCleanup > interval;

export const isStoredCodeStale = (
  now: number,
  updatedAt: number,
  expiry = EDITOR_CODE_EXPIRY_MS,
) => now - updatedAt > expiry;

export type LocalCodeCandidate = { code: string; updatedAt: number };

export const selectInitialCode = ({
  fallbackCode,
  savedCode,
  hasAnySavedCode,
  localCode,
  defaultTemplate,
}: {
  fallbackCode: string;
  savedCode?: { content: string; updatedAt: number };
  hasAnySavedCode: boolean;
  localCode?: LocalCodeCandidate;
  defaultTemplate?: string;
}) => {
  let code = savedCode?.content ?? fallbackCode;
  if (localCode && (!savedCode || localCode.updatedAt > savedCode.updatedAt))
    code = localCode.code;

  // 기존 동작: 서버 저장 코드가 없으면 로컬 코드보다 기본 템플릿을 우선한다.
  if (!hasAnySavedCode && defaultTemplate !== undefined) code = defaultTemplate;
  return code;
};
