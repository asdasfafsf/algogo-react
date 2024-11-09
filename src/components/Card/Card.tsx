import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`${className} bg-white rounded-lg shadow-lg`}>
      <div>{children}</div>
    </div>
  );
}
