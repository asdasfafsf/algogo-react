/* eslint-disable max-len */
import { useCallback } from 'react';
import { useCodeEditorHeightStore } from '../zustand/CodeResultHeightStore';

export default function useCodeEditorResizer() {
  const { codeEditorHeight, setCodeEditorHeight } = useCodeEditorHeightStore(({ codeEditorHeight, setCodeEditorHeight }) => ({ codeEditorHeight, setCodeEditorHeight }));

  const handleMouseDown = useCallback((clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    // clickEvent.stopPropagation();
    let currentSize = codeEditorHeight;
    const screenHeight = (window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight);

    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';
    document.body.style.cursor = 'row-resize';

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - clickEvent.clientY;
      currentSize = codeEditorHeight + deltaY;

      if (screenHeight - currentSize > 200 && currentSize > 50) {
        setCodeEditorHeight(codeEditorHeight + deltaY);
      }
    };

    // 5️⃣
    const mouseUpHandler = () => {
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('pointer-events');
      document.body.style.removeProperty('cursor');
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    // 1️⃣
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }, [codeEditorHeight]);

  return [codeEditorHeight, handleMouseDown] as const;
}
