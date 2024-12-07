import React, { MouseEvent } from 'react';

interface ButtonProps {
  variant?: 'filled' | 'gradient' | 'outlined' | 'text';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'blue' | 'red' | 'green' | 'amber' | 'slate' | 'gray' | 'black' | 'yellow' | 'white';
  icon?: React.ReactNode;
  className?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ripple?: boolean;
}

const baseClasses = [
  'inline-flex',
  'align-middle',
  'select-none',
  'font-sans',
  'font-bold',
  'text-center',
  'uppercase',
  'transition-all',
  'rounded-lg',
  'focus:opacity-[0.85]',
  'focus:shadow-none',
  'active:opacity-[0.85]',
  'active:shadow-none',
  'disabled:opacity-50',
  'disabled:shadow-none',
  'disabled:pointer-events-none',
  'relative',
  'overflow-hidden',
  'items-center',
  'justify-center',
  'cursor-pointer',
  'whitespace-nowrap', // 줄바꿈 방지
].join(' ');

const variantColorClasses: Record<string, Record<string, string>> = {
  filled: {
    blue: 'bg-blue-500 text-white shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20',
    red: 'bg-red-600 text-white shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20',
    green: 'bg-green-600 text-white shadow-green-600/10 hover:shadow-lg hover:shadow-green-600/20',
    amber: 'bg-amber-600 text-white shadow-amber-600/10 hover:shadow-lg hover:shadow-amber-600/20',
    slate: 'bg-slate-800 text-white shadow-slate-800/10 hover:shadow-lg hover:shadow-slate-800/20',
    gray: 'bg-gray-600 text-white shadow-gray-600/10 hover:shadow-lg hover:shadow-gray-600/20',
    black: 'bg-black text-white shadow-black/10 hover:shadow-lg hover:shadow-black/20',
    yellow: 'bg-yellow-500 text-white shadow-yellow-500/10 hover:shadow-lg hover:shadow-yellow-500/20',
    white: 'bg-white text-black shadow-gray-300/10 hover:shadow-lg hover:shadow-gray-300/20',
  },
  gradient: {
    blue: 'bg-gradient-to-tr from-blue-600 to-blue-700 text-white shadow-blue-700/10 hover:shadow-lg hover:shadow-blue-700/20',
    red: 'bg-gradient-to-tr from-red-600 to-red-700 text-white shadow-red-700/10 hover:shadow-lg hover:shadow-red-700/20',
    green: 'bg-gradient-to-tr from-green-600 to-green-700 text-white shadow-green-700/10 hover:shadow-lg hover:shadow-green-700/20',
    amber: 'bg-gradient-to-tr from-amber-600 to-amber-700 text-white shadow-amber-700/10 hover:shadow-lg hover:shadow-amber-700/20',
    slate: 'bg-gradient-to-tr from-slate-800 to-slate-700 text-white shadow-slate-700/10 hover:shadow-lg hover:shadow-slate-700/20',
    gray: 'bg-gradient-to-tr from-gray-600 to-gray-700 text-white shadow-gray-700/10 hover:shadow-lg hover:shadow-gray-700/20',
    black: 'bg-gradient-to-tr from-black to-gray-800 text-white shadow-gray-800/10 hover:shadow-lg hover:shadow-gray-800/20',
    yellow: 'bg-gradient-to-tr from-yellow-500 to-yellow-600 text-white shadow-yellow-600/10 hover:shadow-lg hover:shadow-yellow-600/20',
    white: 'bg-gradient-to-tr from-white to-gray-200 text-black shadow-gray-300/10 hover:shadow-lg hover:shadow-gray-300/20',
  },
  outlined: {
    blue: 'border border-blue-500 text-blue-500 shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500 hover:text-white',
    red: 'border border-red-600 text-red-600 shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20 hover:bg-red-600 hover:text-white',
    green: 'border border-green-600 text-green-600 shadow-green-600/10 hover:shadow-lg hover:shadow-green-600/20 hover:bg-green-600 hover:text-white',
    amber: 'border border-amber-600 text-amber-600 shadow-amber-600/10 hover:shadow-lg hover:shadow-amber-600/20 hover:bg-amber-600 hover:text-white',
    slate: 'border border-slate-800 text-slate-800 shadow-slate-800/10 hover:shadow-lg hover:shadow-slate-800/20 hover:bg-slate-800 hover:text-white',
    gray: 'border border-gray-600 text-gray-600 shadow-gray-600/10 hover:shadow-lg hover:shadow-gray-600/20 hover:bg-gray-600 hover:text-white',
    black: 'border border-black text-black shadow-black/10 hover:shadow-lg hover:shadow-black/20 hover:bg-black hover:text-white',
    yellow: 'border border-yellow-500 text-yellow-500 shadow-yellow-500/10 hover:shadow-lg hover:shadow-yellow-500/20 hover:bg-yellow-500 hover:text-white',
    white: 'border border-white text-white shadow-gray-300/10 hover:shadow-lg hover:shadow-gray-300/20 hover:bg-white hover:text-black',
  },
  text: {
    blue: 'bg-transparent text-blue-500',
    red: 'bg-transparent text-red-600',
    green: 'bg-transparent text-green-600',
    amber: 'bg-transparent text-amber-600',
    slate: 'bg-transparent text-slate-800',
    gray: 'bg-transparent text-gray-600',
    black: 'bg-transparent text-black',
    yellow: 'bg-transparent text-yellow-500',
    white: 'bg-transparent text-white',
  },
};

const sizeClasses: Record<string, string> = {
  xsmall: 'py-1 px-2 text-xs',
  small: 'py-1.5 px-3 text-xs',
  medium: 'py-3 px-6 text-xs',
  large: 'py-3.5 px-7 text-xs',
  xlarge: 'py-4 px-8 text-xs',
};

export default function Button({
  variant = 'filled',
  size = 'medium',
  color = 'black',
  icon,
  iconPosition = 'left',
  children,
  onClick,
  onMouseLeave,
  disabled,
  className,
  ripple = false,
}: ButtonProps) {
  const handleAnimation = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ripple) return;

    const rippleEffect = document.createElement('span');
    rippleEffect.className = 'absolute bg-white rounded-full opacity-50';
    const maxSize = Math.max(e.currentTarget.clientWidth, e.currentTarget.clientHeight);
    const size = `${maxSize * 2}px`;
    rippleEffect.style.width = size;
    rippleEffect.style.height = size;
    rippleEffect.style.left = `${e.clientX - e.currentTarget.offsetLeft - maxSize}px`;
    rippleEffect.style.top = `${e.clientY - e.currentTarget.offsetTop - maxSize}px`;
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
      className={`${baseClasses} ${variantColorClasses[variant][color]} ${sizeClasses[size]} ${
        className ?? ''
      }`}
      onClick={(e) => {
        if (ripple) handleAnimation(e);
        if (onClick) onClick(e);
      }}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      type="button"
    >
      {icon && iconPosition === 'left' && <span className="mr-1.5">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-1.5">{icon}</span>}
    </button>
  );
}
