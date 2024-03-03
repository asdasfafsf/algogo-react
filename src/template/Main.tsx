import Line from '../atom/Line';
import MainCarousel from '../molecule/MainCarousel';
import ProblemTable from '../molecule/ProblemTable';

export default function Main() {
  return (
    <div className="my-8">
      <MainCarousel />

      <Line />

      <ProblemTable />
    </div>
  );
}
