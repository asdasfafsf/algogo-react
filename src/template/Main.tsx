import { Typography } from '@material-tailwind/react';
import Line from '../atom/Line';
import MainCarousel from '../molecule/MainCarousel';
import ProblemTable from '../molecule/ProblemTable';

export default function Main() {
  return (
    <div className="my-8">
      <MainCarousel />

      <Line />

      <Typography className="text-black" variant="h4">
        문제
      </Typography>
      <ProblemTable />
    </div>
  );
}
