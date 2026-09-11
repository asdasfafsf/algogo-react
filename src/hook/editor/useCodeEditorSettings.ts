import {
  cancelEditorSettings,
  saveEditorSettings,
} from "@/application/editor/settings";
import { parseEditorTabSize } from "@/domain/editor/settingsForm";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import { useProblemContentSizeStore } from "@zustand/ProblemContentSizeStore";
import { useCallback, useState } from "react";

export const useCodeEditorSettings = (resolve: (value: boolean) => void) => {
  const initialProblemContentSize = useProblemContentSizeStore(
    (state) => state.size,
  );
  const setProblemContentSize = useProblemContentSizeStore(
    (state) => state.setSize,
  );
  const initialSettings = useCodeEditorStore((state) => state.settings);
  const setCodeEditorSettings = useCodeEditorStore(
    (state) => state.setSettings,
  );
  const updateCodeEditorSettings = useCodeEditorStore(
    (state) => state.updateSetting,
  );
  const [settings, setSettings] = useState(initialSettings);
  const [problemContentSize, setProblemContentSizeDraft] = useState(
    initialProblemContentSize,
  );
  const [saveToServer, setSaveToServer] = useState(true);

  const close = useCallback(() => {
    return cancelEditorSettings({
      close: () => resolve(false),
    });
  }, [resolve]);

  const save = useCallback(
    () =>
      saveEditorSettings(
        { settings, problemContentSize, saveToServer },
        {
          setProblemContentSize,
          setCodeEditorSettings,
          updateCodeEditorSettings,
          close,
        },
      ),
    [
      close,
      problemContentSize,
      saveToServer,
      setCodeEditorSettings,
      setProblemContentSize,
      settings,
      updateCodeEditorSettings,
    ],
  );

  return {
    settings,
    problemContentSize,
    saveToServer,
    close,
    save,
    selectProblemContentSize: setProblemContentSizeDraft,
    selectTheme: (theme: CodeEditorTheme) =>
      setSettings((current) => ({ ...current, theme })),
    selectFontSize: (fontSize: number) =>
      setSettings((current) => ({ ...current, fontSize })),
    changeTabSize: (value: string) =>
      setSettings((current) => ({
        ...current,
        tabSize: parseEditorTabSize(value),
      })),
    selectLineNumber: (lineNumber: CodeEditorLineNumber) =>
      setSettings((current) => ({ ...current, lineNumber })),
    selectDefaultLanguage: (defaultLanguage: Language) =>
      setSettings((current) => ({ ...current, defaultLanguage })),
    toggleSaveToServer: () => setSaveToServer((current) => !current),
  };
};
