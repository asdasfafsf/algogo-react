/* eslint-disable react/no-array-index-key */
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TranslucentOverlay from '../atom/TranslucentOverlay';
import Line from '../atom/Line';
import useModal from '../plugins/modal/useModal';

interface AlertModalProps {
  content: string;
}

export default function AlertModal({ content }: AlertModalProps) {
  const modal = useModal();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          modal.top()?.resolve(false);
          break;
        default:
          break;
      }
    };

    if (!modal.top()) {
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  return (
    <TranslucentOverlay className="items-center justify-centers">
      <div
        className="min-h-50 h-auto rounded-md bg-white w-[400px]"
      >
        <header className="flex w-full justify-end items-end p-2">
          <div
            color="white"
            className="cursor-pointer"
            onClick={() => modal.top().resolve(false)}
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
            onClick={() => modal.top().resolve(false)}
            color="blue"
          >
            확인
          </Button>
        </footer>

      </div>
    </TranslucentOverlay>
  );
}
