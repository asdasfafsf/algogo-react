import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button';
import { Typography } from '@components/common';
import { useState, useEffect } from 'react';
import useAlertModal from '@hook/useAlertModal';

export default function Error() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alert] = useAlertModal();

  // message 상태 선언
  const [message, setMessage] = useState('알 수 없는 오류');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialMessage = searchParams.get('message') || '알 수 없는 오류';
    setMessage(initialMessage); // 초기값 설정
  }, [location.search]);

  useEffect(() => {
    alert(message);
  }, [message]);

  return (
    <section>
      <div className="relative w-full min-h-screen">
        <div className="grid min-h-screen px-8">
          <div className="container relative z-10 grid mx-auto my-auto text-center place-items-center">
            <img
              src="error.png"
              height={60}
              width={60}
              alt="material-logo"
            />
            <Typography
              variant="h1"
              className="text-blue-gray mt-7 text-4xl !leading-snug lg:text-4xl"
            >
              오류
            </Typography>
            <Typography
              variant="paragraph"
              className="w-full mt-4 mb-6 text-blue-gray md:max-w-full lg:mb-12 lg:max-w-3xl"
            >
              {message}
            </Typography>

            <div className="flex items-center justify-center w-full gap-2">
              <Button className="w-1/2 h-10 max-w-32" onClick={() => navigate('/')}>홈</Button>
              <Button className="w-1/2 h-10 max-w-32" onClick={() => (navigate(-1))}>뒤로 가기</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
