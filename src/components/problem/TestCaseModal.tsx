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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
                    <span
                      className={`animate-fadeIn inline-flex items-center whitespace-nowrap rounded-md border border-transparent px-2.5 py-1 text-xs font-bold shadow-xs ${
                        readOnly
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      입력 {index + 1}
                    </span>
                    {readOnly ? (
                      ""
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`테스트 케이스 ${index + 1} 삭제`}
                        onClick={() => removeTestCase(index)}
                        className="ml-auto size-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 aria-hidden className="size-5 text-gray-600" />
                      </Button>
                    )}
                  </div>
                  {readOnly ? (
                    <Textarea
                      aria-label={`입력 ${index + 1}`}
                      value={input}
                      readOnly
                      className="min-h-[100px] resize-none"
                    />
                  ) : (
                    <Textarea
                      aria-label={`입력 ${index + 1}`}
                      value={input}
                      className="min-h-[100px] resize-none font-D2Coding"
                      onChange={(e) => {
                        handleChangeInput(index, e.target.value);
                      }}
                      placeholder="입력을 입력하세요"
                    />
                  )}
                  <span
                    className={`animate-fadeIn mb-2 inline-flex items-center whitespace-nowrap rounded-md border border-transparent px-2.5 py-1 text-xs font-bold shadow-xs ${
                      readOnly
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    출력 {index + 1}
                  </span>
                  {readOnly ? (
                    <Textarea
                      aria-label={`예상 출력 ${index + 1}`}
                      value={expected}
                      readOnly
                      className="min-h-[100px] resize-none"
                    />
                  ) : (
                    <Textarea
                      aria-label={`예상 출력 ${index + 1}`}
                      value={expected}
                      className="min-h-[100px] resize-none font-D2Coding"
                      onChange={(e) => {
                        handleChangeOutput(index, e.target.value);
                      }}
                      placeholder="출력을 입력하세요"
                    />
                  )}
                  {index + 1 < arr.length && (
                    <hr className="my-4 border-border" />
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-24">
                <p className="text-base font-semibold text-gray-600">
                  테스트 케이스가 없습니다.
                </p>
              </div>
            )}
          </div>

          {testCaseList.length < 10 ? (
            <div className="flex justify-center px-8 mb-5">
              <Button onClick={handleClickAddTestCase} className="w-full">
                테스트 케이스 추가
              </Button>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end gap-1 px-8 mb-4">
            <Button onClick={handleTest}>테스트</Button>
            <Button variant="secondary" onClick={handleClickClose}>
              완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
