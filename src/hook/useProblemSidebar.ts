import { useCallback } from "react";
import {
  clampProblemWidth,
  getViewportWidth,
  RESIZER_KEYBOARD_STEP,
} from "@lib/resizer";
import usePointerResize from "@hook/usePointerResize";
import { useProblemWidthStore } from "../zustand/ProblemWidthStore";

export default function useProblemSidebar() {
  const problemWidth = useProblemWidthStore((state) => state.problemWidth);
  const setProblemWidth = useProblemWidthStore(
    (state) => state.setProblemWidth,
  );
  const clampWidth = useCallback(
    (width: number) => clampProblemWidth(width, getViewportWidth()),
    [],
  );
  const handlePointerDown = usePointerResize({
    axis: "x",
    cursor: "col-resize",
    value: problemWidth,
    clampValue: clampWidth,
    onResize: setProblemWidth,
  });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();
      const delta =
        event.key === "ArrowLeft"
          ? -RESIZER_KEYBOARD_STEP
          : RESIZER_KEYBOARD_STEP;
      setProblemWidth(clampWidth(problemWidth + delta));
    },
    [clampWidth, problemWidth, setProblemWidth],
  );

  return {
    problemWidth,
    maxProblemWidth: Math.max(100, getViewportWidth() - 100),
    handlePointerDown,
    handleKeyDown,
  } as const;
}
