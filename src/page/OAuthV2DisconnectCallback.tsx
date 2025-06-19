import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { oauthDisconnectV2 } from '@api/oauth-v2';
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
  const logout = useMeStore((state) => state.logout);
  const handleOAuthDisconnect = async () => {
    let parsedState: { destination: string } = {
      destination: '/me',
    };
    try {
      parsedState = state ? JSON.parse(state) : {
        destination: '/me',
      };
    } catch (error) {
      parsedState = {
        destination: '/me',
      };
    }
    const { destination } = parsedState;
    try {
      const response = await oauthDisconnectV2({ provider: provider || '', code: code || '' });

      if (response.errorCode === '0000') {
        const me = await fetchMe();
        if (me?.oauthList.length === 0) {
          await alert('회원 탈퇴되었습니다.');
          logout();
          navigate('/');
          return;
        }
        await alert('연동 해제되었습니다.');
        navigate(destination);
      } else {
        await alert('연동 해제에 실패했습니다. 다시 시도해주세요.');
        navigate('/me');
      }
    } catch (error) {
      await alert('연동 해제에 실패했습니다. 다시 시도해주세요.');
      navigate('/me');
    }
  };

  useEffect(() => {
    handleOAuthDisconnect();
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
