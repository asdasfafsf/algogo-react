export const TODAY_PROBLEM_MIN_DAY = -30;

export function normalizeTodayProblemDay(
  rawDay: string | null,
  today: Date,
): number {
  const day = Number(rawDay ?? 0);
  if (!Number.isSafeInteger(day) || day < TODAY_PROBLEM_MIN_DAY || day > 0) {
    return 0;
  }

  const targetDate = new Date(today);
  targetDate.setHours(0, 0, 0, 0);
  targetDate.setDate(targetDate.getDate() + day);
  return Number.isFinite(targetDate.getTime()) ? day : 0;
}

export function dayOffsetFromDateInput(
  value: string,
  today: Date,
): number | null {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  const target = new Date(year, month - 1, day);
  target.setHours(0, 0, 0, 0);
  if (
    target.getFullYear() !== year ||
    target.getMonth() !== month - 1 ||
    target.getDate() !== day
  ) {
    return null;
  }

  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - startOfToday.getTime()) / 86_400_000);
}
