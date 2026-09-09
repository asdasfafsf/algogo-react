const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function parseTodayProblemDay(day: string | null): number {
  return Number(day ?? 0);
}

export function millisecondsUntilNextUtcMidnight(
  nowEpochMilliseconds: number,
): number {
  const elapsedToday =
    ((nowEpochMilliseconds % MILLISECONDS_PER_DAY) + MILLISECONDS_PER_DAY) %
    MILLISECONDS_PER_DAY;
  return MILLISECONDS_PER_DAY - elapsedToday;
}

export function nextTodayProblemIndex(
  currentIndex: number,
  totalProblems: number,
): number {
  return (currentIndex + 1) % totalProblems;
}

export function previousTodayProblemIndex(
  currentIndex: number,
  totalProblems: number,
): number {
  return (currentIndex - 1 + totalProblems) % totalProblems;
}

export function todayProblemProgress(
  currentIndex: number,
  totalProblems: number,
): number {
  return ((currentIndex + 1) / totalProblems) * 100;
}

export function roundedTodayProblemProgress(
  currentIndex: number,
  totalProblems: number,
): number {
  return Math.round(todayProblemProgress(currentIndex, totalProblems));
}

export function canNavigateToNextDay(dayOffset: number): boolean {
  return dayOffset < 0;
}

export function previousDayOffset(dayOffset: number): number {
  return dayOffset - 1;
}

export function nextDayOffset(dayOffset: number): number {
  return canNavigateToNextDay(dayOffset) ? dayOffset + 1 : dayOffset;
}

export function formatUtcMidnightCountdown(milliseconds: number): string {
  const hours = Math.floor(milliseconds / 3_600_000)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((milliseconds % 3_600_000) / 60_000)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((milliseconds % 60_000) / 1_000)
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
