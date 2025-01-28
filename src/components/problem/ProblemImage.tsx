interface ProblemImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProblemImage({ src, alt, className }: ProblemImageProps) {
  const defaultClassName = `${className ?? ''} py-2 max-w-full h-auto`;
  return <img src={src} alt={alt} className={defaultClassName} />;
}
