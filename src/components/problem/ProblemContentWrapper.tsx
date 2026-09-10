import { Line, Typography } from "../common";
import ProblemContent from "./ProblemContent";

interface ProblemContentWrapperProps {
  title: string;
  content: string;
  scale?: number;
}

export default function ProblemContentWrapper({
  title,
  scale,
  content,
}: ProblemContentWrapperProps) {
  return (
    <div>
      {" "}
      <Typography variant="h6" scale={scale} className="text-muted-foreground">
        {title}
      </Typography>
      <Line className="mb-4 mt-2 opacity-40" />
      <ProblemContent content={content} />
    </div>
  );
}
