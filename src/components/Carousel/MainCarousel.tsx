import Carousel from "./Carousel";
import UpcomingSystemUpdateContent from "./UpcomingSystemUpdateContent";
export default function MainCarousel() {
  return (
    <Carousel className="h-[280px] overflow-hidden rounded-xl border border-white/8 bg-[#111827] sm:h-[320px] lg:h-[360px]">
      <UpcomingSystemUpdateContent />
    </Carousel>
  );
}
