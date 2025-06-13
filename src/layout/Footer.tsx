import { Typography, LogoWithText } from '@components/common';

export default function Footer() {
  return (
    <footer className="px-8 py-8 border-t border-gray-200">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex items-center gap-24">
          <LogoWithText size="small" />

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
