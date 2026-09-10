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
    <section className="space-y-3">
      <h2
        style={{ zoom: scale }}
        className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {title}
      </h2>
      <ProblemContent scale={scale} content={content} />
    </section>
  );
}
