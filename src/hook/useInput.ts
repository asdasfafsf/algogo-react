import { useCallback, useState, ChangeEvent } from 'react';

type UseInputReturnType = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>,
];

export default function useInput(): UseInputReturnType {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return [value, handleChange];
}
