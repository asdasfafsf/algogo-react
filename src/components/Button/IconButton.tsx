import React from 'react';

export interface IconButtonProps {
  color?: 'blue' | 'red' | 'green' | 'amber' | 'slate' | 'gray' | 'white' | 'black';
  variant?: 'filled' | 'gradient' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  rounded?: 'default' | 'full';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const variantColorClasses: Record<string, Record<string, string>> = {
  filled: {
    blue: 'bg-blue-600 text-white hover:bg-blue-100 hover:text-blue-600',
    red: 'bg-red-600 text-white hover:bg-red-100 hover:text-red-600',
    green: 'bg-green-600 text-white hover:bg-green-100 hover:text-green-600',
    amber: 'bg-amber-600 text-white hover:bg-amber-100 hover:text-amber-600',
    slate: 'bg-slate-800 text-white hover:bg-slate-100 hover:text-slate-800',
    gray: 'bg-gray-600 text-white hover:bg-gray-100 hover:text-gray-600',
    white: 'bg-white text-slate-800 hover:bg-slate-100 hover:text-white',
    black: 'bg-black text-white hover:bg-gray-800',
  },
  gradient: {
    blue: 'bg-gradient-to-tr from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
    red: 'bg-gradient-to-tr from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800',
    green: 'bg-gradient-to-tr from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800',
    amber: 'bg-gradient-to-tr from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800',
    slate: 'bg-gradient-to-tr from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600',
    gray: 'bg-gradient-to-tr from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800',
    white: 'bg-gradient-to-tr from-white to-gray-100 text-slate-800 hover:from-gray-100 hover:to-gray-200',
    black: 'bg-gradient-to-tr from-black to-gray-800 text-white hover:from-gray-900 hover:to-gray-700',
  },
  outlined: {
    blue: 'border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white',
    red: 'border-red-600 text-red-600 hover:bg-red-700 hover:text-white',
    green: 'border-green-600 text-green-600 hover:bg-green-700 hover:text-white',
    amber: 'border-amber-600 text-amber-600 hover:bg-amber-700 hover:text-white',
    slate: 'border-slate-300 text-slate-600 hover:bg-slate-800 hover:text-white',
    gray: 'border-gray-600 text-gray-600 hover:bg-gray-700 hover:text-white',
    white: 'border-transparent text-slate-800 hover:bg-gray-100 hover:text-slate-800',
    black: 'border-black text-black hover:bg-gray-900 hover:text-white',
  },
  text: {
    blue: 'bg-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800',
    red: 'bg-transparent text-red-600 hover:bg-red-100 hover:text-red-800',
    green: 'bg-transparent text-green-600 hover:bg-green-100 hover:text-green-800',
    amber: 'bg-transparent text-amber-600 hover:bg-amber-100 hover:text-amber-800',
    slate: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800',
    gray: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800',
    white: 'bg-transparent text-slate-800 hover:bg-gray-100 hover:text-slate-800',
    black: 'bg-transparent text-black hover:bg-gray-900 hover:text-white',
  },
};

const variantBaseClasses: Record<string, string> = {
  filled: 'border border-transparent',
  gradient: '',
  outlined: '',
  text: '',
};

const sizeClasses: Record<string, string> = {
  small: 'w-8 h-8 text-xs',
  medium: 'w-10 h-10 text-xs',
  large: 'w-12 h-12 text-base',
};

function IconButton({
  children,
  color = 'black',
  variant = 'filled',
  size = 'medium',
  rounded = 'default',
  className = '',
  onClick,
  disabled = false,
}: IconButtonProps) {
  const baseClasses = `
    ${variantColorClasses[variant][color]}
    ${variantBaseClasses[variant]}
    ${sizeClasses[size]}
    ${rounded === 'full' ? 'rounded-full' : 'rounded-md'}
    transition-all focus:outline-none focus:shadow-none shadow-none
    ${disabled ? 'opacity-50 shadow-none pointer-events-none' : 'hover:shadow-lg'}
  `;

  const newClass = baseClasses.replace(/\s+/g, ' ').trim();

  return (
    <button
      className={`flex items-center justify-center ${className} ${newClass}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}

export default IconButton;
