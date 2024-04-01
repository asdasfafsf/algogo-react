import ProblemHeader from '../template/ProblemHeader';
import ProblemSection from '../template/ProblemSection';
import ProblemSidebar from '../template/ProblemSidebar';

export default function ProblemPage() {
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
