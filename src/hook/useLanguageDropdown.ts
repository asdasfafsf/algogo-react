import { useState } from 'react';
import { useCodeEditorStore } from '../zustand/CodeEditorStore';

export default function useLanguageDropdown() {
  const languageList: Language[] = ['C++', 'Node.js', 'Java 11', 'Python 3'];
  const languageMap: LanguageView = {
    'Node.js': 'javascript',
    'C++': 'cpp',
    'Java 11': 'java',
    'Python 3': 'python',
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setCode, setLanguage, codeFromLanguage } = useCodeEditorStore((state) => ({
    setLanguage: state.setLanguage,
    setCode: state.setCode,
    codeFromLanguage: state.codeFromLanguage,
  }));

  const handleUpdate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    const language = languageMap[languageList[selectedIndex]];
    setLanguage(language);
    setCode(codeFromLanguage[language]);
  };

  return [selectedIndex, languageList, handleUpdate] as const;
}
