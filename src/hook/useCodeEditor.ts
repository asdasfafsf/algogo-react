/* eslint-disable no-bitwise */
import {
  useCallback, useRef, useState, useEffect,
} from 'react';
import { editor, KeyCode, KeyMod } from 'monaco-editor';
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
    loadCode();
  }, []);

  const handleEditorChange = useCallback((
    value: string | undefined,
  ) => {
    if (!value) {
      return;
    }
    setCode(value);
    updateCodeFromLanguage(language, value);
  }, [setCode]);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleEditorMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.onDidBlurEditorText(handleBlur);
    editor.onDidFocusEditorText(handleFocus);
    editor.onKeyDown((e) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === KeyCode.KeyS) {
        e.preventDefault();
        return false;
      }
      return true;
    });

    editor.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, () => {
      executeRef.current();
    });

    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, async () => {
      if (isSaving) return;

      try {
        setIsSaving(true);
        await updateCode();
      } finally {
        setIsSaving(false);
      }
    });
  }, [editorRef, isSaving, updateCode]);

  return {
    code,
    settings,
    language,
    handleEditorMount,
    handleEditorChange,
  };
}
