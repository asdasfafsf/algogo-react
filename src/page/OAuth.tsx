import { useEffect } from 'react';
import useAlertModal from '../hook/useAlertModal';

export default function OAuth() {
  const [alert] = useAlertModal();
  useEffect(() => {
    const handleTokens = async () => {
      console.log('d');
      try {
        console.log('여기서 왜 아무일도 안일어나?');
        const tokenResponse = await (fetch('http://localhost:3001/api/v1/auth/token', {
          credentials: 'include',
        }));
        console.log('데이터를 가져왔습니다.');
        const tokens = await tokenResponse.json();
        console.log(tokens);
        await alert('로그인 성공');
      } catch (e) {
        await alert('토큰 발급 중 오류가 발생했습니다. 처음부터 다시 시도해주세요!');
      }
    };

    handleTokens();
  }, []);
  return <div>로딩중이에용~</div>;
}
