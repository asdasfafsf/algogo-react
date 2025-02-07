import { useCallback, useEffect, useState } from 'react';
import { ClipboardDocumentListIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
    e.stopPropagation();
    setIsVisible(false);
    modal.top().resolve(false);
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
    <TranslucentOverlay className={`flex items-center justify-center fixed inset-0 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div
        className={`min-h-52 h-auto rounded-md bg-white w-[400px] transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <header className="flex items-end justify-end w-full p-2">
          <div
            color="white"
            className="cursor-pointer"
            onClick={handleClose}
          >
            <XMarkIcon className="w-6 h-6" />
          </div>
        </header>
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
