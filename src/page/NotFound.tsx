import { useNavigate } from 'react-router-dom';
import { Typography } from '@components/common';
import { Button } from '@components/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center w-screen h-screen">
      <div className="relative w-full min-h-screen">
        <div className="grid min-h-screen px-8">
          <div className="container relative z-10 grid mx-auto my-auto text-center place-items-center">
            <Typography
              variant="h1"
              className="text-5xl leading-snug! lg:text-6xl"
            >
              404 😢
            </Typography>
            <Typography
              variant="h1"
              className="mt-6 text-4xl leading-snug! lg:text-4xl"
            >
              페이지를 찾을 수 없습니다
            </Typography>
            <Typography
              variant="medium"
              className="w-full mt-4 mb-6 md:max-w-full lg:mb-12 lg:max-w-3xl"
            >
              어떤가요? 새로운 디지털 세계에 놀러오셨군요. 찾고 계신 페이지는 아쉽게도 찾지 못했네요. 함께 익숙한 길로 안내해 드릴게요!
            </Typography>
            <Button
              onClick={() => navigate(-1)}
              color="gray"
              className="px-4 md:w-36"
            >
              뒤로가기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
