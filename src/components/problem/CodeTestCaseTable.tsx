import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
  TableHead as ShadcnTableHead,
  TableBody as ShadcnTableBody,
  TableCell as ShadcnTableCell,
} from "@/components/ui/table";
import useExecuteTestCase from "@hook/useExecuteTestCase";
import useModal from "@plugins/modal/useModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@components/ui/card";
import { Loader2 } from "lucide-react";
import TestCaseModal from "./TestCaseModal";
import { summarizeTestCases } from "@/domain/editor/testCases";

interface CodeTestCaseTableProps {
  executeResultList: TestCase[];
}

const testCaseColumns = [
  { label: "입력", width: "28%" },
  { label: "출력", width: "28%" },
  { label: "예상 결과", width: "28%" },
  { label: "일치 여부", width: "16%" },
] as const;

export default function CodeTestCaseTable({
  executeResultList,
}: CodeTestCaseTableProps) {
  const modal = useModal();
  const { state, handleTest } = useExecuteTestCase();
  const summary = summarizeTestCases(executeResultList);
  const isPending = state === "CONNECTING" || state === "PENDING";
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2">
        <div className="flex shrink-0 items-center gap-2">
          <Badge className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-emerald-500/10 px-3 py-1 text-emerald-600 border-transparent hover:bg-emerald-500/10 dark:text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="whitespace-nowrap text-sm font-medium">
              성공 {summary.success}
            </span>
          </Badge>
          <Badge className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-red-500/10 px-3 py-1 text-red-500 border-transparent hover:bg-red-500/10">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="whitespace-nowrap text-sm font-medium">
              실패 {summary.failure}
            </span>
          </Badge>
          {summary.running > 0 && (
            <Badge variant="secondary" role="status" className="gap-1">
              <Loader2 className="size-3 animate-spin" aria-hidden="true" />
              실행 중{summary.running > 0 ? ` ${summary.running}` : ""}
            </Badge>
          )}
        </div>
        <div className="ml-auto flex shrink-0 items-center justify-end gap-1">
          <Button
            onClick={() => modal.push("TESTCASE", TestCaseModal, {})}
            disabled={isPending}
            className="shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            테스트 케이스 추가
          </Button>
          <Button
            onClick={handleTest}
            disabled={isPending}
            className="shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            테스트
          </Button>
        </div>
      </div>
      <Card className="min-h-0 w-full flex-1 overflow-auto rounded-none border-0 bg-background shadow-none">
        <ShadcnTable className="min-w-[640px] table-fixed bg-background text-center">
          <colgroup>
            {testCaseColumns.map((column) => (
              <col key={column.label} style={{ width: column.width }} />
            ))}
          </colgroup>
          <ShadcnTableHeader>
            <ShadcnTableRow>
              {testCaseColumns.map((column) => (
                <ShadcnTableHead
                  key={column.label}
                  className="border-b border-border bg-muted/20 p-4 text-center"
                >
                  <span className="text-sm font-normal leading-none text-muted-foreground">
                    {column.label}
                  </span>
                </ShadcnTableHead>
              ))}
            </ShadcnTableRow>
          </ShadcnTableHeader>
          <ShadcnTableBody className="bg-background">
            {executeResultList.map(
              ({ input, output, expected, state }, index, arr) => {
                const isLast = index === arr.length - 1;
                const classes = `bg-background p-4 text-center ${isLast ? "" : "border-b border-border"}`;

                return (
                  <ShadcnTableRow className="h-12" key={index}>
                    <ShadcnTableCell className={classes}>
                      <span className="wrap-break-word text-center text-sm font-normal">
                        {input}
                      </span>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={classes}>
                      <span className="wrap-break-word whitespace-pre-wrap text-center text-sm font-normal">
                        {output}
                      </span>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={classes}>
                      <span className="wrap-break-word text-center text-sm font-normal">
                        {expected}
                      </span>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={classes}>
                      <span
                        className={`wrap-break-word text-sm font-normal ${
                          state === "불일치"
                            ? "text-red-500"
                            : state === "실패"
                              ? "font-medium text-destructive"
                              : state === "일치"
                                ? "text-green-600"
                                : "text-muted-foreground"
                        }`}
                      >
                        {state}
                      </span>
                    </ShadcnTableCell>
                  </ShadcnTableRow>
                );
              },
            )}
          </ShadcnTableBody>
        </ShadcnTable>
      </Card>
    </div>
  );
}
