import { useCallback } from "react";
import {
  clampEditorHeight,
  getViewportHeight,
  MIN_EDITOR_HEIGHT,
  MIN_RESULT_HEIGHT,
  RESIZER_KEYBOARD_STEP,
} from "@lib/resizer";
import usePointerResize from "@hook/usePointerResize";
import { useCodeEditorHeightStore } from "../zustand/CodeResultHeightStore";

export default function useCodeEditorResizer() {
  const codeEditorHeight = useCodeEditorHeightStore(
    (state) => state.codeEditorHeight,
  );
  const setCodeEditorHeight = useCodeEditorHeightStore(
    (state) => state.setCodeEditorHeight,
  );
  const clampHeight = useCallback(
    (height: number) => clampEditorHeight(height, getViewportHeight()),
    [],
  );
  const handlePointerDown = usePointerResize({
    axis: "y",
    cursor: "row-resize",
    value: codeEditorHeight,
    clampValue: clampHeight,
    onResize: setCodeEditorHeight,
  });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

      event.preventDefault();
      const delta =
        event.key === "ArrowUp"
          ? -RESIZER_KEYBOARD_STEP
          : RESIZER_KEYBOARD_STEP;
      setCodeEditorHeight(clampHeight(codeEditorHeight + delta));
    },
    [clampHeight, codeEditorHeight, setCodeEditorHeight],
  );

  return [
    codeEditorHeight,
    Math.max(MIN_EDITOR_HEIGHT, getViewportHeight() - MIN_RESULT_HEIGHT),
    handlePointerDown,
    handleKeyDown,
  ] as const;
}
