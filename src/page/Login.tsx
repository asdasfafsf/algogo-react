import {
  Typography, Button,
} from '@material-tailwind/react';

export default function Login() {
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
            color="white"
            size="lg"
            className="flex items-center justify-center h-12 gap-2 mt-4"
            fullWidth
          >
            <img
              src="https://www.material-tailwind.com/logos/Twitter 2 - Official.png"
              alt="google"
              className="w-6 h-6"
            />
            {' '}
            카카오로 시작하기
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
        </form>
      </div>
    </section>
  );
}
