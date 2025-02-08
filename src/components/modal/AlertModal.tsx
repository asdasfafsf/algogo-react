import { useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import { TranslucentOverlay } from '@components/common/index';
import { Button } from '@components/Button/index';

interface AlertModalProps {
  content: string;
  title?: string;
  confirmText?: string;
}

export default function AlertModal({
  content,
  title = '알림',
  confirmText = '확인',
}: AlertModalProps) {
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <TranslucentOverlay
      onClick={handleOverlayClick}
      className={`flex items-center justify-center fixed inset-0 bg-black/30 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        role="dialog"
        aria-labelledby="alert-title"
        className="w-[400px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] animate-in fade-in duration-200"
      >
        <div className="flex justify-between items-center px-7 py-5">
          <h2 id="alert-title" className="text-[17px] font-semibold text-gray-800">{title}</h2>
        </div>

        <div className="px-7 pb-7 pt-2 text-[15px] leading-relaxed text-gray-600">
          {content}
        </div>

        <div className="flex justify-end px-4 pb-4 pt-2">
          <Button
            onClick={handleClose}
            className="min-w-[80px] h-[38px] rounded-lg text-[14px] bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
