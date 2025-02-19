/* eslint-disable no-bitwise */
import {
  useCallback, useRef, useState, useEffect,
} from 'react';
import {
  editor, IKeyboardEvent, KeyCode, KeyMod,
} from 'monaco-editor';
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
  const loadCode = useCodeEditorStore((state) => state.loadCode);
  const loadSetting = useCodeEditorStore((state) => state.loadSetting);
  const loadTemplates = useCodeEditorStore((state) => state.loadTemplates);
  const setCodeFromTemplate = useCodeEditorStore((state) => state.setCodeFromTemplate);
  const [, setFocus] = useState(false);
  const { handleExecute } = useExecute();
  const executeRef = useRef(() => handleExecute());
  const [isSaving, setIsSaving] = useState(false);

  const { toast } = useToastModal();

  useEffect(() => {
    executeRef.current = () => handleExecute();
  }, [handleExecute]);

  useEffect(() => {
    const handleFetch = async () => {
      await loadSetting();
      await loadCode();
      await loadTemplates();
      await setCodeFromTemplate();
    };

    handleFetch();
  }, []);

  const handleEditorChange = useCallback((
    value: string | undefined,
  ) => {
    if (!value) {
      value = '';
    }
    setCode(value);
    setIsSaving(false);
  }, [setCode, setIsSaving, language]);

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

  const handleEditorMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    const blurListener = editor.onDidBlurEditorText(handleBlur);
    const focusListener = editor.onDidFocusEditorText(handleFocus);
    const keydownListener = editor.onKeyDown(handleEditorKeydown);
    editor.addCommand(
      KeyMod.CtrlCmd | KeyCode.Enter,
      () => executeRef.current?.(),
    );
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => saveRef.current?.());

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
