export default function LandingFooter() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600">AlgoGo</h3>
            <p className="text-gray-600 text-sm">
              더 나은 코딩 테스트 준비를 위한
              <br />
              당신의 코딩 파트너
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">제품</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/features" className="hover:text-blue-600">기능 소개</a></li>
              <li><a href="/pricing" className="hover:text-blue-600">요금제</a></li>
              <li><a href="/extension" className="hover:text-blue-600">크롬 확장 프로그램</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">지원</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/docs" className="hover:text-blue-600">도움말</a></li>
              <li><a href="/faq" className="hover:text-blue-600">자주 묻는 질문</a></li>
              <li><a href="/contact" className="hover:text-blue-600">문의하기</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">연락처</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>서울특별시 강남구 테헤란로</li>
              <li>이메일: support@algogo.kr</li>
              <li>전화: 02-123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-gray-600 text-sm">
          <p>
            ©
            {new Date().getFullYear()}
            {' '}
            AlgoGo Corp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
