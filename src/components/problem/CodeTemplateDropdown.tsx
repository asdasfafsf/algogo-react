import { ChevronDownIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Dropdown } from '@components/Dropdown';
import { Typography } from '@components/common';

export default function CodeTemplateDropdown() {
  const open = false;
  return (
    <Dropdown
      className="p-0 rounded-md"
      showArrow={false}
    >
      <div
        className="flex h-10 items-center justify-between rounded-md py-2 px-4 cursor-pointer hover:bg-gray-700"
      >
        <div className="flex items-center gap-1.5">
          <DocumentTextIcon className="w-4 h-4 text-gray-400" />
          <Typography
            className="text-gray-400"
            weight="semilight"
            variant="medium"
          >
            템플릿
          </Typography>
        </div>
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`h-3.5 w-3.5 transition-transform text-gray-400 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <ul className="w-56 p-0 rounded-sm">
        {['바바하이', '바바하이2', '바바하이3'].map((elem, index) => (
          <li
            key={elem}
            className="flex items-center w-full gap-1 p-3 rounded-md cursor-pointer hover:bg-gray-700"
          >
            <Typography
              className="text-gray-400"
              weight="semilight"
              variant="medium"
            >
              {elem}
            </Typography>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
