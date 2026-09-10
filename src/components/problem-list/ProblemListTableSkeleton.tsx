import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import useProblemListStore from "@zustand/ProblemListStore";

const headings = [
  "상태",
  "번호",
  "제목",
  "난이도",
  "카테고리",
  "정답률",
  "제출",
  "출처",
];

export default function ProblemListTableSkeleton() {
  const { pageSize } = useProblemListStore((state) => state.pagingInfo);

  return (
    <div className="overflow-x-auto animate-pulse">
      <Table className="min-w-[640px] table-fixed sm:min-w-[950px]">
        <colgroup>
          <col className="w-12 sm:w-[80px]" />
          <col className="w-16 sm:w-[100px]" />
          <col className="w-[180px] sm:w-[280px]" />
          <col className="w-[100px] sm:w-[130px]" />
          <col className="w-[120px] sm:w-[160px]" />
          <col className="w-20 sm:w-[110px]" />
          <col className="hidden w-[110px] sm:table-column" />
          <col className="w-12 sm:w-[80px]" />
        </colgroup>
        <TableHeader>
          <TableRow>
            {headings.map((heading) => (
              <TableHead
                key={heading}
                className={
                  heading === "제목"
                    ? undefined
                    : heading === "제출"
                      ? "hidden text-center sm:table-cell"
                      : "text-center"
                }
              >
                <span className="sr-only">{heading}</span>
                <div className="mx-auto h-4 w-12 rounded bg-muted" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: pageSize }).map((_, index) => (
            <TableRow key={index} className="h-[53px]">
              {headings.map((heading) => (
                <TableCell
                  key={heading}
                  className={
                    heading === "제출" ? "hidden sm:table-cell" : undefined
                  }
                >
                  <div
                    className={
                      heading === "제목"
                        ? "h-4 w-4/5 rounded bg-muted"
                        : "mx-auto h-4 w-12 rounded bg-muted"
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
