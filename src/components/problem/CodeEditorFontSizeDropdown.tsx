import { Dropdown } from '@components/Dropdown';
import { useCallback, useState } from 'react';
import { Typography } from '@components/common';

export default function CodeEditorFontSizeDropdown() {
  const [fontSize, setFontSize] = useState(14);
  const [open, setOpen] = useState(false);
  const handleClickFontSize = useCallback(async (e: unknown, fontSize: number) => {
    setFontSize(fontSize);
    setOpen(false);
  }, []);

  return (
    <Dropdown
      open={open}
      handler={() => setOpen((open) => !open)}
      align="bottom-right"
      showArrow={false}
    >
      <div className="w-32 p-2 border-gray-200 border-solid border-[1px] rounded-md ">
        <Typography weight="semibold" variant="medium">{fontSize}</Typography>
      </div>

      <ul className="overflow-y-auto max-h-24">
        {
            [14, 15, 16, 17, 18, 19, 20, 21].map((elem) => (
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
  );
}
