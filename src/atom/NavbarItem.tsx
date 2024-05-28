import { Typography } from '@material-tailwind/react';
import Line from './Line';

interface NavbarItemProps {
  children: React.ReactNode;
  value: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
}

export default function NavbarItem({
  children, value, isSelected, onClick,
} : NavbarItemProps) {
  return (
    <li
      onClick={onClick}
      className={`${!isSelected ? 'hidden' : ''} w-screen`}
    >
      <ul className="w-screen">
        <div className="flex items-center justify-center w-screen">
          <div className="container flex items-center px-4 py-2">
            <Typography
              variant="h6"
            >
              {value}
            </Typography>
          </div>
        </div>
        {isSelected
        && (
        <>
          <Line />
          {!!(children?.length) && (
            <div className="flex justify-center">
              <div className="container flex items-center h-12 gap-4 px-4">
                {children}
              </div>
            </div>
          )}
        </>
        )}
        <li />
      </ul>
    </li>
  );
}
