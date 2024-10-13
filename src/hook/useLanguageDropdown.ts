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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    setCode, setLanguage, codeFromLanguage,
  } = useCodeEditorStore((state) => ({
    setLanguage: state.setLanguage,
    setCode: state.setCode,
    codeFromLanguage: state.codeFromLanguage,
  }));

  const handleUpdate = useCallback((
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    const selectedLanguage = languageMap[languageList[index]];
    setCode(`${codeFromLanguage[selectedLanguage]}`);
    setLanguage(selectedLanguage);
    setSelectedIndex(index);
  }, [selectedIndex, codeFromLanguage, setCode, setLanguage]);

  return [selectedIndex, languageList, handleUpdate] as const;
}
