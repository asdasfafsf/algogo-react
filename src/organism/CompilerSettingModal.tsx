/* eslint-disable react/no-array-index-key */
import {
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TranslucentOverlay from '../atom/TranslucentOverlay';

import useModal from '../plugins/modal/useModal';

export default function CompilerSettingModal() {
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
    <TranslucentOverlay className="items-center justify-center">
      <div
        className="min-h-64 h-auto rounded-md bg-gray-900 w-[600px]"
      >
        <header className="flex items-center w-full p-4">
          <div className="w-1/2">
            <Typography
              color="white"
              variant="h6"
            >
              컴파일러 세팅
            </Typography>
          </div>
          <div className="flex items-start justify-end w-1/2">
            <IconButton
              onClick={() => modal.top().resolve(false)}
              className="w-5 h-5"
            >
              <XMarkIcon className="w-5 h-5 text-white" />
            </IconButton>
          </div>
        </header>
        <section />
      </div>
    </TranslucentOverlay>
  );
}
