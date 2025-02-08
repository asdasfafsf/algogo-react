import { Typography, Logo } from '@components/common';

export default function LandingFooter() {
  return (
    <footer className="bg-white">
      <div className="container max-w-screen-xl px-4 py-8 mx-auto">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo size="medium" />
              <Typography
                color="blue"
                className="font-WavvePADO-Regular"
                variant="h3"
              >
                알고고
              </Typography>
            </div>
            <p className="text-sm text-gray-600">
              더 나은 코딩 테스트 준비를 위한
              <br />
              당신의 코딩 파트너
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">제품</h4>
            <ul className="space-y-2 text-gray-600">

              <li><a href="/extension" className="hover:text-blue-600">확장 프로그램</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">지원</h4>
            <ul className="space-y-2 text-gray-600">
              {/* <li><a href="/docs" className="hover:text-blue-600">도움말</a></li> */}
              {/* <li><a href="/faq" className="hover:text-blue-600">자주 묻는 질문</a></li> */}
              <li><a href="/contact" className="hover:text-blue-600">문의하기</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">연락처</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>서울특별시 강남구 테헤란로</li>
              <li>이메일: support@algogo.kr</li>
              <li>전화: 02-123-4567</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container max-w-screen-xl px-4 py-8 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <a href="/terms" className="hover:text-blue-600">이용약관</a>
              <span className="text-gray-300">|</span>
              <a href="/privacy" className="hover:text-blue-600">개인정보처리방침</a>
              <span className="text-gray-300">|</span>
              <a href="/service-policy" className="hover:text-blue-600">서비스 운영정책</a>
            </div>
            <p className="text-sm text-center text-gray-600">
              ©
              {' '}
              {new Date().getFullYear()}
              {' '}
              AlgoGo Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
