import { DefaultLayout } from "@layout/index";
import {
  TodayProblemCard,
  TodayProblemEmptyState,
  TodayProblemHeader,
  TodayProblemNavigationTabs,
  TodayProblemRoster,
  TodayProblemSkeleton,
} from "@components/today-problem";
import { Tabs, TabsContent } from "@components/ui/tabs";
import { useTodayProblem } from "@hook/today-problem/useTodayProblem";

export default function TodayProblem() {
  const {
    todayProblems,
    currentProblemIndex,
    selectedProblem,
    selectedProblemDetail,
    setCurrentProblemIndex,
    isLoading,
    isError,
    isDetailLoading,
  } = useTodayProblem();

  return (
    <DefaultLayout>
      <div className="py-8 pb-10">
        {isLoading ? (
          <TodayProblemSkeleton />
        ) : (
          <>
            <TodayProblemHeader problems={todayProblems} />

            {isError ? (
              <TodayProblemEmptyState variant="error" />
            ) : todayProblems.length === 0 ? (
              <TodayProblemEmptyState />
            ) : (
              <Tabs
                value={selectedProblem?.uuid ?? todayProblems[0].uuid}
                onValueChange={(problemUuid) => {
                  const nextIndex = todayProblems.findIndex(
                    (problem) => problem.uuid === problemUuid,
                  );
                  if (nextIndex >= 0) setCurrentProblemIndex(nextIndex);
                }}
              >
                <div className="mt-4 w-full sm:mt-5">
                  <TodayProblemNavigationTabs
                    problems={todayProblems}
                    currentIndex={currentProblemIndex}
                  />
                </div>

                {todayProblems.map((problem) => (
                  <TabsContent
                    key={problem.uuid}
                    value={problem.uuid}
                    className="mt-7 data-[state=active]:animate-fade-in sm:mt-9"
                  >
                    {selectedProblem?.uuid === problem.uuid && (
                      <>
                        <TodayProblemCard
                          problem={selectedProblem}
                          index={currentProblemIndex}
                          content={selectedProblemDetail?.content}
                          isContentLoading={isDetailLoading}
                        />
                        <div className="mt-5">
                          <TodayProblemRoster
                            problems={todayProblems}
                            currentIndex={currentProblemIndex}
                            onProblemSelect={setCurrentProblemIndex}
                          />
                        </div>
                      </>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
