import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
  TableHead as ShadcnTableHead,
  TableBody as ShadcnTableBody,
  TableCell as ShadcnTableCell,
} from "@/components/ui/table";
import useProblemListStore from "@zustand/ProblemListStore";

export default function ProblemListTableSkeleton() {
  const { pageSize } = useProblemListStore((state) => state.pagingInfo);
  return (
    <div className="overflow-x-auto animate-pulse">
      <ShadcnTable className="w-full min-w-[800px] table-fixed">
        <ShadcnTableHeader className="h-12 mb-12 border-b border-gray-300">
          <ShadcnTableRow>
            <ShadcnTableHead className="w-16 pl-4 text-center">
              <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
            </ShadcnTableHead>
            <ShadcnTableHead className="pl-12 text-left min-w-[400px]">
              <div className="w-32 h-6 mx-auto bg-gray-300 rounded" />
            </ShadcnTableHead>
            <ShadcnTableHead className="pl-2 text-center w-36">
              <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
            </ShadcnTableHead>
            <ShadcnTableHead className="w-32">
              <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
            </ShadcnTableHead>
            <ShadcnTableHead className="w-28">
              <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
            </ShadcnTableHead>
            <ShadcnTableHead className="w-20">
              <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
            </ShadcnTableHead>
          </ShadcnTableRow>
        </ShadcnTableHeader>
        <ShadcnTableBody>
          {Array.from({ length: pageSize }).map((_, index) => (
            <ShadcnTableRow
              key={index}
              className="h-16 border-b border-gray-300"
            >
              <ShadcnTableCell className="pl-4">
                <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
              </ShadcnTableCell>
              <ShadcnTableCell className="pl-12 min-w-[400px]">
                <div className="w-full h-6 bg-gray-300 rounded" />
              </ShadcnTableCell>
              <ShadcnTableCell>
                <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
              </ShadcnTableCell>
              <ShadcnTableCell>
                <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
              </ShadcnTableCell>
              <ShadcnTableCell>
                <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
              </ShadcnTableCell>
              <ShadcnTableCell>
                <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
              </ShadcnTableCell>
            </ShadcnTableRow>
          ))}
        </ShadcnTableBody>
      </ShadcnTable>
    </div>
  );
}
