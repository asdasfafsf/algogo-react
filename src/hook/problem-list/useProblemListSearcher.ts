import { useProblemTableFilterStore } from "@zustand/ProblemTableFilterStore";
import { useCallback, useRef, useState } from "react";
import { useProblemListStore } from "@zustand/ProblemListStore";
import { useHotkeys } from "react-hotkeys-hook";
import { resetProblemPage } from "@/domain/problems";

export default function useProblemListSearcher() {
  const setProblemTitle = useProblemTableFilterStore(
    (state) => state.setProblemTitle,
  );

  const handleChangeProblemTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProblemTitle(e.target.value);
    },
    [setProblemTitle],
  );

  const setPagingInfo = useProblemListStore((state) => state.setPagingInfo);

  const handleClickSearch = useCallback(() => {
    setPagingInfo(resetProblemPage);
  }, [setPagingInfo]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleKeyUp = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        inputRef.current?.blur();
      } else if (e.key === "Enter") {
        setPagingInfo(resetProblemPage);
        inputRef.current?.blur();
      }
    },
    [setPagingInfo],
  );

  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      if (
        !document.querySelector('[role="dialog"][data-state="open"]') &&
        !focus
      ) {
        inputRef.current?.focus();
      }
    },
    [focus],
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
