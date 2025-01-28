import { Avatar } from '@components/common/index';
import { Typography } from '@components/common';
import { Dropdown } from '@components/Dropdown/index';

import {
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import useMeStore from '@zustand/MeStore';

interface ProfileMenuProps {
  me: Me
}

export default function ProfileMenu({ me }: ProfileMenuProps) {
  const navigate = useNavigate();
  const { logout } = useMeStore(({ logout }) => ({ logout }));

  return (
    <Dropdown
      align="bottom-right"
    >
      <Avatar
        variant="circular"
        size="medium"
        alt="User"
        src={me.profilePhoto || 'https://docs.material-tailwind.com/img/face-2.jpg'}
      />

      <ul className="w-40 gap-2 p-1 text-gray-700 ">
        <li
          onClick={() => { navigate('/me'); }}
          className="flex items-center w-full gap-1 p-2 rounded-md cursor-pointer hover:bg-gray-300"
        >
          <UserCircleIcon className="w-5 h-5" />
          <Typography
            weight="semilight"
            variant="medium"
          >
            마이페이지
          </Typography>

        </li>
        <li
          onClick={() => { logout(); }}
          className="flex items-center w-full gap-1 p-2 rounded-md cursor-pointer hover:bg-gray-300"
        >
          <UserCircleIcon className="w-5 h-5" />
          <Typography
            weight="semilight"
            variant="medium"
          >
            로그아웃
          </Typography>

        </li>

      </ul>
      {/* <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, handleClick }) => (
            <MenuItem
              key={label}
              onClick={handleClick}
              className="flex items-center gap-2 rounded"
            >
              {createElement(icon, {
                className: 'h-4 w-4',
                strokeWidth: 2,
              })}
              <Typography variant="small" className="font-normal">
                {label}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Menu> */}
    </Dropdown>
  );
}
