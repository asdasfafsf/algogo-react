import { createRef } from 'react';
import { create } from 'zustand';

type CodeResultPanel = {
  selectedIndex: number;
  setSelectedIndex: (selectedIndex: number) => void;
  inputTextAreaRef: React.RefObject<HTMLTextAreaElement | null>,
  outputTextAreaRef: React.RefObject<HTMLTextAreaElement | null>
};

export const useCodeResultPanelStore = create<CodeResultPanel>((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (selectedIndex: number) => set(() => ({ selectedIndex })),
  inputTextAreaRef: createRef<HTMLTextAreaElement>(),
  outputTextAreaRef: createRef<HTMLTextAreaElement>(),
}));

export default useCodeResultPanelStore;
