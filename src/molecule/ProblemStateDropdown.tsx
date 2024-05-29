import { Typography } from '@material-tailwind/react';
import Checkbox from '../atom/Checkbox';
import Dropdown from '../atom/Dropdown';
import useProblemStateDropdown from '../hook/useProblemStateDropdown';

export default function ProblemStateDropdown() {
  const [problemStateList, handleClick] = useProblemStateDropdown();

  return (
    <Dropdown
      className="px-0 py-0"
      value="상태"
    >

      <ul className="w-40 gap-2 p-1">
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
              variant="small"
            >
              {name}
            </Typography>
          </li>
        ))}

      </ul>
    </Dropdown>
  );
}
