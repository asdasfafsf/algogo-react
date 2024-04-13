/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useLanguageDropdown from '../hook/useLanguageDropdown';

export default function Dropdown() {
  const openMenu = false;
  const [selectedIndex, languageList, handleUpdate] = useLanguageDropdown();

  return (
    <div className="z-10 relative flex max-w-[24rem]">
      <Menu placement="bottom-start">
        <MenuHandler>
          <div
            className="flex w-32 items-center justify-between border-gray-800 rounded-md border-solid border-[1px] py-2 px-4 cursor-pointer"
            // className="text-large"
          >

            <Typography
              variant="small"
              className="font-bold text-gray-400 relative top-[1px]"
            >
              {' '}
              {languageList[selectedIndex]}
            </Typography>
            &nbsp;
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`text-gray-400 h-3.5 w-3.5 transition-transform ${
                openMenu ? 'rotate-180' : ''
              }`}
            />
          </div>
        </MenuHandler>
        <MenuList
          color="gray"
          className="z-10 max-h-[20rem] max-w-4 min-w-32 bg-gray-900 border-gray-800 p-3"
        >
          {languageList.map((language, index) => (
            <div
              key={language}
              onClick={(e) => handleUpdate(e, index)}
              className="flex items-center p-1 rounded-md bg-gray hover:bg-blue-gray-700 cursor-poiner"
            >
              <Typography
                variant="small"
                className="font-medium text-gray-400"
              >
                {language}
              </Typography>
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
