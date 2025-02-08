import {
  CodeBracketIcon, PuzzlePieceIcon, BoltIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import useAlertModal from '@hook/useAlertModal';
import { LandingFooter, LandingHeader } from '@layout/landing';
import { FadeInSection } from '@components/common/FadeInSection';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 text-center transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl">
      <div className="flex justify-center mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [alert] = useAlertModal();

  return (
    <>
      <LandingHeader />
      <main className="pt-16">
        <div className="container max-w-screen-xl px-4 mx-auto">
          {/* Hero Section */}
          <FadeInSection className="min-h-[70vh] flex flex-col justify-center items-center text-center py-16">
            <h1 className="mb-6 text-5xl font-bold">
              알고고와 함께라면
              <br />
              코테 준비가 더 쉬워져요
            </h1>
            <p className="max-w-2xl mb-8 text-xl text-gray-600">
              컴파일러 없는 알고리즘 사이트도 걱정 마세요!
              <br />
              알고고가 실시간 테스트부터 제출까지 도와드릴게요 ✨
            </p>
            <div className="space-x-4">
              <Button color="blue" onClick={() => navigate('/signup')}>
                지금 시작하기
              </Button>
              <Button onClick={async () => alert('현재 준비중입니다')}>
                크롬 확장 프로그램 받기
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection className="py-32">
            <h2 className="mb-12 text-4xl font-bold text-center">
              알고고는 이런 게 특별해요
            </h2>
            <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              <FeatureCard
                icon={<CodeBracketIcon className="w-12 h-12" />}
                title="실시간 코드 실행"
                description="컴파일러가 없어도 괜찮아요. 알고고에서 바로바로 테스트해보세요!"
              />
              <FeatureCard
                icon={<PuzzlePieceIcon className="w-12 h-12" />}
                title="간편한 제출"
                description="크롬 확장 프로그램으로 클릭 한 번이면 제출 끝! 더 이상 복붙하지 마세요"
              />
              <FeatureCard
                icon={<BoltIcon className="w-12 h-12" />}
                title="빠른 실행 속도"
                description="기다림 없이 빠르게! 최적화된 환경에서 코드를 실행해보세요"
              />
            </div>
          </FadeInSection>

          <FadeInSection className="py-32">
            <h2 className="mb-12 text-4xl font-bold text-center">
              이런 곳에서 사용할 수 있어요
            </h2>
            <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              <div className="p-6 text-center transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white bg-blue-600 rounded-full">
                  BOJ
                </div>
                <h3 className="mb-3 text-xl font-semibold">백준</h3>
                <p className="text-gray-600">
                  모든 문제 유형 지원
                  <br />
                  실시간 테스트 케이스 실행
                </p>
              </div>
              <div className="p-6 text-center transition-shadow bg-white shadow-lg opacity-50 rounded-xl hover:shadow-xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white bg-gray-400 rounded-full">
                  ?
                </div>
                <h3 className="mb-3 text-xl font-semibold">Coming Soon</h3>
                <p className="text-gray-600">
                  더 많은 코딩테스트 플랫폼을
                  <br />
                  지원할 예정이에요
                </p>
              </div>
              <div className="p-6 text-center transition-shadow bg-white shadow-lg opacity-50 rounded-xl hover:shadow-xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white bg-gray-400 rounded-full">
                  ?
                </div>
                <h3 className="mb-3 text-xl font-semibold">Coming Soon</h3>
                <p className="text-gray-600">
                  더 많은 코딩테스트 플랫폼을
                  <br />
                  지원할 예정이에요
                </p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection className="py-32">
            <h2 className="mb-12 text-4xl font-bold text-center">
              이렇게 시작하세요
            </h2>
            <div className="grid max-w-6xl grid-cols-1 gap-12 mx-auto md:grid-cols-3">
              <div className="relative">
                <div className="absolute flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-blue-600 rounded-full -left-4 -top-4">
                  1
                </div>
                <div className="h-full p-6 text-center bg-white shadow-lg rounded-xl">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">간편 가입</h3>
                  <p className="text-gray-600">
                    구글 계정으로
                    <br />
                    1초 만에 시작하세요
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-blue-600 rounded-full -left-4 -top-4">
                  2
                </div>
                <div className="h-full p-6 text-center bg-white shadow-lg rounded-xl">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">코딩 시작</h3>
                  <p className="text-gray-600">
                    백준 문제 페이지에서
                    <br />
                    바로 테스트해보세요
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-blue-600 rounded-full -left-4 -top-4">
                  3
                </div>
                <div className="h-full p-6 text-center bg-white shadow-lg rounded-xl">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">확장 프로그램 설치</h3>
                  <p className="text-gray-600">
                    클릭 한 번으로
                    <br />
                    제출까지 한번에
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Final CTA Section */}
          <FadeInSection className="relative py-40">
            <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center">
              <h2 className="text-4xl font-bold">
                지금 바로 시작해보세요
              </h2>
              <p className="text-xl text-gray-600">
                알고고와 함께라면 코딩테스트 준비가 더 쉬워질 거예요
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  color="blue"
                  size="large"
                  onClick={() => navigate('/signup')}
                >
                  무료로 시작하기
                </Button>
                {/* <Button
                  size="large"
                  onClick={() => navigate('/demo')}
                >
                  체험해보기
                </Button> */}
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bottom-0 overflow-hidden bg-white -z-10">
              {/* Main circles */}
              <div className="absolute rounded-full -right-1/4 -top-1/4 w-96 h-96 bg-blue-100/50 animate-pulse" />
              <div className="absolute rounded-full -left-1/4 -bottom-1/4 w-96 h-96 bg-blue-100/50 animate-pulse" />

              {/* Additional decorative elements */}
              <div className="absolute w-48 h-48 rounded-full right-1/4 bottom-1/3 bg-blue-200/30 animate-bounce" />
              <div className="absolute w-32 h-32 rounded-full left-1/3 top-1/4 bg-blue-200/30 animate-bounce" />

              {/* Small floating dots */}
              <div className="absolute w-4 h-4 rounded-full right-1/3 top-1/2 bg-blue-400/40 animate-ping" />
              <div className="absolute w-4 h-4 rounded-full left-1/2 bottom-1/3 bg-blue-400/40 animate-ping" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/10 to-transparent" />
            </div>
          </FadeInSection>
        </div>
      </main>

      <div className="h-8" />
      <LandingFooter />
    </>
  );
}
