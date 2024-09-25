import { Typography } from '@material-tailwind/react';

export default function Footer() {
  return (
    <footer className="px-8 py-8">
      <div className="container mx-auto">
        <div className="flex items-center gap-24">
          <Typography
            className="relative top-1 font-WavvePADO-Regular"
            variant="h3"
          >
            <a href="/">
              알고고
            </a>
          </Typography>

          <div>
            <div className="flex items-center gap-4">
              <Typography
                variant="small"
              >
                이용안내
              </Typography>
              <Typography
                variant="small"
              >
                개인정보 처리방침
              </Typography>
            </div>
            <div className="mt-2">
              <Typography
                variant="small"
              >
                주소: 서울특별시 **구 **로 *** ***
              </Typography>
              <Typography
                variant="small"
              >
                문의 : *********@algogo.co.kr
              </Typography>
            </div>
            <div className="mt-6">
              <Typography
                variant="small"
              >
                CopyRight 2024 AlgoGo Co. all right reserved.
              </Typography>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
