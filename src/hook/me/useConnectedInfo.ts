import useMeStore from '@zustand/MeStore';
import { useCallback } from 'react';
import useAlertModal from '@hook/useAlertModal';
import useConfirmModal from '@hook/useConfirmModal';
import { setOAuthCookie } from '@api/oauth';

const { VITE_ENV } = import.meta.env;

export default function useConnectedInfo() {
  const me = useMeStore((state) => state.me);
  const [alert] = useAlertModal();
  const [confirm] = useConfirmModal();
  const handleConnect = useCallback(async (_: unknown, provider: OAuthProvider) => {
    if (!me) {
      return;
    }

    const cookieResponse = await setOAuthCookie();

    if (cookieResponse.statusCode !== 200) {
      await alert('인증 요청 중 오류가 발생하였습니다. 다시 시도해주세요');
      return;
    }

    const { oauthList } = me;

    if (oauthList?.find((elem) => elem.provider === provider)) {
      await alert('이미 연동된 계정입니다. 연동 해제 후 이용하시거나 로그아웃 후 신규 가입으로 진행해주세요.');
      return;
    }
    const url = VITE_ENV === 'development'
      ? `http://localhost:3001/v1/oauth/${provider}/connect`
      : `https://www.algogo.co.kr/v1/oauth/${provider}/connect`;

    window.location.href = `${url}`;
  }, [me]);
  const handleDisconnect = useCallback(async () => {
    const oauthList = me?.oauthList ?? [];

    if (oauthList.length === 1) {
      const isOk = await confirm('연동 정보가 1개입니다. 연동 취소하면 회원 탈퇴됩니다. 진행하시겠습니까?');

      if (!isOk) {
        return;
      }

      console.log('');
    }
  }, [me]);

  return {
    me,
    handleConnect,
    handleDisconnect,
  };
}
