import React from 'react';

type CheckboxColor = 'blue' | 'indigo' | 'red' | 'amber' | 'green' | 'teal' | 'purple' | 'pink' | 'gray';

interface CheckboxProps {
  className?: string;
  color?: CheckboxColor;
  checked: boolean;
  disabled?: boolean;
  label?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
}

export default function Checkbox({
  className = '',
  checked,
  color = 'blue',
  disabled = false,
  label,
  onChange,
  ...props
}: CheckboxProps) {
  const checkboxId = React.useId();

  const colorClasses = {
    blue: 'checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500',
    indigo: 'checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500',
    red: 'checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500',
    amber: 'checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500',
    green: 'checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500',
    teal: 'checked:border-teal-500 checked:bg-teal-500 checked:before:bg-teal-500',
    purple: 'checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500',
    pink: 'checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500',
    gray: 'checked:border-gray-500 checked:bg-gray-500 checked:before:bg-gray-500',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e);
  };

  return (
    <div className="inline-flex items-center">
      <label
        className={`relative flex items-center p-1 rounded-full cursor-pointer ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        htmlFor={checkboxId}
      >
        <input
          type="checkbox"
          className={`before:content[""] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 ${
            disabled ? 'cursor-not-allowed' : ''
          } ${colorClasses[color]} ${className}`}
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={label}
          {...props}
        />
        <span
          className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>
      {label && (
        <span className={`ml-2 ${disabled ? 'opacity-50' : ''}`}>{label}</span>
      )}
    </div>
  );
}
