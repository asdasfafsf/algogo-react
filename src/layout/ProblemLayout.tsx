import ProblemHeader from '../organism/ProblemHeader';
import ProblemSection from '../organism/ProblemSection';
import ProblemSidebar from '../organism/ProblemSidebar';

export default function ProblemLayout() {
  return (
    <div className="grid">
      <ProblemHeader />
      <div
        className="grid"
        style={{
          gridTemplateColumns: '500px 1fr',
        }}
      >
        <ProblemSidebar />
        <ProblemSection />
      </div>
    </div>
  );
}
