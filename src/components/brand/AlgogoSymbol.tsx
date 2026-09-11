import { cn } from "@lib/utils";

interface AlgogoSymbolProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { dimensions: 32, className: "size-8" },
  md: { dimensions: 44, className: "size-11" },
  lg: { dimensions: 64, className: "size-16" },
} as const;

export default function AlgogoSymbol({
  size = "sm",
  className,
}: AlgogoSymbolProps) {
  const { dimensions, className: sizeClassName } = sizeMap[size];

  return (
    <img
      src="/brand/algogo-mark.png"
      alt=""
      width={dimensions}
      height={dimensions}
      className={cn("shrink-0 object-contain", sizeClassName, className)}
      aria-hidden="true"
      draggable="false"
    />
  );
}
