import { FadeInSection } from '@components/common/FadeInSection';
import { ProblemDifficultyChip } from '@components/Chip/ProblemDifficultyChip';
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
  return (
    <FadeInSection className="px-6 mt-8 mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                  <ProblemDifficultyChip
                    difficulty={problem.difficulty}
                    variant={index === currentIndex ? 'selected' : 'default'}
                  />
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
