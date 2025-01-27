import { useCallback, useState, ChangeEvent } from 'react';

export default function useInput() {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return { value, handleChange, setValue };
}
