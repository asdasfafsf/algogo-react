import { useCallback, useEffect, useRef } from "react";
import {
  isPrimaryResizePointer,
  isResizeControlTarget,
  restoreResizeBodyStyle,
  snapshotResizeBodyStyle,
} from "@lib/resizer";

type ResizeAxis = "x" | "y";

interface UsePointerResizeOptions {
  axis: ResizeAxis;
  cursor: string;
  value: number;
  clampValue: (value: number) => number;
  onResize: (value: number) => void;
}

function getCoordinate(event: PointerEvent, axis: ResizeAxis) {
  return axis === "x" ? event.clientX : event.clientY;
}

export default function usePointerResize({
  axis,
  cursor,
  value,
  clampValue,
  onResize,
}: UsePointerResizeOptions) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      cleanupRef.current?.();
    },
    [],
  );

  const handlePointerDown = useCallback(
    (pointerEvent: React.PointerEvent<HTMLElement>) => {
      if (
        !isPrimaryResizePointer(pointerEvent) ||
        isResizeControlTarget(pointerEvent.target)
      ) {
        return;
      }

      cleanupRef.current?.();
      pointerEvent.preventDefault();
      const pointerId = pointerEvent.pointerId;
      const initialCoordinate = getCoordinate(pointerEvent.nativeEvent, axis);
      const bodyStyle = snapshotResizeBodyStyle(document.body.style);
      const moveHandler = (moveEvent: PointerEvent) => {
        if (moveEvent.pointerId !== pointerId) return;

        onResize(
          clampValue(
            value + getCoordinate(moveEvent, axis) - initialCoordinate,
          ),
        );
      };
      const cleanup = () => {
        restoreResizeBodyStyle(document.body.style, bodyStyle);
        document.removeEventListener("pointermove", moveHandler);
        window.removeEventListener("pointerup", endHandler);
        window.removeEventListener("pointercancel", endHandler);
        window.removeEventListener("blur", cleanup);
        if (cleanupRef.current === cleanup) cleanupRef.current = null;
      };
      const endHandler = (endEvent: PointerEvent) => {
        if (endEvent.pointerId === pointerId) cleanup();
      };

      document.body.style.userSelect = "none";
      document.body.style.pointerEvents = "none";
      document.body.style.cursor = cursor;
      document.addEventListener("pointermove", moveHandler);
      window.addEventListener("pointerup", endHandler);
      window.addEventListener("pointercancel", endHandler);
      window.addEventListener("blur", cleanup);
      cleanupRef.current = cleanup;
    },
    [axis, clampValue, cursor, onResize, value],
  );

  return handlePointerDown;
}
