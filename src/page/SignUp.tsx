import {
  Typography, Button,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <section className="grid items-center h-screen p-8">
      <div className="text-center">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          회원가입
        </Typography>
        {/* <Typography color="gray" className="mb-12 font-normal" /> */}
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <Button
            color="white"
            size="lg"
            className="flex items-center justify-center h-12 gap-2 mt-4"
            fullWidth
          >
            <img
              src="https://www.material-tailwind.com/logos/logo-google.png"
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
          >
            <img
              src="kakao_icon.png"
              alt="kakao"
              className="w-5 h-5"
            />
            카카오로 시작하기
          </Button>
          <Typography
            color="gray"
            className="mt-6 font-normal text-center"
          >
            이미 회원이신가요?
            {' '}
            <a href="/login" className="font-medium text-gray-900">
              로그인
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
