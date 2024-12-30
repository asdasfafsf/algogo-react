import {
  InputHTMLAttributes, ReactNode, useId, useState,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
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
  className = '',
  icon,
  ...props
}: InputProps) {
  const randomId = useId();
  id = id ?? randomId;

  const randomName = useId();
  name = name ?? randomName;

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const isFilled = props.value !== undefined ? !!props.value : !!inputValue;

  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={name}
        className={`${className} block w-full px-3 py-3 text-xs text-gray-900 border border-gray-300 rounded-lg focus:border-black focus:outline-none focus:ring-0 peer text-center md:text-left ${className}`}
        placeholder=" "
        {...props}
        onChange={handleChange}
      />

      {label
      && (
      <label
        htmlFor={id}
        className={`absolute left-3 bg-white px-1 text-sm text-gray-500 duration-200 ${
          isFilled
            ? 'top-0 -translate-y-1/2 text-xs text-black'
            : 'top-1/2 -translate-y-1/2 peer-placeholder-shown:text-sm'
        } peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-black`}
      >
        {label}
      </label>
      )}
      {icon && (
        <span className="absolute z-10 -translate-y-1/2 pointer-events-none right-3 top-1/2">
          {icon}
        </span>
      )}
    </div>
  );
}
