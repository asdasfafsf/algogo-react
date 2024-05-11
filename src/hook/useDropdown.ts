import {
  useState, useRef, useEffect,
} from 'react';

type HandleDropdown = () => void | Promise<void>;

export default function useDropdown(open: boolean, handler: HandleDropdown | null) {
  const [isOpen, setOpen] = useState<boolean>(open ?? false);
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (handler) {
      handler();
    }
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleClickArea = (e: MouseEvent) => {
      if (divRef.current && menuRef.current) {
        const { target } = e;
        if (
          isOpen
          && !divRef.current.contains(target as Node)
          && !menuRef.current.contains(target as Node)
        ) {
          handleOpen();
        }
      }
    };

    const handleKeyEvent = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        handleOpen();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickArea);
      window.addEventListener('keydown', handleKeyEvent);
    }

    return () => {
      window.removeEventListener('click', handleClickArea);
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, [isOpen]);

  return [isOpen, divRef, menuRef, handleOpen] as const;
}
