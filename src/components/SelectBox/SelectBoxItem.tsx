import React from 'react';

interface SelectBoxItemProps {
  children: React.ReactNode;
  className?: string;
  onClick: (_: unknown) => unknown | Promise<unknown>
}

export default function SelectBoxItem({ className = '', children, onClick }: SelectBoxItemProps) {
  return (
    <li
      onClick={onClick}
      className={`p-2 hover:bg-gray-200 ${className}`}
    >
      {children}
    </li>
  );
}
