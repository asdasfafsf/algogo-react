import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`${!className.includes('bg-') ? 'bg-white' : ''} rounded-lg shadow-lg ${className}`}>
      <div>{children}</div>
    </div>
  );
}
