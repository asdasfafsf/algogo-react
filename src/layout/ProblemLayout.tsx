import ProblemHeader from '../molecule/ProblemHeader';
import ProblemSection from '../molecule/ProblemSection';
import ProblemSidebar from '../molecule/ProblemSidebar';

export default function ProblemLayout() {
  return (
    <div className="grid">
      <ProblemHeader />
      <div className="grid">
        <ProblemSidebar />
        <ProblemSection />
      </div>
    </div>
  );
}
