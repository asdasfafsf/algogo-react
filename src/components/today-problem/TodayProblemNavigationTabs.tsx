import { FadeInSection } from '@components/common/FadeInSection';
import { TodayProblem } from '@/type/Problem.type';

interface TodayProblemNavigationTabsProps {
  problems: TodayProblem[];
  currentIndex: number;
  onProblemSelect: (index: number) => void;
}

export function TodayProblemNavigationTabs({
  problems,
  currentIndex,
  onProblemSelect,
}: TodayProblemNavigationTabsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '입문': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case '초급': return 'bg-blue-50 text-blue-600 border-blue-200';
      case '중급': return 'bg-amber-50 text-amber-600 border-amber-200';
      case '고급': return 'bg-rose-50 text-rose-600 border-rose-200';
      case '심화': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <FadeInSection className="px-6 mb-12 mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {problems.map((problem, index) => (
            <button
              key={problem.uuid}
              type="button"
              onClick={() => onProblemSelect(index)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                index === currentIndex
                  ? 'bg-slate-800 text-white border-slate-800 shadow-lg transform scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    문제
                    {' '}
                    {index + 1}
                  </span>
                  <div className={`text-xs px-2 py-1 rounded-full border font-medium ${
                    index === currentIndex
                      ? 'bg-white/20 text-white border-white/30'
                      : getDifficultyColor(problem.difficulty)
                  }`}
                  >
                    {problem.difficulty}
                  </div>
                </div>
                <div className="text-sm font-medium line-clamp-2">
                  {problem.title}
                </div>
                <div className="text-xs text-slate-500">
                  {problem.levelText}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}
