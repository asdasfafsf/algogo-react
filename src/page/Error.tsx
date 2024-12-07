import { useNavigate } from 'react-router-dom';

import { Button } from '@components/Button';
import { Typography } from '@components/common';

export default function Error() {
  const navigate = useNavigate();

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
              알 수 없는 오류
            </Typography>
            <Typography
              variant="medium"
              className="w-full mt-4 mb-6 text-blue-gray md:max-w-full lg:mb-12 lg:max-w-3xl"
            >
              처음부터 다시 시도해주세요!
            </Typography>

            <div className="flex items-center justify-center w-full gap-2">
              <Button onClick={() => navigate('/')}>홈</Button>
              <Button onClick={() => (navigate(-1))}>뒤로 가기</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
