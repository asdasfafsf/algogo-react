import MainCarousel from '../molecule/MainCarousel';
import ProblemTable from '../organism/ProblemTable';

export default function Main() {
  return (
    <div className="my-8">
      <MainCarousel />
      <ProblemTable />
    </div>
  );
}
