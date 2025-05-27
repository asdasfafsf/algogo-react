import { Carousel } from '@components/Carousel/index';
import { Typography } from '../common';

export default function MainCarousel() {
  return (
    <Carousel className="rounded-xl h-72">
      <div className="relative w-full h-full bg-black">
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full max-w-6xl px-4 mx-auto">
            {/* 왼쪽 텍스트 영역 */}
            <div className="absolute left-0 space-y-4 -translate-y-1/2 top-1/2">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10">
                <span className="text-sm text-white/80">시스템 업데이트</span>
              </div>

              <Typography variant="h4" color="white">
                더 나은 서비스를 위해
                <br />
                계정 연동을 준비하고 있어요
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

            {/* 오른쪽 이미지 영역 */}
            <div className="absolute -translate-y-1/2 right-4 top-1/2">
              <img
                src="Gear.png"
                alt="설정 아이콘"
                className="object-contain w-24 h-24 animate-spin-slow"
              />
              <img
                src="Key.png"
                alt="키 아이콘"
                className="object-contain w-20 h-20 mt-4 ml-8"
              />
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
