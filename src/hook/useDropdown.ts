/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/no-unused-expressions
import {
  useCallback,
  useEffect, useRef, useState,
} from 'react';

export default function useDropdown(open:boolean) {
  const [isOpen, setOpen] = useState(open ?? false);
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof open !== 'undefined') {
      setOpen(open);
    }
  }, [open]);

  useEffect(() => {
    const handleClickArea = ((e: MouseEvent) => {
      if (divRef?.current && menuRef?.current) {
        const { target } = e;
        if ((isOpen)
              && !divRef.current?.contains(target as any)
              && !menuRef.current?.contains(target as any)) {
          setOpen(false);
        }
      }
    });

    const handleKeyEvent = ((e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'Escape') {
          setOpen(false);
        }
      }
    });

    if ((isOpen)) {
      window.addEventListener('click', handleClickArea);
      window.addEventListener('keydown', handleKeyEvent);
    }

    return () => {
      window.removeEventListener('click', handleClickArea);
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setOpen((isOpen) => !isOpen);
  }, []);

  return [isOpen, divRef, menuRef, handleOpen] as const;
}
