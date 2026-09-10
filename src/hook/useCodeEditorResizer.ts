import { useCallback } from "react";
import { useCodeEditorHeightStore } from "../zustand/CodeResultHeightStore";

const MIN_EDITOR_HEIGHT = 50;
const MIN_RESULT_HEIGHT = 200;
const KEYBOARD_STEP = 20;

const getScreenHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

const clampEditorHeight = (height: number, screenHeight: number) =>
  Math.min(
    Math.max(height, MIN_EDITOR_HEIGHT),
    Math.max(MIN_EDITOR_HEIGHT, screenHeight - MIN_RESULT_HEIGHT),
  );

export default function useCodeEditorResizer() {
  const codeEditorHeight = useCodeEditorHeightStore(
    (state) => state.codeEditorHeight,
  );
  const setCodeEditorHeight = useCodeEditorHeightStore(
    (state) => state.setCodeEditorHeight,
  );

  const handleMouseDown = useCallback(
    (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      const screenHeight = getScreenHeight();

      document.body.style.userSelect = "none";
      document.body.style.pointerEvents = "none";
      document.body.style.cursor = "row-resize";

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const deltaY = moveEvent.clientY - clickEvent.clientY;
        setCodeEditorHeight(
          clampEditorHeight(codeEditorHeight + deltaY, screenHeight),
        );
      };

      const mouseUpHandler = () => {
        document.body.style.removeProperty("user-select");
        document.body.style.removeProperty("pointer-events");
        document.body.style.removeProperty("cursor");
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler, { once: true });
    },
    [codeEditorHeight, setCodeEditorHeight],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

      event.preventDefault();
      const delta = event.key === "ArrowUp" ? -KEYBOARD_STEP : KEYBOARD_STEP;
      setCodeEditorHeight(
        clampEditorHeight(codeEditorHeight + delta, getScreenHeight()),
      );
    },
    [codeEditorHeight, setCodeEditorHeight],
  );

  return [codeEditorHeight, handleMouseDown, handleKeyDown] as const;
}
