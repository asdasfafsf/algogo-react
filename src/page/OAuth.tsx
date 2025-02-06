import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlertModal from '../hook/useAlertModal';
import { useMeStore } from '../zustand/MeStore';

export default function OAuth() {
  const [alert] = useAlertModal();
  const navigate = useNavigate();
  const { fetchToken, fetchMe } = useMeStore((state) => state);
  const params = new URLSearchParams(window.location.search);
  const destination = params.get('destination') || '';

  useEffect(() => {
    const handleTokens = async () => {
      try {
        await fetchToken();
        await fetchMe();
        navigate(destination || '/');
      } catch (e) {
        await alert('토큰 발급 중 오류가 발생했습니다. 처음부터 다시 시도해주세요!');
        navigate('/login');
      }
    };

    handleTokens();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-t-4 border-gray-200 border-solid rounded-full animate-spin" />
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
}
