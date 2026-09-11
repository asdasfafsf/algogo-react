export type EditorSettingsSaveResult =
  | { type: "success" }
  | { type: "unauthenticated" }
  | { type: "failure"; statusCode: number }
  | { type: "request-failed" };

export type EditorSettingsSaveLock = {
  current: boolean;
};

export const editorSettingsSaveSucceeded = (): EditorSettingsSaveResult => ({
  type: "success",
});

export const classifyEditorSettingsSaveResponse = (response: {
  statusCode: number;
}): EditorSettingsSaveResult => {
  if (response.statusCode === 200) return editorSettingsSaveSucceeded();
  if (response.statusCode === 401) return { type: "unauthenticated" };
  return { type: "failure", statusCode: response.statusCode };
};

export const editorSettingsSaveRequestFailed =
  (): EditorSettingsSaveResult => ({ type: "request-failed" });

export const getEditorSettingsSaveFailureMessage = (
  result: Exclude<EditorSettingsSaveResult, { type: "success" }>,
): string => {
  if (result.type === "unauthenticated") {
    return "로그인이 만료되었습니다. 다시 로그인한 뒤 저장해 주세요.";
  }
  if (result.type === "request-failed") {
    return "설정 저장 중 연결에 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "설정을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.";
};

export const runExclusiveEditorSettingsSave = async <T>(
  lock: EditorSettingsSaveLock,
  save: () => Promise<T>,
): Promise<T | undefined> => {
  if (lock.current) return undefined;

  lock.current = true;
  try {
    return await save();
  } finally {
    lock.current = false;
  }
};
