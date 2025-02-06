import { useState } from 'react';

const variants = {
  static: 'border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5',
  standard: 'border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5',
  outlined:
    'rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5',
};

const sizes = {
  medium: 'min-h-[100px] text-sm',
  large: 'min-h-[150px] text-base',
};

const colors = {
  gray: 'focus:border-gray-900 focus:text-gray-900',
  purple: 'focus:border-purple-500 focus:text-purple-500',
  red: 'focus:border-red-500 focus:text-red-500',
  green: 'focus:border-green-500 focus:text-green-500',
};

interface TextAreaProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  label?: string;
  disabled?: boolean;
  className?: string;
  [key: string]: unknown;
}

export default function Textarea({
  variant = 'outlined',
  size = 'medium',
  color = 'gray',
  label = '',
  disabled = false,
  className = '',
  ...props
}: TextAreaProps) {
  const [value, setValue] = useState('');
  const hasValue = value.length > 0;

  const variantClass = variants[variant];
  const sizeClass = sizes[size];
  const colorClass = colors[color];

  return (
    <div className="relative w-full min-w-[200px]">
      <textarea
        className={`peer h-full w-full resize-none ${variantClass} ${sizeClass} font-normal text-blue-gray-700 outline-none transition-all disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 ${
          disabled ? 'cursor-not-allowed' : ''
        } ${colorClass} ${className}`}
        placeholder=" "
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      {hasValue && (
        <label
          className={`pointer-events-none absolute left-0 ${
            variant === 'static' ? '-top-2.5' : '-top-1.5'
          } flex h-full w-full select-none ${
            size === 'medium' ? 'text-[11px]' : 'text-sm'
          } font-normal leading-tight text-blue-gray-400 transition-all ${
            disabled ? 'text-transparent' : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
