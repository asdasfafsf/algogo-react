import { useCallback, useState } from "react";
import {
  clampProblemWidth,
  getViewportWidth,
  MIN_PROBLEM_WIDTH,
  MIN_WORKSPACE_WIDTH,
  RESIZER_KEYBOARD_STEP,
} from "@lib/resizer";
import usePointerResize from "@hook/usePointerResize";
import { useProblemWidthStore } from "../zustand/ProblemWidthStore";

export default function useProblemSidebar() {
  const [isResizing, setIsResizing] = useState(false);
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
    onResizeStart: () => setIsResizing(true),
    onResizeEnd: () => setIsResizing(false),
  });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const maxProblemWidth = Math.max(
        MIN_PROBLEM_WIDTH,
        getViewportWidth() - MIN_WORKSPACE_WIDTH,
      );

      if (event.key === "Home") {
        event.preventDefault();
        setProblemWidth(MIN_PROBLEM_WIDTH);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        setProblemWidth(maxProblemWidth);
        return;
      }

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
    isResizing,
    handlePointerDown,
    handleKeyDown,
  } as const;
}
