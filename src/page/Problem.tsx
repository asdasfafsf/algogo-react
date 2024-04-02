import { PROBLEM_HEADER_HEIGHT } from '../constant/Size';
import ProblemFooter from '../template/ProblemFooter';
import ProblemHeader from '../template/ProblemHeader';
import ProblemSection from '../template/ProblemSection';
import ProblemSidebar from '../template/ProblemSidebar';

export default function ProblemPage() {
  return (
    <div className="grid overflow-x-hidden h-screen">
      <ProblemHeader />
      <div
        style={{
          height: `calc(100vh - ${PROBLEM_HEADER_HEIGHT + PROBLEM_HEADER_HEIGHT}px)`,
        }}
        className="flex"
      >
        <ProblemSidebar />
        <ProblemSection />
      </div>
      <ProblemFooter />
    </div>
  );
}
