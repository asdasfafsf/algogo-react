import { useNavigate } from 'react-router-dom';
import { Typography } from '@components/common';
import { Button } from '@components/Button';

const { VITE_ENV } = import.meta.env;

interface LoginProps {
  name?: '로그인' | '회원가입'
}

export default function Login({ name = '로그인' }: LoginProps) {
  const navigate = useNavigate();
  const handleOAuth = async (_e: React.MouseEvent<HTMLButtonElement>, provider: 'google' | 'kakao' | 'github') => {
    const url = VITE_ENV === 'development'
      ? `http://localhost:3001/v1/oauth/${provider}`
      : `https://www.algogo.co.kr/v1/oauth${provider}`;

    const redirectUrl = VITE_ENV === 'development'
      ? 'http://localhost:3001/oauth/token'
      : 'https://www.algogo.co.kr/oauth/token';

    window.location.href = url;
  };
  return (
    <section className="grid items-center h-screen p-8">
      <div className="text-center">
        <Typography variant="h3" className="mb-2">
          {name}
        </Typography>
        {/* <Typography color="gray" className="mb-12 font-normal" /> */}
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <Button
            color="white"
            size="large"
            className="flex items-center justify-center w-full h-12 gap-2 mt-4 text-black"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOAuth(e, 'google')}
          >
            <img
              src="google-mark.png"
              alt="google"
              className="w-6 h-6"
            />
            {' '}
            구글로 시작하기
          </Button>
          <Button
            size="large"
            className="!bg-kakao flex items-center justify-center w-full h-12 gap-2 mt-4 !text-black"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOAuth(e, 'kakao')}
          >
            <img
              src="kakao_icon.png"
              alt="kakao"
              className="w-5 h-5"
            />
            카카오로 시작하기
          </Button>
          <Button
            color="white"
            size="large"
            className="flex items-center justify-center w-full h-12 gap-2 mt-4"
            onClick={(_e: React.MouseEvent<HTMLButtonElement>) => handleOAuth(_e, 'github')}
          >
            <img
              src="github-mark.png"
              alt="github"
              className="w-5 h-5"
            />
            깃허브로 시작하기
          </Button>
          <Typography
            color="gray"
            variant="medium"
            className="mt-6 font-normal text-center"
          >
            {name === '로그인' ? '회원이 아니신가요?' : '회원이신가요?'}
            {' '}
            <a href={name === '로그인' ? '/signup' : '/login'} className="font-medium text-gray-900">
              {name === '로그인' ? '회원가입' : '로그인'}
            </a>
          </Typography>
          <div className="flex items-center w-full gap-2 my-6">
            <hr className="w-full bg-blue-gray-50" />
            <Typography
              variant="small"
              className="font-medium opacity-50 text-blue-gray"
            >
              OR
            </Typography>
            <hr className="w-full bg-blue-gray-50" />
          </div>
          <Button
            onClick={() => navigate('/')}
            color="white"
            className="w-full mb-2"
          >
            처음으로
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="w-full"
          >
            이전으로
          </Button>
        </form>

      </div>
    </section>
  );
}
