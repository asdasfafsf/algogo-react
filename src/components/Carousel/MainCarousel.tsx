import Carousel from "./Carousel";
import UpcomingSystemUpdateContent from "./UpcomingSystemUpdateContent";
export default function MainCarousel() {
  return (
    <Carousel
      aria-label="준비 중인 백준 풀이 기록 안내"
      tabIndex={-1}
      className="h-[280px] cursor-default overflow-hidden rounded-xl border border-white/8 bg-[#111827] sm:h-[320px] lg:h-[360px]"
    >
      <UpcomingSystemUpdateContent />
    </Carousel>
  );
}
