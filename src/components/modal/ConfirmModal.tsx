import { Button } from '@components/Button/index';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useModal from '@plugins/modal/useModal';
import { TranslucentOverlay } from '@components/common/index';

interface AlertModalProps {
  content: string;
}

export default function ComfirmModal({ content }: AlertModalProps) {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    modal.top().resolve(false);
  };

  const handleOk = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    modal.top().resolve(true);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      switch (event.key) {
        case 'Escape':
          setIsVisible(false);
          modal.top().resolve(false);
          break;
        case 'Enter':
          setIsVisible(false);
          modal.top().resolve(true);
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
        <header className="flex items-end justify-end w-full p-2">
          <div
            color="white"
            className="cursor-pointer"
            onClick={handleCancel}
          >
            <XMarkIcon className="w-6 h-6" />
          </div>
        </header>
        <section className="flex items-center justify-center h-24">
          <div className="p-4">{content}</div>
        </section>
        <footer className="flex items-end justify-end w-full gap-1 p-2">
          <Button
            onClick={handleCancel}
            className="bg-gray-500"
            color="gray"
          >
            취소
          </Button>
          <Button
            onClick={handleOk}
            color="blue"
          >
            확인
          </Button>
        </footer>
      </div>
    </TranslucentOverlay>
  );
}
