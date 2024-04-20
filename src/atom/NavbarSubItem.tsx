import { Typography } from '@material-tailwind/react';

interface NavbarSubItemProps {
  isSelected: boolean
  value: string;
  to: string;
}
export default function NavbarSubItem({ isSelected, value, to }:NavbarSubItemProps) {
  return (
    <li className="pointer">
      <a href={to}>
        <Typography
          className={`${isSelected ? 'text-black' : 'text-gray-500'} font-medium`}
          variant="small"
        >
          {value}
        </Typography>
      </a>
    </li>

  );
}
