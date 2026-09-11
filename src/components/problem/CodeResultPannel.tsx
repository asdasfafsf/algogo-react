import { memo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useExecute from "@hook/useExecute";
import useCodeResultPanel from "@hook/useCodeResultPanel";
import CodeEditorResizer from "./CodeEditorResizer";
import CodeResultInput from "./CodeResultInput";
import CodeResultOutput from "./CodeResultOutput";
import CodeTestCaseTable from "./CodeTestCaseTable";
function CodeResultPannel() {
  const {
    input,
    output,
    handleChangeInput,
    handleClickPasteInput,
    selectedIndex,
    handleClickTab,
    inputTextAreaRef,
    handleClickCopyOutput,
    handleClickResetOutput,
    testCaseList,
    isInputPastePending,
    isOutputCopyPending,
  } = useCodeResultPanel();
  const { handleExecute } = useExecute();
  return (
    <div className="h-full w-full overflow-hidden bg-background text-foreground">
      <CodeEditorResizer />
      <Tabs
        value={String(selectedIndex)}
        onValueChange={(value) => handleClickTab(Number(value))}
        className="flex h-[calc(100%-10px)] flex-col"
      >
        <TabsList
          aria-label="코드 실행 패널"
          className="h-10 w-full shrink-0 justify-start rounded-none border-b border-border bg-background px-2"
        >
          <TabsTrigger
            value="0"
            className="rounded-none border-b-2 border-transparent text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            입력
          </TabsTrigger>
          <TabsTrigger
            value="1"
            className="rounded-none border-b-2 border-transparent text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            실행 결과
          </TabsTrigger>
          <TabsTrigger
            value="2"
            className="rounded-none border-b-2 border-transparent text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            테스트 케이스
          </TabsTrigger>
        </TabsList>
        <TabsContent value="0" className="m-0 min-h-0 flex-1">
          <CodeResultInput
            onRun={() => handleExecute()}
            onPaste={handleClickPasteInput}
            onInputChange={handleChangeInput}
            input={input}
            inputTextAreaRef={inputTextAreaRef}
            pastePending={isInputPastePending}
          />
        </TabsContent>
        <TabsContent value="1" className="m-0 min-h-0 flex-1">
          <CodeResultOutput
            output={output}
            handleClickRun={() => handleExecute()}
            handleClickCopy={handleClickCopyOutput}
            handleClickReset={handleClickResetOutput}
            copyPending={isOutputCopyPending}
          />
        </TabsContent>
        <TabsContent value="2" className="m-0 min-h-0 flex-1">
          <CodeTestCaseTable executeResultList={testCaseList} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default memo(CodeResultPannel);
