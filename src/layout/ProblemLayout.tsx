import ProblemHeader from '../organism/ProblemHeader';
import ProblemSection from '../organism/ProblemSection';
import ProblemSidebar from '../organism/ProblemSidebar';

export default function ProblemLayout() {
  return (
    <div className="grid overflow-x-hidden">
      <ProblemHeader />
      <div
        className="flex"
      >
        <ProblemSidebar />
        <ProblemSection />
      </div>
    </div>
  );
}
