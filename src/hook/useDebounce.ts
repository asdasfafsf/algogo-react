import { useState, useEffect } from 'react';

/**
 * useDebounce 훅
 * @param {T} value - 디바운스할 값
 * @param {number} delay - 지연 시간 (밀리초)
 * @returns 디바운스된 값
 */
export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
