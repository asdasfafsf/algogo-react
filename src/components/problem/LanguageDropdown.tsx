/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useLanguageDropdown from '@hook/useLanguageDropdown';
import { Dropdown } from '@components/Dropdown/index';
import { Typography } from '@components/common/index';

export default function LanguageDropdown() {
  const {
    open, handler, selectedIndex, languageList, handleUpdate,
  } = useLanguageDropdown();

  return (
    <Dropdown
      handler={handler}
      open={open}
      className="p-0 bg-gray-900 border-gray-800 rounded-md"
      showArrow={false}
    >
      <div
        className="flex w-32 h-10 items-center justify-between border-gray-800 rounded-md border-solid border-[1px] py-2 px-4 cursor-pointer"
      >
        <Typography
          className="text-gray-400"
          weight="semilight"
          variant="medium"
        >
          {languageList[selectedIndex]}
        </Typography>
        <ChevronDownIcon
          strokeWidth={2.5}
          className={` h-3.5 w-3.5 transition-transform text-gray-400 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <ul className="w-32 p-0 bg-gray-900 rounded-sm">
        {
          languageList.map((elem, index) => (
            <li
              onClick={(e) => handleUpdate(e, index)}
              className="flex items-center w-full gap-1 p-3 bg-gray-900 rounded-md cursor-pointer hover:bg-gray-600"
            >
              <Typography
                className="text-gray-400"
                weight="semilight"
                variant="medium"
              >
                {elem}
              </Typography>
            </li>
          ))
        }
      </ul>
    </Dropdown>
  );
}
