import Chip from "./Chip";

interface ProblemLevelChipProps {
  level: ProblemLevel;
  className?: string;
}

export function getBackgroundClassName(level: ProblemLevel) {
  if (level.indexOf("브론즈") > -1) {
    return "bg-bronze text-white";
  }
  if (level.indexOf("실버") > -1) {
    return "bg-silver text-white";
  }
  if (level.indexOf("골드") > -1) {
    return "bg-gold text-white";
  }
  if (level.indexOf("플래티넘") > -1) {
    return "bg-platinum text-white";
  }
  if (level.indexOf("다이아") > -1) {
    return "bg-diamond text-white";
  }
  if (level.indexOf("루비") > -1) {
    return "bg-ruby text-white";
  }
  if (level.indexOf("숨김") > -1) {
    return "bg-muted text-muted-foreground";
  }

  return "bg-muted text-muted-foreground";
}

export default function ProblemLevelChip({
  level,
  className = "",
}: ProblemLevelChipProps) {
  return (
    <Chip
      variant="ghost"
      className={`${className} ${getBackgroundClassName(level)}`}
      value={level === "숨김" ? "난이도 숨김" : level}
    />
  );
}
