import { useCallback, useRef, useState, useEffect } from "react";
import { editor, IKeyboardEvent, KeyCode, KeyMod } from "monaco-editor";
import useProblemStore from "@zustand/ProblemStore";
import useMeStore from "@zustand/MeStore";
import { useCodeEditorStore } from "../zustand/CodeEditorStore";
import useExecute from "./useExecute";
import useToastModal from "./modal/useToastModal";
import { editorCodeStorageKey } from "@/domain/editor/persistence";
import { canInitializeEditor } from "@/domain/editor/templateInitialization";

export default function useCodeEditor() {
  const editorRef = useRef<unknown>(null);
  const initializationRequestedRef = useRef(false);
  const code = useCodeEditorStore((state) => state.code);
  const setCode = useCodeEditorStore((state) => state.setCode);
  const language = useCodeEditorStore((state) => state.language);
  const settings = useCodeEditorStore((state) => state.settings);
  const updateCode = useCodeEditorStore((state) => state.updateCode);
  const [, setFocus] = useState(false);
  const { handleExecute } = useExecute();
  const executeRef = useRef(() => handleExecute());
  const [isSaving, setIsSaving] = useState(false);
  const problem = useProblemStore((state) => state.problem);
  const me = useMeStore((state) => state.me);

  const initialize = useCodeEditorStore((state) => state.initialize);

  const { toast } = useToastModal();

  useEffect(() => {
    executeRef.current = () => handleExecute();
  }, [handleExecute]);

  const hasStoredSession = canInitializeEditor({
    hasStoredUser: me !== null,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  });

  const handleFetch = useCallback(async () => {
    if (!hasStoredSession || initializationRequestedRef.current) return;

    initializationRequestedRef.current = true;
    const result = await initialize();
    if (result.type === "loaded") return;

    await toast(
      result.type === "unauthenticated"
        ? "로그인 정보를 확인할 수 없습니다. 다시 로그인해 주세요."
        : "편집기를 준비하지 못했습니다. 페이지를 새로고침해 다시 시도해 주세요.",
      5000,
      "fail",
    );
  }, [hasStoredSession, initialize, toast]);

  useEffect(() => {
    if (!hasStoredSession) {
      initializationRequestedRef.current = false;
      return;
    }

    void handleFetch();
  }, [handleFetch, hasStoredSession]);

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (!value) {
        value = "";
      }
      setCode(value);
      setIsSaving(false);

      if (problem) {
        const { uuid } = problem;
        localStorage.setItem(
          editorCodeStorageKey(uuid, language),
          JSON.stringify({
            code: value,
            language,
            updatedAt: new Date().toISOString(),
          }),
        );
      }
    },
    [setCode, setIsSaving, language, problem],
  );

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleSave = useCallback(async () => {
    if (isSaving) {
      return;
    }
    setIsSaving(true);
    await updateCode();
    toast("코드가 저장되었습니다.", 3000, "success");
  }, [isSaving]);
  const saveRef = useRef(handleSave);

  useEffect(() => {
    saveRef.current = handleSave;
  }, [isSaving]);

  const handleEditorKeydown = useCallback((e: IKeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === KeyCode.KeyS) {
      e.preventDefault();
      if (e.browserEvent.repeat) {
        return false;
      }
    }
    return true;
  }, []);

  const handleEditorMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      editorRef.current = editor;

      const blurListener = editor.onDidBlurEditorText(handleBlur);
      const focusListener = editor.onDidFocusEditorText(handleFocus);
      const keydownListener = editor.onKeyDown(handleEditorKeydown);
      editor.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, () =>
        executeRef.current?.(),
      );
      editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () =>
        saveRef.current?.(),
      );
      void handleFetch();

      return () => {
        blurListener.dispose();
        focusListener.dispose();
        keydownListener.dispose();
        editor.dispose();
      };
    },
    [handleBlur, handleEditorKeydown, handleFetch, handleFocus],
  );

  return {
    code,
    settings,
    language,
    handleEditorMount,
    handleEditorChange,
  };
}
