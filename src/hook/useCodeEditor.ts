import { useCallback, useRef } from 'react';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';

export default function useCodeEditor() {
  const editorRef = useRef<unknown>(null);
  const {
    code, setCode, language, updateCodeFromLanguage,
  } = useCodeEditorStore((state) => state);

  const handleEditorChange = useCallback((
    value: string | undefined,
  ) => {
    if (!value) {
      return;
    }
    setCode(value);
    updateCodeFromLanguage(language, value);
  }, [code]);

  const handleEditorMount = useCallback((editor: unknown) => {
    editorRef.current = editor;
  }, [editorRef]);

  return [
    code,
    language,
    handleEditorMount,
    handleEditorChange,
  ] as const;
}
