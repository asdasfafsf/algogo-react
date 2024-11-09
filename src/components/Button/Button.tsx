import React, { MouseEvent } from 'react';

interface ButtonProps {
  variant?: 'filled' | 'gradient' | 'outlined' | 'text';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'blue' | 'red' | 'green' | 'amber' | 'slate' | 'gray';
  icon?: React.ReactNode;
  className?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
}

export default function Button({
  variant = 'filled',
  size = 'medium',
  color = 'slate',
  icon,
  iconPosition = 'left',
  children,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  const baseClasses = 'relative overflow-hidden flex items-center rounded-md text-center transition-all duration-500 opacity-0 animate-fadeIn disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';

  const typeClasses = {
    filled: 'shadow-md hover:shadow-lg focus:shadow-none active:shadow-none',
    gradient: 'bg-gradient-to-tr from-slate-800 to-slate-700 shadow-md hover:shadow-lg focus:shadow-none active:shadow-none',
    outlined: 'border shadow-sm hover:shadow-lg',
    text: '',
  }[variant] || '';

  const colorClasses = {
    blue: 'bg-blue-500 text-white focus:bg-blue-700 hover:bg-blue-700 active:bg-blue-700',
    red: 'bg-red-600 text-white focus:bg-red-700 hover:bg-red-700 active:bg-red-700',
    green: 'bg-green-600 text-white focus:bg-green-700 hover:bg-green-700 active:bg-green-700',
    amber: 'bg-amber-600 text-slate-800 focus:bg-amber-700 hover:bg-amber-700 active:bg-amber-700',
    slate: 'bg-slate-800 text-white focus:bg-slate-700 hover:bg-slate-700 active:bg-slate-700',
    gray: 'bg-gray-500 text-white focus:bg-gray-700 hover:bg-gray-700 active:bg-gray-700',
  }[color] || '';

  const sizeClasses = {
    xsmall: 'py-1 px-2.5 text-xs',
    small: 'py-1.5 px-3 text-sm',
    medium: 'py-2 px-4 text-sm',
    large: 'py-2.5 px-5 text-base',
    xlarge: 'py-3.5 px-6 text-base',
  }[size] || '';

  const handleAnimation = (e: MouseEvent<HTMLButtonElement>) => {
    const ripple = document.createElement('span');
    ripple.className = 'absolute bg-white rounded-full opacity-50';
    const size = `${Math.max(e.currentTarget.clientWidth, e.currentTarget.clientHeight) * 2}px`;
    ripple.style.width = size;
    ripple.style.height = size;
    ripple.style.left = `${e.clientX - e.currentTarget.offsetLeft - parseInt(size, 10) / 2}px`;
    ripple.style.top = `${e.clientY - e.currentTarget.offsetTop - parseInt(size, 10) / 2}px`;
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
    e.currentTarget.appendChild(ripple);

    setTimeout(() => {
      ripple.style.transform = 'scale(4)';
      ripple.style.opacity = '0';
    }, 0);

    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <button
      className={`${className ?? ''} font-medium ${baseClasses} ${typeClasses} ${colorClasses} ${sizeClasses}`}
      onClick={(e) => {
        handleAnimation(e);
        if (onClick) onClick(e);
      }}
      disabled={disabled}
      type="button"
    >
      {icon && iconPosition === 'left' && <span className="mr-1.5">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-1.5">{icon}</span>}
    </button>
  );
}
