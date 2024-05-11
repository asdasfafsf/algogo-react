/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Typography,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useDropdown from '../hook/useDropdown';

interface DropdownProps {
  children: React.ReactNode;
  value: string;
  open?: boolean;
  handler?: () => void | Promise<void>
}

export default function Dropdown({
  children,
  value,
  open,
  handler,
} : DropdownProps) {
  const [isOpen, menuRef, divRef, handleOpen] = useDropdown(open ?? false);

  const handle = handler ?? handleOpen;

  return (
    <div className="z-20">
      <div
        ref={menuRef}
        onClick={handle}
        className={`${isOpen ? 'bg-blue-100' : 'bg-gray-300'} flex items-center h-4 gap-1 px-2 py-4 rounded-md cursor-pointer`}
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
