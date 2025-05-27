import { Line, Typography } from '../common';
import ProblemContent from './ProblemContent';

interface ProblemContentWrapperProps {
  title: string;
  content: string;
  scale?: number;
}

export default function ProblemContentWrapper(
  { title, scale, content }: ProblemContentWrapperProps,
) {
  return (
    <div>
      {' '}
      <Typography
        variant="h5"
        scale={scale}
      >
        {title}
      </Typography>
      <Line className="mt-2 mb-4" />

      <ProblemContent content={content} />
    </div>
  );
}
