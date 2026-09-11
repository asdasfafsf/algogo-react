import { badgeVariants } from "@components/ui/badge";
import { cn } from "@lib/utils";

interface ProblemLevelChipProps {
  level: ProblemLevel;
  className?: string;
}

export function getBackgroundClassName(level: ProblemLevel) {
  if (level.indexOf("브론즈") > -1) {
    return "border-tier-bronze/20 bg-tier-bronze/10 text-tier-bronze hover:bg-tier-bronze/15";
  }
  if (level.indexOf("실버") > -1) {
    return "border-tier-silver/20 bg-tier-silver/10 text-tier-silver hover:bg-tier-silver/15";
  }
  if (level.indexOf("골드") > -1) {
    return "border-tier-gold/20 bg-tier-gold/10 text-tier-gold hover:bg-tier-gold/15";
  }
  if (level.indexOf("플래티넘") > -1) {
    return "border-tier-platinum/20 bg-tier-platinum/10 text-tier-platinum hover:bg-tier-platinum/15";
  }
  if (level.indexOf("다이아") > -1) {
    return "border-tier-diamond/20 bg-tier-diamond/10 text-tier-diamond hover:bg-tier-diamond/15";
  }
  if (level.indexOf("루비") > -1) {
    return "border-tier-ruby/20 bg-tier-ruby/10 text-tier-ruby hover:bg-tier-ruby/15";
  }

  return "border-border bg-muted text-muted-foreground hover:bg-muted/80";
}

export default function ProblemLevelChip({
  level,
  className,
}: ProblemLevelChipProps) {
  const label = level.replace("다이아 ", "다이아몬드 ");

  return (
    <span
      className={cn(
        badgeVariants({ variant: "secondary" }),
        "rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-none whitespace-nowrap",
        getBackgroundClassName(level),
        className,
      )}
    >
      {level === "숨김" ? "가려짐" : label}
    </span>
  );
}
