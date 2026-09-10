import { cn } from "@lib/utils";
import AlgogoSymbol from "./AlgogoSymbol";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const textSizeMap = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-7xl",
} as const;

const gapMap = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-3",
} as const;

export default function Logo({
  size = "sm",
  showText = true,
  className,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", gapMap[size], className)}>
      <AlgogoSymbol size={size} />
      {showText && (
        <span
          className={cn(
            "font-logo font-normal tracking-tight",
            textSizeMap[size],
          )}
        >
          알고고
        </span>
      )}
    </span>
  );
}
