import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`${!className.includes('bg-') ? 'bg-white' : ''} rounded-lg shadow-lg ${className}`}
      onClick={onClick}
    >
      <div>{children}</div>
    </div>
  );
}
