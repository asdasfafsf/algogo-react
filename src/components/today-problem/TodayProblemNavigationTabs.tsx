import { FadeInSection } from '@components/common/FadeInSection';
import { ProblemDifficultyChip } from '@components/Chip/ProblemDifficultyChip';
import { TodayProblem } from '@/type/Problem.type';
import { PROBLEM_STATE } from '@/constant/problem.state.constant';

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
  const getProblemNumberColor = (state: string, isActive: boolean) => {
    if (isActive) {
      return 'text-white/80';
    }

    return 'text-slate-500';
  };

  const getCardBorderColor = (state: string, isActive: boolean) => {
    if (isActive) {
      return 'border-slate-800';
    }

    switch (state) {
      case PROBLEM_STATE.SOLVED:
        return 'border-green-100 hover:border-green-400';
      case PROBLEM_STATE.FAILED:
        return 'border-red-100 hover:border-red-400';
      case PROBLEM_STATE.NONE:
      default:
        return 'border-slate-200 hover:border-slate-300';
    }
  };

  return (
    <FadeInSection className="px-6 mt-8 mb-12">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {problems.map((problem, index) => (
            <button
              key={problem.uuid}
              type="button"
              onClick={() => onProblemSelect(index)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                index === currentIndex
                  ? `bg-slate-800 text-white shadow-lg transform scale-105 ${getCardBorderColor(problem.state, true)}`
                  : `bg-white text-slate-700 hover:shadow-md ${getCardBorderColor(problem.state, false)}`
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-medium ${getProblemNumberColor(problem.state, index === currentIndex)}`}>
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
