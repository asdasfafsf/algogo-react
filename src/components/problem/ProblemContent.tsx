interface ProblemContentProps {
  content: string;
  scale?: number;
}

export default function ProblemContent({ content, scale = 1 }: ProblemContentProps) {
  return (
    <div
      className="w-full problem-content"
      style={{
        zoom: scale,
      }}
          // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
