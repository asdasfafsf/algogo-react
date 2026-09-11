import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import useTestCase from "@hook/useTestCase";
import useExecuteTestCase from "@hook/useExecuteTestCase";
import { Line, Typography, Textarea } from "@components/common/index";
import { Button } from "@components/Button/index";
import { Chip } from "@components/Chip/index";
import type { ModalComponentProps } from "@plugins/modal/ModalController";

export default function TestCaseModal({
  resolve,
}: ModalComponentProps<boolean>) {
  const {
    testCaseList,
    handleClickAddTestCase,
    removeTestCase,
    handleClickClose,
    handleChangeInput,
    handleChangeOutput,
  } = useTestCase(resolve);

  const { handleTest } = useExecuteTestCase(() => resolve(false));

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) handleClickClose();
      }}
    >
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto p-0">
        <DialogHeader className="border-b border-border px-8 py-6 text-left">
          <DialogTitle>테스트 케이스</DialogTitle>
          <DialogDescription>
            입력과 예상 출력을 추가하고 테스트합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-64 w-full animate-in rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl fade-in duration-200">
          <div className="px-8 scroll-y overflow-y-auto max-h-[60vh]">
            {testCaseList.length ? (
              testCaseList.map(({ input, expected, readOnly }, index, arr) => (
                <div key={index} className="w-full">
                  <div className="relative flex w-full mb-2">
                    <Chip
                      value={`입력 ${index + 1}`}
                      variant="ghost"
                      className="flex items-center whitespace-nowrap"
                      color={readOnly ? "red" : "blue"}
                    />
                    {readOnly ? (
                      ""
                    ) : (
                      <Button
                        variant="text"
                        aria-label={`테스트 케이스 ${index + 1} 삭제`}
                        onClick={() => removeTestCase(index)}
                        className="flex h-6 w-full cursor-pointer items-center justify-end bg-background"
                      >
                        <Trash2 className="w-5 h-5 text-gray-600" />
                      </Button>
                    )}
                  </div>
                  {readOnly ? (
                    <Textarea
                      aria-label={`입력 ${index + 1}`}
                      value={input}
                      readOnly
                    />
                  ) : (
                    <Textarea
                      aria-label={`입력 ${index + 1}`}
                      value={input}
                      className="font-D2Coding"
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleChangeInput(index, e.target.value);
                      }}
                      placeholder="입력을 입력하세요"
                    />
                  )}
                  <Chip
                    value={`출력 ${index + 1}`}
                    variant="ghost"
                    className="flex items-center mb-2 whitespace-nowrap"
                    color={readOnly ? "red" : "blue"}
                  />{" "}
                  {readOnly ? (
                    <Textarea
                      aria-label={`예상 출력 ${index + 1}`}
                      value={expected}
                      readOnly
                    />
                  ) : (
                    <Textarea
                      aria-label={`예상 출력 ${index + 1}`}
                      value={expected}
                      className="font-D2Coding"
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleChangeOutput(index, e.target.value);
                      }}
                      placeholder="출력을 입력하세요"
                    />
                  )}
                  {index + 1 < arr.length ? (
                    <Line className="my-4 bg-border" />
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-24">
                <Typography variant="h6" className="text-gray-600">
                  테스트 케이스가 없습니다.
                </Typography>
              </div>
            )}
          </div>

          {testCaseList.length < 10 ? (
            <div className="flex justify-center px-8 mb-5">
              <Button
                onClick={handleClickAddTestCase}
                className="w-full"
                color="blue"
              >
                테스트 케이스 추가
              </Button>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end gap-1 px-8 mb-4">
            <Button onClick={handleTest} color="blue">
              테스트
            </Button>
            <Button onClick={handleClickClose} className="bg-gray-600">
              완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
