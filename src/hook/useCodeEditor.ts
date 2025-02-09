/* eslint-disable no-bitwise */
import { useCallback, useRef, useState } from 'react';
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

  const [, setFocus] = useState(false);
  const { handleExecute } = useExecute();
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
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.Enter, () => {
      handleExecute();
    });
  }, [editorRef, handleExecute]);

  return {
    code,
    settings,
    language,
    handleEditorMount,
    handleEditorChange,
  };
}
