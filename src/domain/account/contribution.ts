export interface ContributionData {
  date: string;
  count: number;
}

export type ContributionWeek = Array<ContributionData | null>;

export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const indexContributions = (data: readonly ContributionData[]) =>
  new Map(data.map((item) => [item.date, item.count]));

const fillRange = (
  start: Date,
  end: Date,
  data: readonly ContributionData[],
) => {
  const counts = indexContributions(data);
  const result: ContributionData[] = [];
  for (
    const date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = formatLocalDate(date);
    result.push({ date: dateString, count: counts.get(dateString) ?? 0 });
  }
  return result;
};

export const createRecentYearData = (
  data: readonly ContributionData[],
  today: Date,
): ContributionData[] => {
  const start = new Date(today);
  start.setDate(today.getDate() - 364);
  return fillRange(start, today, data);
};

export const createCalendarYearData = (
  data: readonly ContributionData[],
  year: number,
): ContributionData[] =>
  fillRange(new Date(year, 0, 1), new Date(year, 11, 31), data);

export const groupRecentDataByWeeks = (
  data: readonly ContributionData[],
  today: Date,
): ContributionWeek[] => {
  if (data.length === 0) return [];
  const firstDate = new Date(`${data[0].date}T00:00:00`);
  firstDate.setDate(firstDate.getDate() - firstDate.getDay());
  const lastDate = new Date(today);
  lastDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()));
  const indexed = new Map(data.map((item) => [item.date, item]));
  const weeks: ContributionWeek[] = [];
  const cursor = new Date(firstDate);
  while (cursor <= lastDate) {
    const week: ContributionWeek = [];
    for (let day = 0; day < 7; day += 1) {
      week.push(indexed.get(formatLocalDate(cursor)) ?? null);
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
};

export const groupYearDataByWeeks = (
  data: readonly ContributionData[],
  year: number,
): ContributionWeek[] => {
  const weeks: ContributionWeek[] = [];
  const firstDay = new Date(year, 0, 1).getDay();
  let week: ContributionWeek = Array.from({ length: firstDay }, () => null);
  data.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
};

const monthNames = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const getMonthPositions = (weeks: readonly ContributionWeek[]) => {
  let previousMonth = -1;
  const positions: Array<{ weekIndex: number; monthName: string }> = [];
  weeks.forEach((week, weekIndex) => {
    const firstDay = week.find((day) => day !== null);
    if (!firstDay) return;
    const month = new Date(`${firstDay.date}T00:00:00`).getMonth();
    if (month !== previousMonth) {
      previousMonth = month;
      positions.push({ weekIndex, monthName: monthNames[month] });
    }
  });
  return positions;
};

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export const contributionLevel = (count: number): ContributionLevel => {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
};
