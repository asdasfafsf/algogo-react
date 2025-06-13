import { DefaultLayout } from '@layout/index';
import {
  TodayProblemHeader,
  TodayProblemNavigationTabs,
  TodayProblemCard,
} from '@components/today-problem';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useTodayProblem } from '@hook/today-problem/useTodayProblem';

function App() {
  const {
    todayProblems, currentProblemIndex, nextProblem, prevProblem, setCurrentProblemIndex,
  } = useTodayProblem();

  return (
    <DefaultLayout>
      {todayProblems.length > 0 && (
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
            <button
              type="button"
              onClick={prevProblem}
              className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 bg-white border rounded-full left-4 top-1/2 border-slate-200 hover:border-slate-300 hover:shadow-md"
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
            </button>

            <button
              type="button"
              onClick={nextProblem}
              className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 bg-white border rounded-full right-4 top-1/2 border-slate-200 hover:border-slate-300 hover:shadow-md"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600" />
            </button>

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
