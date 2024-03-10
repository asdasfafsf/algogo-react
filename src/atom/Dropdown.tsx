/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Dropdown() {
  const LanguageList = ['C++', 'Java 11', 'Python3', 'Node.js'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openMenu = false;
  return (
    <div className="relative flex max-w-[24rem]">
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
              {LanguageList[selectedIndex]}
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
          className="max-h-[20rem] max-w-4 min-w-32 bg-gray-900 border-gray-800 p-3"
        >
          {LanguageList.map((language, index) => (
            <div
              key={language}
              onClick={(e) => setSelectedIndex(index)}
              className="bg-gray flex items-center p-1 hover:bg-blue-gray-700 rounded-md cursor-poiner"
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
