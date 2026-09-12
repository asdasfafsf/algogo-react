import ProblemInputOutputList from "@components/problem/ProblemInputOutputList";
import ProblemInputOutput from "@components/problem/ProblemInputOutput";
import ProblemTitle from "@components/problem/ProblemTitle";
import ProblemInfo from "@components/problem/ProblemInfo";
import ProblemSource from "@components/problem/ProblemSource";
import ProblemCategoryViewer from "@components/problem/ProblemCategoryViewer";
import React from "react";
import ProblemContentResizer from "@components/problem/ProblemContentSizeResizer";
import { useProblemContentSizeStore } from "@zustand/ProblemContentSizeStore";
import ProblemContentWrapper from "@components/problem/ProblemContentWrapper";
import { Problem as ProblemType } from "@/type/Problem.type";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { formatProblemNumber } from "@/domain/problems/problemPresentation";
import ProblemTabsList from "@components/problem/ProblemTabsList";
import useProblemUpdate from "@hook/problem/useProblemUpdate";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProblemProps {
  problem: ProblemType;
}

function Problem({ problem }: ProblemProps) {
  const {
    title,
    level,
    levelText,
    submitCount,
    typeList,
    content,
    input,
    output,
    inputOutputList,
    answerRate,
    timeout,
    memoryLimit,
    answerCount,
    answerPeopleCount,
    limit,
    hint,
    subTaskList,
    customExample,
    customImplementation,
    customGrader,
    customNotes,
    customAttachment,
    problemSource,
    sourceId,
    state,
  } = problem;

  const problemContentSize = useProblemContentSizeStore((state) => state.size);
  const formattedProblemNumber = formatProblemNumber(sourceId);
  const problemNumber =
    formattedProblemNumber === "-" ? undefined : formattedProblemNumber;
  const handleClickUpdate = useProblemUpdate(problem);

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-background">
      <Tabs defaultValue="description" className="flex min-h-0 flex-1 flex-col">
        <ProblemTabsList />
        <TabsContent
          value="description"
          className="m-0 min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-8 px-5 py-6 pb-12 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ProblemTitle
                scale={problemContentSize / 100}
                title={title}
                number={problemNumber}
                state={state}
              />
              <div className="flex shrink-0 items-center gap-1.5">
                <ProblemContentResizer />
                <TooltipProvider delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="문제 새로고침"
                        onClick={handleClickUpdate}
                        className="size-8 cursor-pointer rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed"
                      >
                        <RefreshCw aria-hidden="true" className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="end">
                      문제 새로고침
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <ProblemInfo
              level={level}
              levelText={levelText}
              submitCount={submitCount}
              answerCount={answerCount}
              answerRate={answerRate}
              timeout={timeout}
              memoryLimit={memoryLimit}
              answerPeopleCount={answerPeopleCount}
            />
            <ProblemContentWrapper
              title="문제 설명"
              scale={problemContentSize / 100}
              content={content}
            />

            {customExample && (
              <ProblemContentWrapper title="예시" content={customExample} />
            )}

            {customImplementation && (
              <ProblemContentWrapper
                title="구현"
                content={customImplementation}
              />
            )}

            {customGrader && (
              <ProblemContentWrapper title="채점 방식" content={customGrader} />
            )}

            {limit && <ProblemContentWrapper title="제한" content={limit} />}

            {(input || output) && (
              <ProblemInputOutput
                input={input ?? ""}
                output={output ?? ""}
                scale={problemContentSize / 100}
              />
            )}
            <ProblemInputOutputList inputOutputList={inputOutputList} />

            {subTaskList.map((subTask) => (
              <ProblemContentWrapper
                key={`${subTask.order}-${subTask.title}`}
                title={subTask.title}
                content={subTask.content}
              />
            ))}

            {customNotes && (
              <ProblemContentWrapper
                title="테스트용 입력 형식"
                content={customNotes}
              />
            )}

            {customAttachment && (
              <ProblemContentWrapper
                title="첨부파일"
                content={customAttachment}
              />
            )}
            {hint && <ProblemContentWrapper title="힌트" content={hint} />}

            <ProblemCategoryViewer
              initialState={typeList.length === 0 ? "none" : "hide"}
              categoryList={typeList}
            />
            {problemSource ? (
              <ProblemContentWrapper title="출처" content={problemSource} />
            ) : (
              <ProblemSource />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default React.memo(Problem);
