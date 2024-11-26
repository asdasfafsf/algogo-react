// src/components/Input.tsx
import { InputHTMLAttributes, ReactNode, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  id?: string;
  name?: string;
  icon?: ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  label,
  type = 'text',
  id,
  name,
  value,
  className = '',
  onChange,
  icon,
  ...props
}: InputProps) {
  const randomId = useId();
  id = id ?? randomId;

  const randomName = useId();
  name = name ?? randomName;

  return (
    <div className="relative w-full md:max-w-fit">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${className} block w-full md:w-72 px-3 py-3 text-xs text-gray-900 border border-gray-300 rounded-lg focus:border-black focus:outline-none focus:ring-0 peer ${
          icon ? 'pr-10' : ''
        } text-center md:text-left`}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-white px-1 text-sm text-gray-500 duration-200
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm
          peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-black`}
      >
        {label}
      </label>
      {icon && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {icon}
        </span>
      )}
    </div>
  );
}
