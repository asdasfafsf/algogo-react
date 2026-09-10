import { formatProblemLevel } from "./problemPresentation";

export interface ProblemLevelOption {
  name: string;
  value: string;
  isSelected: boolean;
}

function parseProblemLevel(value: string): number {
  const level = Number(value);

  if (!Number.isInteger(level) || level < 1 || level > 30) {
    throw new RangeError(`지원하지 않는 문제 난이도 값입니다: ${value}`);
  }

  return level;
}

export function getProblemLevelRank(value: string): number {
  const level = parseProblemLevel(value);
  return 5 - ((level - 1) % 5);
}

export function getProblemLevelName(value: string): string {
  if (value === "0") {
    return "알 수 없음";
  }

  return formatProblemLevel(parseProblemLevel(value));
}

export function normalizeProblemLevelOptions(
  options: readonly ProblemLevelOption[],
): ProblemLevelOption[] {
  return options.map((option) => ({
    ...option,
    name: getProblemLevelName(option.value),
  }));
}

export function toggleProblemLevel(
  options: readonly ProblemLevelOption[],
  value: string,
): ProblemLevelOption[] {
  return options.map((option) =>
    option.value === value
      ? { ...option, isSelected: !option.isSelected }
      : { ...option },
  );
}

export function toggleProblemTier(
  options: readonly ProblemLevelOption[],
  tierValues: readonly string[],
): ProblemLevelOption[] {
  const values = new Set(tierValues);
  const isEntireTierSelected = options
    .filter((option) => values.has(option.value))
    .every((option) => option.isSelected);

  return options.map((option) =>
    values.has(option.value)
      ? { ...option, isSelected: !isEntireTierSelected }
      : { ...option },
  );
}
