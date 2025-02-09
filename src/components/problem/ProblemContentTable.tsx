interface ProblemContentTableProps {
  cellList: ResponseProblemContentCell[];
}

export default function ProblemContentTable({ cellList }: ProblemContentTableProps) {
  const headers = cellList
    .filter((cell) => cell.rowIndex === 0)
    .sort((a, b) => a.columnIndex - b.columnIndex);
  const dataRows = cellList.filter((cell) => cell.rowIndex > 0);

  const rows = dataRows.reduce((acc, cell) => {
    if (!acc[cell.rowIndex]) {
      acc[cell.rowIndex] = [];
    }
    acc[cell.rowIndex].push(cell);
    return acc;
  }, {} as Record<number, ResponseProblemContentCell[]>);

  const sortedRows = Object.values(rows)
    .map((row) => row.sort((a, b) => a.columnIndex - b.columnIndex));

  return (
    <div className="w-full overflow-x-auto my-4">
      <div className="min-w-full grid">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-200">
          {headers.map((cell) => (
            <div
              key={`header-${cell.columnIndex}`}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border-r last:border-r-0"
            >
              {cell.content.replace(/&nbsp;/g, ' ').trim()}
            </div>
          ))}
        </div>
        {sortedRows.map((row, index) => (
          <div key={`row-${index}`} className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-200">
            {row.map((cell) => (
              <div
                key={`cell-${cell.rowIndex}-${cell.columnIndex}`}
                className="px-4 py-2 text-sm text-gray-700 border-r last:border-r-0"
              >
                {cell.content.replace(/&nbsp;/g, ' ').trim()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
