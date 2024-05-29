import React from 'react';
import {
  Typography,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

import {
  UserCircleIcon,
} from '@heroicons/react/24/solid';

// profile menu component
const profileMenuItems = [
  {
    label: '마이페이지',
    icon: UserCircleIcon,
  },
  {
    label: '로그아웃',
    icon: UserCircleIcon,
  },
];

export default function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="User"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }) => (
          <MenuItem
            key={label}
            onClick={closeMenu}
            className="flex items-center gap-2 rounded"
          >
            {React.createElement(icon, {
              className: 'h-4 w-4',
              strokeWidth: 2,
            })}
            <Typography as="span" variant="small" className="font-normal">
              {label}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
