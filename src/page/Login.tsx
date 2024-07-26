import {
  Typography, Button,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleOAuth = async (e, provider: 'google' | 'kakao' | 'github') => {
    const url = `http://localhost:3001/oauth/${provider}`;
    window.location.href = url;
  };
  return (
    <section className="grid items-center h-screen p-8">
      <div className="text-center">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          로그인
        </Typography>
        {/* <Typography color="gray" className="mb-12 font-normal" /> */}
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <Button
            color="white"
            size="lg"
            className="flex items-center justify-center h-12 gap-2 mt-4"
            onClick={(e) => handleOAuth(e, 'google')}
            fullWidth
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
            color="yellow"
            size="lg"
            className="flex items-center justify-center h-12 gap-2 mt-4"
            fullWidth
            onClick={(e) => handleOAuth(e, 'kakao')}
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
            size="lg"
            className="flex items-center justify-center h-12 gap-2 mt-4"
            fullWidth
            onClick={(e) => handleOAuth(e, 'github')}
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
            className="mt-6 font-normal text-center"
          >
            회원이 아니신가요?
            {' '}
            <a href="/signup" className="font-medium text-gray-900">
              회원가입
            </a>
          </Typography>
          <div className="flex items-center w-full gap-2 my-6">
            <hr className="w-full bg-blue-gray-50" />
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium opacity-50"
            >
              OR
            </Typography>
            <hr className="w-full bg-blue-gray-50" />
          </div>
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
