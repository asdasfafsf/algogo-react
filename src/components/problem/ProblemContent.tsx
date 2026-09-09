import { MathJax } from 'better-react-mathjax';

interface ProblemContentProps {
  content: string;
  scale?: number;
}

export default function ProblemContent({ content, scale = 1 }: ProblemContentProps) {
  return (
    <MathJax
      key={content}
      dynamic
      className="w-full problem-content"
      style={{
        zoom: scale,
      }}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
