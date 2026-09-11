import { cn } from "@lib/utils";
import AlgogoSymbol from "./AlgogoSymbol";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const textSizeMap = {
  sm: "text-2xl",
  md: "text-[2rem]",
  lg: "text-5xl",
} as const;

const gapMap = {
  sm: "gap-2",
  md: "gap-2.5",
  lg: "gap-3",
} as const;

export default function Logo({
  size = "sm",
  showText = true,
  className,
}: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center", gapMap[size], className)}
      role={showText ? undefined : "img"}
      aria-label={showText ? undefined : "알고고"}
    >
      <AlgogoSymbol size={size} />
      {showText && (
        <span
          className={cn(
            "relative top-1 font-Tenada font-bold leading-none tracking-tight",
            textSizeMap[size],
          )}
        >
          알고고
        </span>
      )}
    </span>
  );
}
