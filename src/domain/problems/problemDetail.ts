export type CalendarDay = {
  year: number;
  month: number;
  date: number;
};

export function isSameCalendarDay(
  left: CalendarDay,
  right: CalendarDay,
): boolean {
  return (
    left.year === right.year &&
    left.month === right.month &&
    left.date === right.date
  );
}

export type ProblemContentCell = {
  rowIndex: number;
  columnIndex: number;
  content: string;
};

export type ProblemContentTableModel<T extends ProblemContentCell> = {
  headers: T[];
  rows: T[][];
};

export function buildProblemContentTable<T extends ProblemContentCell>(
  cells: readonly T[],
): ProblemContentTableModel<T> {
  const headers = cells
    .filter(cell => cell.rowIndex === 0)
    .sort((left, right) => left.columnIndex - right.columnIndex);
  const rowsByIndex = new Map<number, T[]>();

  for (const cell of cells) {
    if (cell.rowIndex <= 0) continue;
    const row = rowsByIndex.get(cell.rowIndex) ?? [];
    row.push(cell);
    rowsByIndex.set(cell.rowIndex, row);
  }

  return {
    headers,
    rows: [...rowsByIndex.entries()]
      .sort(([leftIndex], [rightIndex]) => leftIndex - rightIndex)
      .map(([, row]) =>
        [...row].sort((left, right) => left.columnIndex - right.columnIndex),
      ),
  };
}
