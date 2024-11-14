import { Typography } from '@components/Typography/index';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useDropdown from '@hook/useDropdown';

interface DropdownProps {
  className?: string;
  children: React.ReactNode;
  value: string;
  open?: boolean;
  handler?: () => void | Promise<void>
}

export default function Dropdown({
  className = '',
  children,
  value,
  open,
  handler,
} : DropdownProps) {
  const [isOpen, menuRef, divRef, handleOpen] = useDropdown((typeof open === 'undefined' ? false : open), handler ?? null);

  return (
    <div className="z-20">
      <div
        ref={menuRef}
        onClick={handleOpen}
        className={`${isOpen ? 'bg-blue-100' : 'bg-gray-100'} flex items-center h-4 gap-1 px-2 py-4 rounded-md cursor-pointer`}
      >
        <Typography
          className={`${isOpen ? 'text-blue-500' : ''} font-bold`}
          variant="small"
        >
          {value}
        </Typography>
        <div
          className="h-4"
        >
          <ChevronDownIcon
            strokeWidth={2.5}
            className={` h-3.5 w-3.5 transition-transform ${
              isOpen ? 'text-blue-400 rotate-180' : 'text-gray-400'
            }`}
          />
        </div>

      </div>

      {/* <MenuItem className="cursor:none"> */}
      <div
        ref={divRef}
        className={`${isOpen ? '' : 'hidden'} ${className} border border-gray-300 shadow-lg absolute bg-white rounded-md p-4 z-10 content-border`}
      >
        {children}
      </div>

    </div>

  );
}
