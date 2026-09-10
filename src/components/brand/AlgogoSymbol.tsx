interface AlgogoSymbolProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 28,
  md: 44,
  lg: 66,
} as const;

export default function AlgogoSymbol({
  size = "sm",
  className,
}: AlgogoSymbolProps) {
  const dimensions = sizeMap[size];

  return (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M 10 4.5 L 3 12 L 10 19.5 L 10 16.8 L 6.2 12 L 10 7.2 Z M 14 4.5 L 21 12 L 14 19.5 L 14 16.8 L 17.8 12 L 14 7.2 Z" />
    </svg>
  );
}
