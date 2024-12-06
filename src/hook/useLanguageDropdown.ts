import { useCallback, useState } from 'react';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';

export default function useLanguageDropdown() {
  const languageList: Language[] = ['C++', 'Node.js', 'Java', 'Python'];
  const languageMap: LanguageView = {
    'Node.js': 'Node.js',
    'C++': 'C++',
    Java: 'Java',
    Python: 'Python',
  };
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setCode = useCodeEditorStore((state) => state.setCode);
  const setLanguage = useCodeEditorStore((state) => state.setLanguage);
  const codeFromLanguage = useCodeEditorStore((state) => state.codeFromLanguage);

  const handleUpdate = useCallback((
    _e: React.MouseEvent,
    index: number,
  ) => {
    const selectedLanguage = languageMap[languageList[index]];
    setCode(`${codeFromLanguage[selectedLanguage]}`);
    setLanguage(selectedLanguage);
    setSelectedIndex(index);
    setOpen(false);
  }, [codeFromLanguage, setCode, setLanguage, setOpen]);

  const handler = useCallback(() => setOpen((open) => !open), [setOpen]);

  return {
    open,
    selectedIndex,
    languageList,
    handleUpdate,
    handler,
  };
}
