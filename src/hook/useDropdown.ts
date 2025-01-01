import {
  useState, useRef, useEffect,
  useCallback,
  useMemo,
} from 'react';
import useModal from '../plugins/modal/useModal';

type HandleDropdown = () => void | Promise<void>;

export default function useDropdown(open: boolean, handler: HandleDropdown | null) {
  const [isOpen, setOpen] = useState<boolean>(open ?? false);
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modal = useModal();
  const randomKey = useMemo(() => `${new Date().getTime()}${Math.random()}`, []);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    if (isOpen === true) {
      modal.push(randomKey, null, {});
    } else {
      modal.remove(randomKey);
    }
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    if (handler) {
      handler();
    } else {
      setOpen((prevOpen) => !prevOpen);
    }
  }, [open]);

  useEffect(() => {
    const handleClickArea = (e: MouseEvent) => {
      if (modal.top().key !== randomKey) {
        return;
      }

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
      if (modal.top().key !== randomKey) {
        return;
      }

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
