import React from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'rounded' | 'square';
  borderColor?: 'blue' | 'red' | 'green' | 'amber' | 'slate' | 'gray' | 'white' | 'black' | 'none';
  withBorder?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const sizeClasses: Record<string, string> = {
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-12 h-12',
};

const borderClasses: Record<string, string> = {
  blue: 'border border-blue-600',
  red: 'border border-red-600',
  green: 'border border-green-600',
  amber: 'border border-amber-600',
  slate: 'border border-slate-600',
  gray: 'border border-gray-600',
  white: 'border border-white',
  black: 'border border-black',
  none: 'border-none',
};

const variantClasses: Record<string, string> = {
  circular: 'rounded-full',
  rounded: 'rounded-md',
  square: 'rounded-none',
};

export default function Avatar({
  src,
  alt = 'avatar',
  size = 'medium',
  variant = 'circular',
  borderColor = 'none',
  withBorder = false,
  className = '',
  onClick,
}: AvatarProps) {
  const baseClasses = `
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${withBorder && borderColor !== 'none' ? borderClasses[borderColor] : ''}
    overflow-hidden object-cover object-center transition-all
  `;

  const finalClass = baseClasses.replace(/\s+/g, ' ').trim();

  return (
    <div
      className={`${finalClass} ${className}`}
      onClick={onClick}
    >
      <img src={src} alt={alt} className="w-full h-full" />
    </div>
  );
}
