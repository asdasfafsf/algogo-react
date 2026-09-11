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
import { Button } from "@components/Button";
import { Card } from "@components/ui/card";
import { Typography } from "@components/common";
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
            <Typography
              variant="small"
              className="font-medium text-emerald-600 dark:text-emerald-400"
            >
              성공 {summary.success}
            </Typography>
          </div>
          <div className="flex items-center gap-1 rounded bg-red-500/10 px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <Typography variant="small" className="text-red-500 font-medium">
              실패 {summary.failure}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 overflow-x-hidden min-w-[215px]">
          <Button
            onClick={() => modal.push("TESTCASE", TestCaseModal, {})}
            color="blue"
            disabled={state === "PENDING"}
            className={
              state === "PENDING" ? "bg-gray-600 cursor-not-allowed" : ""
            }
          >
            테스트 케이스 추가
          </Button>
          <Button
            onClick={handleTest}
            color="blue"
            disabled={state === "PENDING"}
            className={
              state === "PENDING" ? "bg-gray-600 cursor-not-allowed" : ""
            }
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
                    <Typography
                      variant="small"
                      className="font-normal leading-none text-muted-foreground"
                    >
                      {head}
                    </Typography>
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
                    <ShadcnTableCell className={`${classes} w-28%`}>
                      <Typography
                        variant="small"
                        className="font-normal text-center wrap-break-word"
                      >
                        {input}
                      </Typography>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={`${classes} w-28%`}>
                      <Typography
                        variant="small"
                        className="font-normal text-center wrap-break-word"
                      >
                        {output}
                      </Typography>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={`${classes} w-28%`}>
                      <Typography
                        variant="small"
                        className="font-normal text-center wrap-break-word"
                      >
                        {expected}
                      </Typography>
                    </ShadcnTableCell>
                    <ShadcnTableCell className={`${classes} w-16%`}>
                      <Typography
                        variant="small"
                        color={
                          state === "불일치"
                            ? "red"
                            : state === "일치"
                              ? "green"
                              : "gray"
                        }
                        className="font-normal wrap-break-word"
                      >
                        {state}
                      </Typography>
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
