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

  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(async () => {
    setFocus(true);
    modal.push('PROBLEM_SEARCH_INPUT', null, {});
  }, [setFocus]);

  const handleBlur = useCallback(async () => {
    setFocus(false);
    modal.remove('PROBLEM_SEARCH_INPUT');
  }, [setFocus]);

  const handleKeyUp = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    } else if (e.key === 'Enter') {
      setPagingInfo((prev) => ({ ...prev, pageNo: 1 }));
      inputRef.current?.blur();
    }
  }, [modal, focus, setPagingInfo]);

  useHotkeys(
    'mod+k',
    (e) => {
      e.preventDefault();
      if (!modal?.top()?.Component && !focus) {
        inputRef.current?.focus();
      }
    },
    [modal, focus],
  );

  return {
    inputRef,
    handleFocus,
    handleBlur,
    handleKeyUp,
    handleChangeProblemTitle,
    handleClickSearch,
  };
}
