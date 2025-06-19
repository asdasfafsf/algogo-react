import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { oauthLoginV2 } from '@api/oauth-v2';
import { useMeStore } from '@zustand/MeStore';
import useAlertModal from '../hook/useAlertModal';

export default function OAuthV2Callback() {
  const [alert] = useAlertModal();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');
  const code = params.get('code');
  const { provider } = useParams();
  const fetchMe = useMeStore((state) => state.fetchMe);

  const handleOAuthLogin = async () => {
    let parsedState: { destination: string } = {
      destination: '/',
    };
    try {
      parsedState = state ? JSON.parse(state) : {
        destination: '/',
      };
    } catch (error) {
      parsedState = {
        destination: '/',
      };
    }
    const { destination } = parsedState;
    try {
      const response = await oauthLoginV2({ provider: provider || '', code: code || '' });

      if (response.errorCode === '0000') {
        const { data } = response;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        await fetchMe();
        navigate(destination);
      } else {
        await alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate('/login');
      }
    } catch (error) {
      await alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/login');
    }
  };

  useEffect(() => {
    handleOAuthLogin();
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
