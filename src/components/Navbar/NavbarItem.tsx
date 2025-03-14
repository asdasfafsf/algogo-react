import { Typography, Line } from '@components/common/index';

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
      className={`${!isSelected ? 'hidden' : ''} w-full`}
    >
      <ul className="w-full">
        <div className="flex items-center justify-center w-full">
          <div className="container flex items-center max-w-screen-xl px-4 py-2 ">
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
          {!!(children) && (
            <div className="flex justify-center">
              <div className="container flex items-center h-12 max-w-screen-xl gap-4 px-4">
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
