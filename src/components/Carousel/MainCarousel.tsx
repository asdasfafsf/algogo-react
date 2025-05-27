import { Carousel } from '@components/Carousel/index';
import UpcomingSystemUpdateContent from './UpcomingSystemUpdateContent';

export default function MainCarousel() {
  return (
    <Carousel className="rounded-xl h-72">
      <UpcomingSystemUpdateContent />
    </Carousel>
  );
}
