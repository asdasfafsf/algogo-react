/* eslint-disable max-len */
import { useCallback, useState } from 'react';
import { useProblemWidthStore } from '../zustand/ProblemWidthStore';

export default function useProblemSidebar() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { problemWidth, setProblemWidth } = useProblemWidthStore(({ problemWidth, setProblemWidth }) => ({ problemWidth, setProblemWidth }));
  const [open, setOpen] = useState(true);

  const handleClickOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleMouseDown = useCallback((clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    if (clickEvent.target instanceof HTMLButtonElement || clickEvent.target instanceof SVGElement) {
      return;
    }
    clickEvent.stopPropagation();
    let currentSize = problemWidth;
    const screenWidth = (window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth);

    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';
    document.body.style.cursor = 'col-resize';

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - clickEvent.clientX;
      currentSize = problemWidth + deltaX;
      if ((deltaX > 0 && (currentSize) < screenWidth - 100)
        || (deltaX < 0 && (currentSize) > 100)) {
        setProblemWidth(currentSize);
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
  }, [problemWidth]);

  return {
    problemWidth, handleMouseDown, open, handleClickOpen,
  } as const;
}
