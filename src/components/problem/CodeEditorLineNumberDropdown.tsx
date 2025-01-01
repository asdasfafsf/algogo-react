import { Dropdown } from '@components/Dropdown';
import { useCallback, useState } from 'react';
import { Typography } from '@components/common';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CodeEditorLineNumberDropdownProps {
  lineNumber: CodeEditorLineNumber;
}

export default function CodeEditorLineNumberDropdown(
  { lineNumber }: CodeEditorLineNumberDropdownProps,
) {
  const [displayedTheme, setTheme] = useState(lineNumber);
  const [open, setOpen] = useState(false);
  const handleClickFontSize = useCallback(async (e: unknown, theme: LineNumber) => {
    setTheme(theme);
    setOpen(false);
  }, []);

  return (
    <div className="flex">
      <div className="flex w-20 py-2">
        <Typography
          weight="semibold"
          variant="medium"
        >
          줄 번호
        </Typography>
      </div>
      <Dropdown
        open={open}
        handler={() => setOpen((open) => !open)}
        align="bottom-right"
        showArrow={false}
      >
        <div className="flex items-center justify-between w-32 p-2 border-gray-200 border-solid border-[1px] rounded-md ">
          <Typography weight="semilight" variant="medium">{displayedTheme}</Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={` h-3.5 w-3.5 transition-transform text-gray-400 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>

        <ul className="overflow-y-auto max-h-24">
          {
            (['relative', 'on', 'off'] as CodeEditorLineNumber[]).map((elem) => (
              <li
                className="w-32 cursor-pointer hover:bg-gray-200"
                onClick={(_) => handleClickFontSize(_, elem)}
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
