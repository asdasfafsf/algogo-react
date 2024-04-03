import { PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import { useScreenSize } from '../context/ScreenSizeContext';
import ProblemFooter from '../template/ProblemFooter';
import ProblemHeader from '../template/ProblemHeader';
import ProblemSection from '../template/ProblemSection';

export default function ProblemPage() {
  const { isMobile } = useScreenSize();

  return (
    <div className="grid overflow-x-hidden h-screen">
      <ProblemHeader />
      <div
        style={{
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_HEADER_HEIGHT}px)`,
        }}
        className="flex"
      >
        <ProblemSection />
      </div>
      <ProblemFooter />
    </div>
  );
}
