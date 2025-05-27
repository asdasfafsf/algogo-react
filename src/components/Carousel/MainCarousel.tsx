import { Carousel } from '@components/Carousel/index';
import { Typography } from '../common';

export default function MainCarousel() {
  return (
    <Carousel className="rounded-xl h-72">
      <div className="relative w-full h-full bg-black">
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full px-12">
            {/* 텍스트 영역 */}
            <div className="absolute left-12 space-y-4 -translate-y-1/2 top-1/2 w-[calc(100%-6rem)] md:w-[60%]">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10">
                <span className="text-sm text-white/80">시스템 업데이트</span>
              </div>

              <Typography variant="h4" color="white">
                더 나은 서비스를 위해
                <br className="hidden md:block" />
                <span className="md:inline">계정 연동을 준비하고 있어요</span>
              </Typography>

              <p className="text-sm text-white/60">
                곧 다양한 플랫폼과의 연동 기능을 만나보실 수 있습니다
              </p>

              {/* <Button
                className=""
                color="blue"
                disabled
              >
                알림 신청하기
              </Button> */}
            </div>

            {/* 이미지 영역 */}
            <div className="absolute hidden -translate-y-1/2 right-12 top-1/2 md:block">
              <img
                src="Gear.png"
                alt="설정 아이콘"
                className="object-contain w-16 h-16 md:w-24 md:h-24 animate-spin-slow"
              />
              <img
                src="Key.png"
                alt="키 아이콘"
                className="object-contain mt-4 ml-8 w-14 h-14 md:w-20 md:h-20"
              />
            </div>

            {/* 모바일 이미지 - 상단에 작게 표시 */}
            <div className="absolute right-12 top-4 md:hidden">
              <img
                src="Gear.png"
                alt="설정 아이콘"
                className="object-contain w-12 h-12 animate-spin-slow"
              />
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
