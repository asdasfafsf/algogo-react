import { useCallback, useRef } from 'react';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';

export default function useCodeEditor() {
  const editorRef = useRef<unknown>(null);
  const codeEditorHeight = useCodeEditorHeightStore((state) => state.codeEditorHeight);
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
    codeEditorHeight,
    code,
    language,
    handleEditorMount,
    handleEditorChange,
  ] as const;
}
