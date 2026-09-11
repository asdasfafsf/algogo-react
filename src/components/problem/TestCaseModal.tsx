import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useTestCase from "@hook/useTestCase";
import useExecuteTestCase from "@hook/useExecuteTestCase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ModalComponentProps } from "@plugins/modal/ModalController";

const MAX_TEST_CASES = 10;

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
      <DialogContent className="flex max-h-[90dvh] max-w-2xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b border-border px-5 py-5 pr-12 text-left sm:px-8 sm:py-6 sm:pr-14">
          <div className="flex items-baseline justify-between gap-4">
            <DialogTitle>테스트 케이스</DialogTitle>
            <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
              {testCaseList.length} / {MAX_TEST_CASES}
            </span>
          </div>
          <DialogDescription>
            입력과 예상 출력을 추가하고 테스트합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8">
          {testCaseList.length ? (
            testCaseList.map(({ input, expected, readOnly }, index) => {
              const inputId = `test-case-${index}-input`;
              const expectedId = `test-case-${index}-expected`;
              const headingId = `test-case-${index}-heading`;
              const textareaClassName = `min-h-28 resize-none font-D2Coding ${
                readOnly ? "bg-muted/30 text-muted-foreground" : ""
              }`;

              return (
                <section
                  key={index}
                  aria-labelledby={headingId}
                  className="border-b border-border py-5 sm:py-6"
                >
                  <div className="mb-4 grid min-h-9 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="flex min-w-0 items-baseline gap-2.5">
                      <h3
                        id={headingId}
                        className="text-sm font-semibold text-foreground"
                      >
                        케이스 {index + 1}
                      </h3>
                      {readOnly && (
                        <span className="text-xs font-medium text-muted-foreground">
                          기본 제공
                        </span>
                      )}
                    </div>
                    {!readOnly && (
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`테스트 케이스 ${index + 1} 삭제`}
                        onClick={() => removeTestCase(index)}
                        className="h-8 justify-self-end px-2.5 font-medium text-muted-foreground hover:text-destructive"
                      >
                        삭제
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor={inputId}
                        className="block text-xs font-semibold text-foreground"
                      >
                        입력
                      </label>
                      <Textarea
                        id={inputId}
                        value={input}
                        readOnly={readOnly}
                        className={textareaClassName}
                        onChange={(event) => {
                          handleChangeInput(index, event.target.value);
                        }}
                        placeholder="입력을 입력하세요"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor={expectedId}
                        className="block text-xs font-semibold text-foreground"
                      >
                        예상 출력
                      </label>
                      <Textarea
                        id={expectedId}
                        value={expected}
                        readOnly={readOnly}
                        className={textareaClassName}
                        onChange={(event) => {
                          handleChangeOutput(index, event.target.value);
                        }}
                        placeholder="예상 출력을 입력하세요"
                      />
                    </div>
                  </div>
                </section>
              );
            })
          ) : (
            <div className="flex min-h-36 flex-col items-center justify-center gap-1 text-center">
              <p className="text-sm font-semibold text-foreground">
                테스트 케이스가 없습니다.
              </p>
              <p className="text-xs text-muted-foreground">
                입력과 예상 출력을 직접 추가해 보세요.
              </p>
            </div>
          )}

          <div className="py-5 sm:py-6">
            <Button
              variant="outline"
              onClick={handleClickAddTestCase}
              disabled={testCaseList.length >= MAX_TEST_CASES}
              className="w-full border-dashed"
            >
              {testCaseList.length >= MAX_TEST_CASES
                ? "최대 10개까지 추가할 수 있습니다"
                : "테스트 케이스 추가"}
            </Button>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 z-10 shrink-0 flex-row gap-2 border-t border-border bg-background/95 px-5 py-4 backdrop-blur-sm sm:px-8 sm:py-5">
          <Button
            variant="outline"
            onClick={handleClickClose}
            className="flex-1 sm:flex-none"
          >
            완료
          </Button>
          <Button onClick={handleTest} className="flex-1 sm:flex-none">
            테스트
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
