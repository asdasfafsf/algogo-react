import { DefaultLayout } from '@layout/index';
import {
  TodayProblemHeader,
  TodayProblemNavigationTabs,
  TodayProblemCard,
  TodayProblemEmptyState,
} from '@components/today-problem';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useTodayProblem } from '@hook/today-problem/useTodayProblem';
import { IconButton } from '@components/Button';

function App() {
  const {
    todayProblems,
    currentProblemIndex,
    nextProblem,
    prevProblem,
    setCurrentProblemIndex,
    isLoading,
    isFetched,
  } = useTodayProblem();

  return (
    <DefaultLayout>
      {!isLoading && isFetched && todayProblems.length === 0 && (
        <TodayProblemEmptyState />
      )}

      {!isLoading && todayProblems.length > 0 && (
        <div className="min-h-screen bg-white">
          <TodayProblemHeader
            totalProblems={todayProblems.length}
          />

          <TodayProblemNavigationTabs
            problems={todayProblems}
            currentIndex={currentProblemIndex}
            onProblemSelect={setCurrentProblemIndex}
          />

          <div className="relative">
            <IconButton
              onClick={prevProblem}
              color="white"
              rounded="full"
              className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 bg-white border rounded-full left-4 top-1/2 border-slate-200 hover:border-slate-300 "
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
            </IconButton>

            <IconButton
              onClick={nextProblem}
              color="white"
              rounded="full"
              className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 bg-white border rounded-full right-4 top-1/2 border-slate-200 hover:border-slate-300"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600" />
            </IconButton>

            <TodayProblemCard
              problem={todayProblems[currentProblemIndex]}
            />
          </div>

          <div className="px-6 mb-20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <div className="flex gap-1">
                  {todayProblems.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentProblemIndex
                          ? 'bg-slate-800'
                          : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default App;
