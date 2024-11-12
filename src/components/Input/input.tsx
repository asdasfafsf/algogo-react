// src/components/Input.tsx
import React, { InputHTMLAttributes, ReactNode, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  id?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  type = 'text',
  id = useId(),
  name,
  value,
  className = '',
  onChange,
  icon,
  ...props
}: InputProps) {
  return (
    <div className="relative mt-4">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${className} block px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded focus:border-black focus:outline-none focus:ring-0 peer ${
          icon ? 'pr-10' : ''
        }`}
        placeholder=" "
        {...props}
      />
      {icon && (
        <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
          {icon}
        </div>
      )}
      <label
        htmlFor={id}
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-white px-1 text-sm text-gray-500 duration-200
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm
          peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-black`}
      >
        {label}
      </label>
    </div>
  );
}
