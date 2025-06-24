import { FadeInSection } from '@components/common/FadeInSection';
import { ProblemDifficultyChip } from '@components/Chip/ProblemDifficultyChip';
import {
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
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
  const getCardStyle = (state: string, isActive: boolean) => {
    if (isActive) {
      return 'bg-slate-800 text-white border-slate-800 shadow-lg transform scale-105';
    }

    switch (state) {
      case PROBLEM_STATE.SOLVED:
        return 'bg-white border-green-200/40 hover:border-green-300/60 hover:shadow-md';
      case PROBLEM_STATE.FAILED:
        return 'bg-white border-red-200/40 hover:border-red-300/60 hover:shadow-md';
      case PROBLEM_STATE.NONE:
      default:
        return 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md';
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
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${getCardStyle(problem.state, index === currentIndex)}`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-slate-500">
                      문제
                      {' '}
                      {index + 1}
                    </span>
                  </div>
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
