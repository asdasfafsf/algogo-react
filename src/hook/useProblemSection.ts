/* eslint-disable max-len */
import { useCallback } from 'react';
import { useCodeResultHeightStore } from '../zustand/CodeResultHeightStore';

export default function useProblemSection() {
  const { codeResultHeight, setCodeResultHeight } = useCodeResultHeightStore(({ codeResultHeight, setCodeResultHeight }) => ({ codeResultHeight, setCodeResultHeight }));

  const handleMouseDown = useCallback((clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.stopPropagation();
    let currentSize = codeResultHeight;
    const screenHeight = (window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight);

    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';
    document.body.style.cursor = 'row-resize';

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.screenY - clickEvent.screenY;
      currentSize = codeResultHeight + deltaY;

      if (screenHeight - currentSize > 200 && currentSize > 50) {
        setCodeResultHeight(currentSize);
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
  }, [codeResultHeight]);

  return [codeResultHeight, handleMouseDown] as const;
}
