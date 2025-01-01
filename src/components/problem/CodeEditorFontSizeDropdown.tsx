import { Dropdown } from '@components/Dropdown';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Typography } from '@components/common';

interface CodeEditorFontSizeProps {
  fontSize: number;
  handleSelect: (_: unknown, fontSize: number) => void | Promise<void>
}

export default function CodeEditorFontSizeDropdown(
  { fontSize, handleSelect }: CodeEditorFontSizeProps,
) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="flex w-20 py-2">
        <Typography
          weight="semibold"
          variant="medium"
        >
          글자 크기
        </Typography>
      </div>
      <Dropdown
        open={open}
        handler={() => setOpen((open) => !open)}
        align="bottom-right"
        showArrow={false}
      >
        <div className="flex items-center justify-between w-32 p-2 border-gray-200 border-solid border-[1px] rounded-md ">
          <Typography weight="semilight" variant="medium">{fontSize}</Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={` h-3.5 w-3.5 transition-transform text-gray-400 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>

        <ul className="overflow-y-auto max-h-24">
          {
            [14, 15, 16, 17, 18, 19, 20, 21].map((elem) => (
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
