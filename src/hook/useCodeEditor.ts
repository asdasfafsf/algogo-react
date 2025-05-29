/* eslint-disable no-bitwise */
import {
  useCallback, useRef, useState, useEffect,
} from 'react';
import {
  editor, IKeyboardEvent, KeyCode, KeyMod,
} from 'monaco-editor';
import useProblemStore from '@zustand/ProblemStore';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';
import useExecute from './useExecute';
import useToastModal from './modal/useToastModal';

export default function useCodeEditor() {
  const editorRef = useRef<unknown>(null);
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

  const initialize = useCodeEditorStore((state) => state.initialize);

  const { toast } = useToastModal();

  useEffect(() => {
    executeRef.current = () => handleExecute();
  }, [handleExecute]);

  const handleFetch = useCallback(async () => {
    await initialize();
  }, []);

  const handleEditorChange = useCallback((
    value: string | undefined,
  ) => {
    if (!value) {
      value = '';
    }
    setCode(value);
    setIsSaving(false);

    if (problem) {
      const { uuid } = problem;
      localStorage.setItem(`code-${uuid}-${language}`, JSON.stringify({
        code: value,
        language,
        updatedAt: new Date().toISOString(),
      }));
    }
  }, [setCode, setIsSaving, language, problem]);

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
    toast('코드가 저장되었습니다.', 3000, 'success');
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

  const handleEditorMount = useCallback(async (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    const blurListener = editor.onDidBlurEditorText(handleBlur);
    const focusListener = editor.onDidFocusEditorText(handleFocus);
    const keydownListener = editor.onKeyDown(handleEditorKeydown);
    editor.addCommand(
      KeyMod.CtrlCmd | KeyCode.Enter,
      () => executeRef.current?.(),
    );
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => saveRef.current?.());
    await handleFetch();

    return () => {
      blurListener.dispose();
      focusListener.dispose();
      keydownListener.dispose();
      editor.dispose();
    };
  }, [executeRef, saveRef]);

  return {
    code,
    settings,
    language,
    handleEditorMount,
    handleEditorChange,
  };
}
