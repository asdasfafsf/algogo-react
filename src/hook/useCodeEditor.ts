/* eslint-disable no-bitwise */
import {
  useCallback, useRef, useState, useEffect,
} from 'react';
import {
  editor, IKeyboardEvent, KeyCode, KeyMod,
} from 'monaco-editor';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';
import useExecute from './useExecute';

export default function useCodeEditor() {
  const editorRef = useRef<unknown>(null);
  const code = useCodeEditorStore((state) => state.code);
  const setCode = useCodeEditorStore((state) => state.setCode);
  const language = useCodeEditorStore((state) => state.language);
  const updateCodeFromLanguage = useCodeEditorStore((state) => state.updateCodeFromLanguage);
  const settings = useCodeEditorStore((state) => state.settings);
  const updateCode = useCodeEditorStore((state) => state.updateCode);
  const loadCode = useCodeEditorStore((state) => state.loadCode);
  const [, setFocus] = useState(false);
  const { handleExecute } = useExecute();
  const executeRef = useRef(() => handleExecute());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    executeRef.current = () => handleExecute();
  }, [handleExecute]);

  useEffect(() => {
    const handleFetch = async () => {
      await loadCode();
    };

    handleFetch();
  }, []);

  const handleEditorChange = useCallback((
    value: string | undefined,
  ) => {
    if (!value) {
      return;
    }
    setCode(value);
    updateCodeFromLanguage(language, value);
    setIsSaving(false);
  }, [setCode, setIsSaving]);

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

  const handleEditorMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.onDidBlurEditorText(handleBlur);
    editor.onDidFocusEditorText(handleFocus);
    editor.onKeyDown(handleEditorKeydown);
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, () => executeRef.current());
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => saveRef.current());
  }, [executeRef, saveRef]);

  return {
    code,
    settings,
    language,
    handleEditorMount,
    handleEditorChange,
  };
}
