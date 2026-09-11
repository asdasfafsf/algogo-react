import {
  codeSaveRequestFailed,
  getCodeSaveNotification,
} from "@/domain/editor/codeSave";
import type {
  CodeSaveNotification,
  CodeSaveResult,
} from "@/domain/editor/codeSave";

type SaveLock = { current: boolean };

type SaveEditorCodePorts = {
  save: (problemUuid: string) => Promise<CodeSaveResult>;
  notify: (notification: CodeSaveNotification) => void;
};

export const saveEditorCode = async (
  lock: SaveLock,
  problemUuid: string,
  ports: SaveEditorCodePorts,
): Promise<CodeSaveResult | undefined> => {
  if (lock.current) return undefined;

  lock.current = true;
  try {
    let result: CodeSaveResult;
    try {
      result = await ports.save(problemUuid);
    } catch {
      result = codeSaveRequestFailed();
    }
    ports.notify(getCodeSaveNotification(result));
    return result;
  } finally {
    lock.current = false;
  }
};
