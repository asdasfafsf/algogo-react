import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useModal from '@plugins/modal/useModal';
import { TranslucentOverlay } from '@components/common/index';
import { Button } from '@components/Button/index';

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
    <TranslucentOverlay className={`flex items-center justify-center fixed inset-0 bg-black/30 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-[400px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] animate-in fade-in duration-200">
        <div className="flex justify-between items-center px-7 py-5">
          <h2 className="text-[17px] font-semibold text-gray-800">알림</h2>
          <Button
            onClick={handleClose}
            variant="text"
            className="w-8 h-8 rounded-full hover:bg-gray-100/80"
          >
            <XMarkIcon className="w-[18px] h-[18px] text-gray-400" />
          </Button>
        </div>

        <div className="px-7 pb-7 pt-2 text-[15px] leading-relaxed text-gray-600">
          {content}
        </div>

        <div className="flex justify-end px-7 pb-7 pt-2">
          <Button
            onClick={handleClose}
            className="min-w-[80px] h-[38px] rounded-lg text-[14px]"
          >
            확인
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
