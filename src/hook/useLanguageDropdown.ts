import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { languageList, languageMap } from '@constant/Language';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';

export default function useLanguageDropdown() {
  const language = useCodeEditorStore((state) => state.language);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(languageList.indexOf(language));
  const setLanguage = useCodeEditorStore((state) => state.setLanguage);

  const handleUpdate = useCallback((
    _e: React.MouseEvent,
    index: number,
  ) => {
    const selectedLanguage = languageMap[languageList[index]];
    setLanguage(selectedLanguage);
    setOpen(false);
  }, [setLanguage, setOpen]);

  useEffect(() => {
    setSelectedIndex(languageList.indexOf(language));
  }, [language]);

  const handler = useCallback(() => setOpen((open) => !open), [setOpen]);

  return useMemo(() => ({
    open,
    selectedIndex,
    languageList,
    handleUpdate,
    handler,
  }), [open, selectedIndex, languageList, handleUpdate, handler]);
}
