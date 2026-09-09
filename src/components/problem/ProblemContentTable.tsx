import { buildProblemContentTable } from '@/domain/problems';

interface ProblemContentTableProps {
  cellList: ResponseProblemContentCell[];
}

export default function ProblemContentTable({
  cellList,
}: ProblemContentTableProps) {
  const { headers, rows } = buildProblemContentTable(cellList);

  return (
    <div className="w-full overflow-x-auto my-4">
      <div className="min-w-full grid">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-200">
          {headers.map(cell => (
            <div
              key={`header-${cell.columnIndex}`}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 border-r last:border-r-0"
            >
              {cell.content.replace(/&nbsp;/g, ' ').trim()}
            </div>
          ))}
        </div>
        {rows.map((row, index) => (
          <div
            key={`row-${index}`}
            className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-200"
          >
            {row.map(cell => (
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
