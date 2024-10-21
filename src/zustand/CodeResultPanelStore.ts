import { create } from 'zustand';

type CodeResultPanel = {
  selectedIndex: number;
  setSelectedIndex: (selectedIndex: number) => void;
};

export const useCodeResultPanelStore = create<CodeResultPanel>((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (selectedIndex: number) => set(() => ({ selectedIndex })),
}));

export default useCodeResultPanelStore;
