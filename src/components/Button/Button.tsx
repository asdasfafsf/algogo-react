import React, { MouseEvent } from 'react';

interface ButtonProps {
  variant?: 'filled' | 'gradient' | 'outlined' | 'text';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'blue' | 'red' | 'green' | 'amber' | 'slate' | 'gray' | 'black';
  icon?: React.ReactNode;
  className?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  ripple?: boolean;
}

const variantColorClasses: Record<string, Record<string, string>> = {
  filled: {
    blue: 'bg-blue-500 text-white hover:bg-white hover:text-blue-500',
    red: 'bg-red-600 text-white hover:bg-white hover:text-red-600',
    green: 'bg-green-600 text-white hover:bg-white hover:text-green-600',
    amber: 'bg-amber-600 text-white hover:bg-white hover:text-amber-600',
    slate: 'bg-slate-800 text-white hover:bg-white hover:text-slate-800',
    gray: 'bg-gray-600 text-white hover:bg-white hover:text-gray-600',
    black: 'bg-black text-white hover:bg-white hover:text-black',
  },
  gradient: {
    blue: 'bg-gradient-to-tr from-blue-600 to-blue-700 text-white hover:from-white hover:to-white hover:text-blue-600',
    red: 'bg-gradient-to-tr from-red-600 to-red-700 text-white hover:from-white hover:to-white hover:text-red-600',
    green: 'bg-gradient-to-tr from-green-600 to-green-700 text-white hover:from-white hover:to-white hover:text-green-600',
    amber: 'bg-gradient-to-tr from-amber-600 to-amber-700 text-white hover:from-white hover:to-white hover:text-amber-600',
    slate: 'bg-gradient-to-tr from-slate-800 to-slate-700 text-white hover:from-white hover:to-white hover:text-slate-800',
    gray: 'bg-gradient-to-tr from-gray-600 to-gray-700 text-white hover:from-white hover:to-white hover:text-gray-600',
    black: 'bg-gradient-to-tr from-black to-gray-800 text-white hover:from-white hover:to-white hover:text-black',
  },
  outlined: {
    blue: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    red: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    green: 'border border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
    amber: 'border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white',
    slate: 'border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white',
    gray: 'border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
    black: 'border border-black text-black hover:bg-black hover:text-white',
  },
  text: {
    blue: 'bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white',
    red: 'bg-transparent text-red-600 hover:bg-red-600 hover:text-white',
    green: 'bg-transparent text-green-600 hover:bg-green-600 hover:text-white',
    amber: 'bg-transparent text-amber-600 hover:bg-amber-600 hover:text-white',
    slate: 'bg-transparent text-slate-800 hover:bg-slate-800 hover:text-white',
    gray: 'bg-transparent text-gray-600 hover:bg-gray-600 hover:text-white',
    black: 'bg-transparent text-black hover:bg-black hover:text-white',
  },
};

const sizeClasses: Record<string, string> = {
  xsmall: 'py-1 px-2.5 text-xs',
  small: 'py-1.5 px-3 text-sm',
  medium: 'py-2 px-4 text-sm',
  large: 'py-2.5 px-5 text-base',
  xlarge: 'py-3.5 px-6 text-base',
};
export default function Button({
  variant = 'filled',
  size = 'medium',
  color = 'black',
  icon,
  iconPosition = 'left',
  children,
  onClick,
  disabled,
  className,
  ripple = false,
}: ButtonProps) {
  const handleAnimation = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ripple) return;

    const rippleEffect = document.createElement('span');
    rippleEffect.className = 'absolute bg-white rounded-full opacity-50';
    const size = `${Math.max(e.currentTarget.clientWidth, e.currentTarget.clientHeight) * 2}px`;
    rippleEffect.style.width = size;
    rippleEffect.style.height = size;
    rippleEffect.style.left = `${e.clientX - e.currentTarget.offsetLeft - parseInt(size, 10) / 2}px`;
    rippleEffect.style.top = `${e.clientY - e.currentTarget.offsetTop - parseInt(size, 10) / 2}px`;
    rippleEffect.style.transform = 'scale(0)';
    rippleEffect.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
    e.currentTarget.appendChild(rippleEffect);

    setTimeout(() => {
      rippleEffect.style.transform = 'scale(4)';
      rippleEffect.style.opacity = '0';
    }, 0);

    setTimeout(() => rippleEffect.remove(), 600);
  };

  return (
    <button
      className={`${className ?? ''} text-xs relative overflow-hidden flex items-center rounded-md text-center transition-all duration-500 opacity-0 animate-fadeIn disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${variantColorClasses[variant][color]} ${sizeClasses[size]}`}
      onClick={(e) => {
        if (ripple) handleAnimation(e);
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
