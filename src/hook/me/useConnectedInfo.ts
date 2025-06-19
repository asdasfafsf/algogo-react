import useMeStore from '@zustand/MeStore';
import { useCallback } from 'react';
import useConfirmModal from '@hook/useConfirmModal';

export default function useConnectedInfo() {
  const { VITE_ENV } = import.meta.env;
  const baseUrl = VITE_ENV === 'development'
    ? 'http://localhost:3001/oauth/v2'
    : 'https://www.algogo.co.kr/oauth/v2';
  const me = useMeStore((state) => state.me);
  const [confirm] = useConfirmModal();
  const handleConnect = useCallback(async (_: unknown, provider: OAuthProvider) => {
    if (!me) {
      return;
    }

    const isOk = (await confirm('연동하시겠습니까?'));

    if (!isOk) {
      return;
    }

    window.location.href = `${baseUrl}/connect/${provider}?destination=/me`;
  }, [me]);
  const handleDisconnect = useCallback(async (_:unknown, provider: OAuthProvider) => {
    const oauthList = me?.oauthList ?? [];
    const message = oauthList.length === 1
      ? '연동 정보가 1개입니다. 연동 취소하면 회원 탈퇴됩니다. 진행하시겠습니까?'
      : '연동 취소하시겠습니까?';
    const isOk = await confirm(message);

    if (!isOk) {
      return;
    }

    window.location.href = `${baseUrl}/disconnect/${provider}?destination=/me`;
  }, [me]);

  return {
    me,
    handleConnect,
    handleDisconnect,
  };
}
