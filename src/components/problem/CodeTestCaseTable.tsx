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
import { Card } from "@components/ui/card";
import TestCaseModal from "./TestCaseModal";
import { summarizeTestCases } from "@/domain/editor/testCases";

interface CodeTestCaseTableProps {
  executeResultList: TestCase[];
}

export default function CodeTestCaseTable({
  executeResultList,
}: CodeTestCaseTableProps) {
  const modal = useModal();
  const { state, handleTest } = useExecuteTestCase();
  const summary = summarizeTestCases(executeResultList);
  return (
    <div className="h-full w-full bg-background">
      <div className="flex w-full justify-between overflow-x-auto border-b border-border px-2 py-2">
        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center gap-1 rounded bg-emerald-500/10 px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              성공 {summary.success}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded bg-red-500/10 px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-500">
              실패 {summary.failure}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 overflow-x-hidden min-w-[215px]">
          <Button
            onClick={() => modal.push("TESTCASE", TestCaseModal, {})}
            disabled={state === "PENDING"}
            className="shrink-0"
          >
            테스트 케이스 추가
          </Button>
          <Button
            onClick={handleTest}
            disabled={state === "PENDING"}
            className="shrink-0"
          >
            테스트
          </Button>
        </div>
      </div>
      <Card className="h-[calc(100%-52px)] w-full overflow-auto rounded-none border-0 bg-background shadow-none">
        <ShadcnTable className="min-w-max table-fixed bg-background text-center">
          <ShadcnTableHeader>
            <ShadcnTableRow>
              {["입력", "출력", "예상 결과", "일치 여부"].map(
                (head, index, arr) => (
                  <ShadcnTableHead
                    key={head}
                    className={`${index + 1 !== arr.length ? "w-[28%]" : "w-[16%]"} border-b border-border bg-muted/20 p-4`}
                  >
                    <span className="text-sm font-normal leading-none text-muted-foreground">
                      {head}
                    </span>
                  </ShadcnTableHead>
                ),
              )}
            </ShadcnTableRow>
          </ShadcnTableHeader>
          <ShadcnTableBody className="bg-background">
            {executeResultList.map(
              ({ input, output, expected, state }, index, arr) => {
                const isLast = index === arr.length - 1;
                const classes = `bg-background p-4 ${isLast ? "" : "border-b border-border"}`;

                return (
                  <ShadcnTableRow className="h-12" key={index}>
                    <ShadcnTableCell className={`${classes} w-[28%]`}>
                      <span className="wrap-break-word text-center text-sm font-normal">
                        {input}
                      </span>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={`${classes} w-[28%]`}>
                      <span className="wrap-break-word text-center text-sm font-normal">
                        {output}
                      </span>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={`${classes} w-[28%]`}>
                      <span className="wrap-break-word text-center text-sm font-normal">
                        {expected}
                      </span>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={`${classes} w-16%`}>
                      <span
                        className={`wrap-break-word text-sm font-normal ${
                          state === "불일치"
                            ? "text-red-500"
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
