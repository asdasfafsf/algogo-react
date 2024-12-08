import { Typography } from '@components/common';

export default function Footer() {
  return (
    <footer className="px-8 py-8">
      <div className="container max-w-screen-xl mx-auto">
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

                weight="extralight"
                variant="medium"
              >
                이용안내
              </Typography>
              <Typography

                weight="extralight"
                variant="medium"
              >
                개인정보 처리방침
              </Typography>
            </div>
            <div className="mt-2">
              <Typography

                weight="extralight"
                variant="medium"
              >
                주소: 서울특별시 **구 **로 *** ***
              </Typography>
              <Typography
                weight="extralight"
                variant="medium"
              >
                문의 : *********@algogo.co.kr
              </Typography>
            </div>
            <div className="mt-6">
              <Typography

                weight="extralight"
                variant="medium"
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
