import { useEffect, useState } from 'react';
import useModal from '@plugins/modal/useModal';
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface ToastModalProps {
  content: string;
  duration?: number;
  variant?: 'default' | 'success' | 'fail';
}

export default function ToastModal({
  content,
  duration = 3000,
  variant = 'default',
}: ToastModalProps) {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    if (modal?.top().key === 'Toast') {
      modal.top().resolve(true);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, modal]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modal]);

  let iconElement;
  let iconContainerClass = '';

  switch (variant) {
    case 'success':
      iconElement = <CheckCircleIcon className="w-5 h-5" />;
      iconContainerClass = 'inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200';
      break;
    case 'fail':
      iconElement = <XCircleIcon className="w-5 h-5" />;
      iconContainerClass = 'inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200';
      break;
    default:
      iconElement = <ExclamationCircleIcon className="w-5 h-5" />;
      iconContainerClass = 'inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200';
      break;
  }

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className="fixed z-30 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 transition-opacity duration-500 ease-out bg-white rounded-lg shadow-sm right-4 bottom-4 dark:text-gray-400 dark:bg-gray-800"
    >
      <div className={iconContainerClass}>
        {iconElement}
        <span className="sr-only">
          {variant === 'success'
            ? 'Check icon'
            : variant === 'fail'
              ? 'Error icon'
              : 'Warning icon'}
        </span>
      </div>
      <div className="text-sm font-normal ms-3">{content}</div>
      <button
        type="button"
        onClick={handleClose}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
