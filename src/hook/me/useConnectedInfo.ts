import useMeStore from '@zustand/MeStore';
import { useCallback } from 'react';

export default function useConnectedInfo() {
  const me = useMeStore((state) => state.me);
  const handleConnect = useCallback(async () => {}, []);
  const handleDisconnect = useCallback(async () => {}, []);

  return {
    me,
    handleConnect,
    handleDisconnect,
  };
}
