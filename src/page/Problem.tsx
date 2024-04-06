import { PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import ProblemFooter from '../template/ProblemFooter';
import ProblemHeader from '../template/ProblemHeader';
import ProblemSection from '../template/ProblemSection';

export default function ProblemPage() {
  return (
    <div className="overflow-x-hidden h-screen">
      <ProblemHeader />
      <div
        className="w-screen relative overflow-x-hidden"
        style={{
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_HEADER_HEIGHT}px)`,
        }}
      >
        <ProblemSection />
      </div>
      <ProblemFooter />
    </div>
  );
}
