import { useCallback, useEffect, useState } from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import useModal from '@plugins/modal/useModal';
import { Tooltip, TranslucentOverlay, Typography } from '@components/common/index';
import { Button } from '@components/Button/index';
import useInput from '@hook/useInput';
import { Input } from '../Input';

interface PromptModalProps {
  content: string;
  defaultValue?: string | boolean;
  title?: string;
}

export default function PromptModal({ title, defaultValue = '', content }: PromptModalProps) {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const { value, handleChange, setValue } = useInput();

  const handleOk = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);

    if (value === '') {
      modal.top().resolve(defaultValue);
    } else {
      modal.top().resolve(value);
    }
  }, [value]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      setIsVisible(false);
      modal.top().resolve(false);
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          setIsVisible(false);
          modal.top().resolve(false);
          break;
        case 'Enter':
          setIsVisible(false);
          if (value === '') {
            modal.top().resolve(defaultValue);
          } else {
            modal.top().resolve(value);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal, value]);

  return (
    <TranslucentOverlay
      className={`flex items-center justify-center fixed inset-0 bg-black/30 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className="w-[400px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] animate-in fade-in duration-200"
      >
        <header className="flex items-end justify-end w-full p-2" />
        <section className="px-4 py-2 h-28">
          <div>
            {title ? <Typography variant="medium" weight="regular">{title}</Typography> : ''}
            <div className="h-4" />
            <Input
              label={content}
              placeholder={content}
              value={value}
              onChange={handleChange}
              icon={(
                <Tooltip content="붙여넣기">
                  <div
                    onClick={async () => {
                      const text = await navigator.clipboard.readText();
                      setValue(text);
                    }}
                    className="cursor-pointer"
                  >
                    <ClipboardDocumentListIcon className="z-10 w-5 h-5" />
                  </div>
                </Tooltip>
              )}
            />
          </div>
        </section>
        <footer className="flex items-end justify-end w-full gap-1 p-2">
          <Button
            onClick={handleClose}
            color="gray"
            className="rounded-2xl"
          >
            취소
          </Button>
          <Button
            onClick={handleOk}
            color="blue"
            className="rounded-2xl"
          >
            확인
          </Button>
        </footer>
      </div>
    </TranslucentOverlay>
  );
}
