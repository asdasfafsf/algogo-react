import { DefaultLayout } from '@layout/index';
import { useState, useEffect, useCallback } from 'react';
import {
  TodayProblemHeader,
  TodayProblemNavigationTabs,
  TodayProblemCard,
} from '@components/today-problem';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { getTodayProblems } from '@api/problems-v2';
import useLoadingModal from '@hook/modal/useLoadingModal';
import { TodayProblem } from '@/type/Problem.type';

function App() {
  const [todayProblems, setTodayProblems] = useState<TodayProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const currentProblem = todayProblems[currentProblemIndex];
  const { startLoading, endLoading } = useLoadingModal();
  const updateTodayProblems = useCallback(async () => {
    startLoading();
    try {
      const response = await getTodayProblems();
      const todayProblems = response.data;
      setTodayProblems(todayProblems);
    } finally {
      endLoading();
    }
  }, []);

  useEffect(() => {
    updateTodayProblems();
  }, []);

  const nextProblem = () => {
    setCurrentProblemIndex((prev) => (prev + 1) % todayProblems.length);
  };

  const prevProblem = () => {
    setCurrentProblemIndex((prev) => (prev - 1 + todayProblems.length) % todayProblems.length);
  };

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
              problem={currentProblem}
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
