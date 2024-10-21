import { useCallback } from 'react';
import useCodeResultPanelStore from '../zustand/CodeResultPanelStore';

export default function useCodeResultPanel() {
  const { selectedIndex, setSelectedIndex } = useCodeResultPanelStore((state) => state);
  const handleClickTab = useCallback(async (_: React.MouseEvent<Element>, index: number) => {
    setSelectedIndex(index);
  }, [selectedIndex]);

  return {
    selectedIndex,
    handleClickTab,
  };
}
