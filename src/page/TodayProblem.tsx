import { DefaultLayout } from "@layout/index";
import {
  TodayProblemCard,
  TodayProblemEmptyState,
  TodayProblemHeader,
  TodayProblemNavigationTabs,
  TodayProblemRoster,
  TodayProblemSkeleton,
} from "@components/today-problem";
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
              <>
                <div className="mt-4 w-full sm:mt-5">
                  <TodayProblemNavigationTabs
                    problems={todayProblems}
                    currentIndex={currentProblemIndex}
                    onProblemSelect={setCurrentProblemIndex}
                  />
                </div>

                {selectedProblem && (
                  <div className="mt-7 animate-fade-in sm:mt-9">
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
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
