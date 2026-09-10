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
import ProblemBreadcrumbs from "@components/problem/ProblemBreadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import useProblemUpdate from "@hook/problem/useProblemUpdate";
import { formatProblemNumber } from "@/domain/problems/problemPresentation";

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
  const handleProblemUpdate = useProblemUpdate(problem);
  const formattedProblemNumber = formatProblemNumber(sourceId);
  const problemNumber =
    formattedProblemNumber === "-" ? undefined : formattedProblemNumber;
  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-background">
      <div className="shrink-0 border-b border-border/60 px-2 py-2">
        <ProblemBreadcrumbs
          pathList={[{ path: "전체 문제", to: "/problem" }]}
          current={problemNumber ? `문제 ${problemNumber}` : title}
        />
      </div>
      <Tabs defaultValue="description" className="flex min-h-0 flex-1 flex-col">
        <TabsList className="h-auto w-full shrink-0 justify-start overflow-x-auto rounded-none border-b border-border/60 bg-transparent p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent px-5 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            문제
          </TabsTrigger>
          <TabsTrigger
            value="solution"
            disabled
            title="풀이 기능은 준비 중입니다"
            className="rounded-none px-5 py-2.5"
          >
            풀이 <span className="ml-1 text-[11px]">준비 중</span>
          </TabsTrigger>
          <TabsTrigger
            value="submission"
            disabled
            title="제출 내역 기능은 준비 중입니다"
            className="rounded-none px-5 py-2.5"
          >
            제출 내역 <span className="ml-1 text-[11px]">준비 중</span>
          </TabsTrigger>
        </TabsList>
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
              <div className="flex items-center gap-1">
                <ProblemContentResizer />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  aria-label="문제 데이터 새로고침"
                  title="문제 데이터 새로고침"
                  onClick={handleProblemUpdate}
                >
                  <RefreshCw />
                </Button>
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
