// Input.tsx
import React, { useId, useState, useEffect } from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  className?: string;
  required?: boolean;
  error?: string;
}

const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
  small: 'px-3 py-1.5 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-5 py-3 text-lg',
};

export default function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  size = 'medium',
  label,
  className = '',
  required = false,
  error,
}: InputProps) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  // Determine if the input has a value
  const hasValue = value && value.length > 0;

  // Handle focus and blur events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`w-full max-w-sm min-w-[200px] ${className}`}>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=" " // A single space to enable :placeholder-shown
          className={`
            block w-full bg-transparent border rounded-md transition 
            duration-300 ease-in-out
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isFocused || hasValue ? 'border-blue-500' : ''}
            ${sizeClasses[size]}
            peer
          `}
          aria-label={label ?? undefined}
          aria-invalid={!!error}
          required={required}
        />
        {label && (
          <label
            htmlFor={id}
            className={`
              absolute left-4 top-1/2 transform -translate-y-1/2 
              text-gray-500 text-sm bg-white px-1 transition 
              duration-200 ease-in-out
              pointer-events-none
              ${isFocused || hasValue
              ? 'top-0 left-4 text-xs text-blue-500'
              : 'left-4 top-1/2 text-sm text-gray-500'
              }
            `}
          >
            {label}
            {required && ' *'}
          </label>
        )}
        {error && (
          <span className="absolute mt-1 text-sm text-red-500 top-full left-4">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
