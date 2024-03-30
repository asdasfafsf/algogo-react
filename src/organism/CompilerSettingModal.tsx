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
import TooltipIconButton from '../atom/TooptipIconButton';

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
    <TranslucentOverlay className="justify-center items-center">
      <div
        className="min-h-64 h-auto rounded-md bg-gray-900 w-[800px] w-full"
      >
        <header className="p-4 w-full flex items-center">
          <div className="w-1/2">
            <Typography
              color="white"
              variant="h6"
            >
              컴파일러 세팅
            </Typography>
          </div>
          <div className="w-1/2 flex justify-end items-start">
            <IconButton
              onClick={() => modal.top().resolve(false)}
              className="w-5 h-5"
            >
              <XMarkIcon className="w-5 h-5 text-white" />
            </IconButton>
          </div>
        </header>
        저는 컴파일러 세팅 화면 입니당
      </div>
    </TranslucentOverlay>
  );
}
