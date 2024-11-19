import { Typography } from '@components/Typography/index';
import useProblemStateDropdown from '@hook/useProblemStateDropdown';
import { Checkbox } from '@components/Checkbox/index';
import { Dropdown } from '@components/Dropdown/index';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ProblemStateDropdown() {
  const {
    open, handler, problemStateList, handleClick,
  } = useProblemStateDropdown();
  return (
    <Dropdown
      open={open}
      handler={handler}
      className="px-0 py-0"
      showArrow={false}

    >
      <div className={`flex items-center gap-1 p-2 ${open ? 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 '} rounded-md cursor-pointer`}>
        <Typography variant="medium">상태</Typography>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>

      <ul className="w-40 gap-2 p-2">
        {problemStateList.map(({ isSelected, name, value }, index) => (
          <li
            onClick={(e) => handleClick(e, index)}
            key={value}
            className="flex items-center w-full gap-1 py-1 rounded-md cursor-pointer hover:bg-gray-300"
          >
            <Checkbox
              checked={isSelected}
              color="blue"
            />
            <Typography
              className="font-medium"
              variant="medium"
            >
              {name}
            </Typography>
          </li>
        ))}

      </ul>
    </Dropdown>
  );
}
