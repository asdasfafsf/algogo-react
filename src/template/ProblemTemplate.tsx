import ProblemHeader from '../organism/ProblemHeader';
import ProblemSection from '../organism/ProblemSection';
import ProblemSidebar from '../organism/ProblemSidebar';

export default function ProblemLayout() {
  return (
    <div className="grid overflow-x-hidden h-screen">
      <ProblemHeader />
      <div
        className="flex h-[calc(100vh-48px)]"
      >
        <ProblemSidebar />
        <ProblemSection />
      </div>
    </div>
  );
}
