import { useCallback } from 'react';

export default function useSubmit() {
  const handleSubmit = useCallback(async () => {
    const uuid = location.pathname.split('/')[2];
  }, []);

  return { handleSubmit };
}
