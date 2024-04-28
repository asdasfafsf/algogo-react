import {
  Button, IconButton, Menu, MenuHandler, MenuList, Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  children: React.ReactNode;
  value: string;
}

export default function Dropdown({ children, value } : DropdownProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Menu
      handler={() => setOpen(!isOpen)}
      open={isOpen}
      placement="bottom-start"
    >
      <MenuHandler>
        <div
          className={`${isOpen ? '' : ''} flex items-center h-4 gap-1 px-2 py-4 bg-gray-300 rounded-md cursor-pointer`}
        >
          <Typography
            className="font-bold"
            variant="small"
          >
            {value}
          </Typography>
          <div
            className="h-4"
          >
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`text-gray-400 h-3.5 w-3.5 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </MenuHandler>
      <MenuList className="max-h-[100vh]">

        {/* <ul> */}
        {children}
        {/* </ul> */}

      </MenuList>
    </Menu>
  );
}
