import React from 'react';

interface IconButtonProps {
  color?: 'blue' | 'red' | 'green' | 'amber' | 'slate' | 'gray';
  variant?: 'filled' | 'gradient' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  rounded?: 'default' | 'full';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  children?: React.ReactNode;
}

const colorClasses = {
  blue: 'bg-blue-600 text-white hover:bg-blue-700',
  red: 'bg-red-600 text-white hover:bg-red-700',
  green: 'bg-green-600 text-white hover:bg-green-700',
  amber: 'bg-amber-600 text-white hover:bg-amber-700',
  slate: 'bg-slate-800 text-white hover:bg-slate-700',
  gray: 'bg-gray-600 text-white hover:bg-gray-700',
};

const variantClasses = {
  filled: 'border border-transparent shadow-sm',
  gradient: 'bg-gradient-to-tr from-slate-800 to-slate-700 text-white shadow-sm',
  outlined: 'border border-slate-300 text-slate-600 hover:bg-slate-800 hover:text-white',
  text: 'bg-transparent text-slate-600 hover:bg-slate-100',
};

const sizeClasses = {
  small: 'p-1.5 text-xs',
  medium: 'p-2.5 text-sm',
  large: 'p-3 text-base',
};

export default function IconButton({
  children = '',
  color = 'slate',
  variant = 'filled',
  size = 'medium',
  rounded = 'default',
  onClick,
  disabled = false,
}: IconButtonProps) {
  const classes = `
    ${colorClasses[color] || ''}
    ${variantClasses[variant] || ''}
    ${sizeClasses[size] || ''}
    ${rounded === 'full' ? 'rounded-full' : 'rounded-md'}
    transition-all focus:outline-none focus:shadow-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none
  `;

  return (
    <button className={classes} onClick={onClick} disabled={disabled} type="button">
      {children}
    </button>
  );
}
