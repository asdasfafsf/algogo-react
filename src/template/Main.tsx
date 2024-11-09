import { ProblemTable } from '@components/Table/index';
import MainCarousel from '../molecule/MainCarousel';

export default function Main() {
  return (
    <div className="my-8">
      <MainCarousel />
      <div className="h-8" />
      <ProblemTable />
    </div>
  );
}
