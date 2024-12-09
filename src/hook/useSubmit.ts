import { useCallback } from 'react';
import useAlertModal from './useAlertModal';

export default function useSubmit() {
  const [alert] = useAlertModal();
  const handleSubmit = useCallback(async () => {
    alert('준비중입니다.');
  }, []);

  return { handleSubmit };
}
