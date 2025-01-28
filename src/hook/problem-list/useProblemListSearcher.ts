import { useProblemTableFilterStore } from '@zustand/ProblemTableFilterStore';
import { useCallback, useRef, useState } from 'react';
import { useProblemListStore } from '@zustand/ProblemListStore';
import useModal from '@plugins/modal/useModal';
import { useHotkeys } from 'react-hotkeys-hook';


export default function useProblemListSearcher() {

  const setProblemTitle = useProblemTableFilterStore((state) => state.setProblemTitle);

  const handleChangeProblemTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProblemTitle(e.target.value);
  }, [setProblemTitle]);

  const setPagingInfo = useProblemListStore((state) => state.setPagingInfo);

  const handleClickSearch = useCallback(() => {
    setPagingInfo((prev) => ({ ...prev, pageNo: 1 }));
  }, [setPagingInfo]);

  const modal = useModal();

  const inputRef = useRef<HTMLInputElement>(null);


  useHotkeys(
    'mod+k',
    (event) => {
      if (!modal?.top()?.Component) {
        inputRef.current?.focus();
      }
    },
    [modal]
  );

  return {
    inputRef,
    handleChangeProblemTitle,
    handleClickSearch,
  };
}
