/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Typography,
} from '@material-tailwind/react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  children: React.ReactNode;
  value: string;
}

export default function Dropdown({ children, value } : DropdownProps) {
  const [isOpen, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOpen = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickArea = ((e: MouseEvent) => {
    //   setOpen(!isOpen);
      if (divRef?.current && menuRef?.current) {
        const { target } = e;
        if (isOpen
            && !divRef.current?.contains(target as any)
            && !menuRef.current?.contains(target as any)) {
          setOpen(false);
        }
      }
    });

    if (isOpen) {
      window.addEventListener('click', handleClickArea);
    }

    return () => {
      window.removeEventListener('click', handleClickArea);
    };
  }, [isOpen, divRef]);

  return (
    <div className="z-20">
      <div
        ref={menuRef}
        onClick={handleClickOpen}
        className={`${isOpen ? 'bg-blue-100' : ''} flex items-center h-4 gap-1 px-2 py-4 bg-gray-300 rounded-md cursor-pointer`}
      >
        <Typography
          className={`${isOpen ? 'text-blue-500' : ''} font-bold`}
          variant="small"
        >
          {value}
        </Typography>
        <div
          className="h-4"
        >
          <ChevronDownIcon
            strokeWidth={2.5}
            className={` h-3.5 w-3.5 transition-transform ${
              isOpen ? 'text-blue-400 rotate-180' : 'text-gray-400'
            }`}
          />
        </div>

      </div>

      {/* <MenuItem className="cursor:none"> */}
      <div
        ref={divRef}
        className={`${isOpen ? '' : 'hidden'} border border-gray-300 shadow-lg absolute bg-white rounded-md p-4 z-10 content-border`}
      >
        {children}
      </div>

    </div>

  );
}
