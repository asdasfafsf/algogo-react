const LEVEL_TIERS = [
  "브론즈",
  "실버",
  "골드",
  "플래티넘",
  "다이아",
  "루비",
] as const;

export function formatProblemLevel(
  level: number,
  levelText?: string,
): ProblemLevel {
  if (Number.isInteger(level) && level >= 1 && level <= 30) {
    const tier = LEVEL_TIERS[Math.floor((level - 1) / 5)];
    const division = 5 - ((level - 1) % 5);
    return `${tier} ${division}` as ProblemLevel;
  }

  if (levelText?.match(/^(브론즈|실버|골드|플래티넘|다이아|루비) [1-5]$/)) {
    return levelText as ProblemLevel;
  }

  return "알 수 없음";
}

export function formatProblemNumber(sourceId?: string | null): string {
  const normalized = sourceId?.trim();
  return normalized && /^\d+$/.test(normalized) ? normalized : "-";
}

export function formatProblemCategory(
  typeList?: readonly string[] | null,
): string {
  if (!typeList?.length) return "-";
  return typeList.length === 1
    ? typeList[0]
    : `${typeList[0]} 외 ${typeList.length - 1}`;
}
