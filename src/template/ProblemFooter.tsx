import { Typography } from '@material-tailwind/react';
import { PROBLEM_FOOTER_HEIGHT } from '../constant/Size';

export default function ProbleFooter() {
  return (
    <footer
      style={{
        height: `${PROBLEM_FOOTER_HEIGHT}px`,
      }}
      className="flex bg-gray-900 w-full text-white items-center justify-center"
    >
      <Typography variant="h6">1/1</Typography>
    </footer>
  );
}
