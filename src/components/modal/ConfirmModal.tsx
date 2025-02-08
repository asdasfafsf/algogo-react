import { Button } from '@components/Button/index';
import { useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import { TranslucentOverlay } from '@components/common/index';

interface ConfirmModalProps {
  content: string;
  title?: string;
  cancelText?: string;
  confirmText?: string;
}

export default function ConfirmModal({
  content,
  title = '확인',
  cancelText = '취소',
  confirmText = '확인',
}: ConfirmModalProps) {
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
    <TranslucentOverlay
      onClick={(e) => e.target === e.currentTarget && handleCancel(e)}
      className={`flex items-center justify-center fixed inset-0 bg-black/30 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        role="dialog"
        aria-labelledby="confirm-title"
        className="w-[28rem] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] animate-in fade-in duration-200"
      >
        <div className="flex justify-between items-center px-6 py-5">
          <h2 id="confirm-title" className="text-[17px] font-semibold text-gray-800">{title}</h2>
        </div>

        <div className="px-6 pb-5 pt-1 text-[15px] leading-relaxed text-gray-600 min-h-[60px]">
          {content}
        </div>

        <div className="flex justify-end gap-1 px-4 pb-4">
          <Button
            color="gray"
            onClick={handleCancel}
            className="min-w-[80px] rounded-2xl"
          >
            {cancelText}
          </Button>
          <Button
            color="blue"
            onClick={handleOk}
            className="min-w-[80px] rounded-2xl"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </TranslucentOverlay>
  );
}
