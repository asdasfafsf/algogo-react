import { Dropdown } from '@components/Dropdown';
import { useState } from 'react';
import { Typography } from '@components/common';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CodeEditorThemeDropdownProps {
  theme: CodeEditorTheme;
  handleSelect: (_: unknown, theme: CodeEditorTheme) => void | Promise<void>
}

export default function CodeEditorThemeDropdown(
  { theme, handleSelect }: CodeEditorThemeDropdownProps,
) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="flex w-20 py-2">
        <Typography
          weight="semibold"
          variant="medium"
        >
          테마
        </Typography>
      </div>
      <Dropdown
        open={open}
        handler={() => setOpen((open) => !open)}
        align="bottom-right"
        showArrow={false}
      >
        <div className="flex items-center justify-between w-32 p-2 border-gray-200 border-solid border-[1px] rounded-md ">
          <Typography weight="semilight" variant="medium">{theme}</Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={` h-3.5 w-3.5 transition-transform text-gray-400 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>

        <ul className="overflow-y-auto max-h-24">
          {
            (['vs-dark', 'light'] as CodeEditorTheme[]).map((elem) => (
              <li
                className="w-32 cursor-pointer hover:bg-gray-200"
                onClick={(_) => {
                  handleSelect(_, elem);
                  setOpen(false);
                }}
                key={elem}
              >
                <div className="flex p-2">
                  <Typography
                    weight="light"
                    variant="medium"
                  >
                    {elem}
                  </Typography>
                </div>
              </li>
            ))
        }
        </ul>
      </Dropdown>
    </div>
  );
}
