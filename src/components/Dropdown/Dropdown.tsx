import React, { ReactNode, Children, isValidElement } from 'react';
import useDropdown from '@hook/useDropdown';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  className?: string;
  open?: boolean;
  handler?: () => void | Promise<void>;
  children: ReactNode;
  showArrow?: boolean; // 화살표 표시 여부
}

export default function Dropdown({
  className = '',
  open = false,
  handler,
  children,
  showArrow = true, // 기본값으로 화살표 표시
}: DropdownProps) {
  const [isOpen, menuRef, divRef, handleOpen] = useDropdown(open, handler ?? null);

  const childrenArray = Children.toArray(children);
  const header = childrenArray[0];
  const content = childrenArray.slice(1);

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
          className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          {content}
        </div>
      )}
    </div>
  );
}
