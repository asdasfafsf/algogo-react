import {
  Button,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TranslucentOverlay from '../atom/TranslucentOverlay';
import useModal from '../plugins/modal/useModal';

interface AlertModalProps {
  content: string;
}

export default function AlertModal({ content }: AlertModalProps) {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    modal.top().resolve(false);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  return (
    <TranslucentOverlay className={`flex items-center justify-center fixed inset-0 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div
        className={`min-h-50 h-auto rounded-md bg-white w-[400px] transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <header className="flex w-full justify-end items-end p-2">
          <div
            color="white"
            className="cursor-pointer"
            onClick={handleClose}
          >
            <XMarkIcon className="w-6 h-6" />
          </div>
        </header>
        <section className="h-24 flex items-center justify-center">
          {content}
        </section>
        <footer className="flex items-end justify-end w-full p-2">
          <Button
            size="sm"
            onClick={handleClose}
            color="blue"
          >
            확인
          </Button>
        </footer>
      </div>
    </TranslucentOverlay>
  );
}
