import { ReactNode, Children, isValidElement } from 'react';
import useDropdown from '@hook/useDropdown';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  className?: string;
  open?: boolean;
  handler?: () => void | Promise<void>;
  children: ReactNode;
  showArrow?: boolean;
  align?:
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom';
}

export default function Dropdown({
  className = '',
  open = false,
  handler,
  children,
  showArrow = true,
  align = 'bottom', // 기본값
}: DropdownProps) {
  const [isOpen, menuRef, divRef, handleOpen] = useDropdown(open, handler ?? null);

  const childrenArray = Children.toArray(children);
  const header = childrenArray[0];
  const content = childrenArray.slice(1);

  const alignClass = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-full',
    bottom: 'top-full left-1/2 transform -translate-x-1/2',
    left: 'top-1/2 right-full transform -translate-y-1/2 -translate-x-full',
    right: 'top-1/2 left-full transform -translate-y-1/2',
    'top-left': 'bottom-full left-0 transform -translate-y-full',
    'top-right': 'bottom-full right-0 transform -translate-y-full',
    'bottom-left': 'top-full left-0',
    'bottom-right': 'top-full right-0',
    'top-left-center': 'bottom-full left-1/4 transform -translate-y-full -translate-x-1/4',
    'top-right-center': 'bottom-full right-1/4 transform -translate-y-full translate-x-1/4',
    'bottom-left-center': 'top-full left-1/4 transform translate-y-full -translate-x-1/4',
    'bottom-right-center': 'top-full right-1/4 transform translate-y-full translate-x-1/4',
    'left-top': 'top-1/4 right-full transform -translate-y-1/4 -translate-x-full',
    'left-bottom': 'bottom-1/4 right-full transform translate-y-1/4 -translate-x-full',
    'right-top': 'top-1/4 left-full transform -translate-y-1/4',
    'right-bottom': 'bottom-1/4 left-full transform translate-y-1/4',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={menuRef}
        onClick={handleOpen}
        className="flex items-center cursor-pointer"
      >
        {isValidElement(header) ? header : null}
        {showArrow && (
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </div>
      {isOpen && (
        <div
          ref={divRef}
          className={`absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg ${alignClass[align]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
