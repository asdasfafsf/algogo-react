import { Typography } from '@components/common';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { FadeInSection } from '@components/common/FadeInSection';
import { ProblemLevelChip } from '@components/Chip';
import {
  CalendarIcon,
  TrophyIcon,
  UserGroupIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { TodayProblem } from '@/type/Problem.type';

interface TodayProblemCardProps {
  problem: TodayProblem;
  onSolve?: () => void;
  onViewDetail?: () => void;
}

export function TodayProblemCard({
  problem,
  onSolve,
  onViewDetail,
}: TodayProblemCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '입문': return 'bg-green-100 text-green-700 border-green-200';
      case '중급': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '고급': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <FadeInSection className="px-6 mb-12">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
          <div className="p-8">
            {/* 문제 헤더 */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <ProblemLevelChip level={problem.levelText as ProblemLevel} />
                  <span className="text-sm text-gray-500">
                    #
                    {problem.sourceId}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <Typography variant="h3" weight="bold" className="mb-3 text-gray-900">
                  {problem.title}
                </Typography>
              </div>
              <div className="flex flex-col items-center gap-2 ml-6">
                <CalendarIcon className="w-12 h-12 text-blue-500" />
              </div>
            </div>

            {/* 태그
            <div className="flex flex-wrap gap-2 mb-6">
              {problem.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div> */}

            {/* 통계 정보 */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <TrophyIcon className="w-8 h-8 text-green-600" />
                <div>
                  <Typography variant="small" className="font-medium text-green-600">
                    정답률
                  </Typography>
                  <Typography variant="h6" weight="bold" className="text-green-700">
                    {problem.answerRate}
                    %
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <UserGroupIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <Typography variant="small" className="font-medium text-blue-600">
                    제출 수
                  </Typography>
                  <Typography variant="h6" weight="bold" className="text-blue-700">
                    {problem.submitCount.toLocaleString()}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                <SparklesIcon className="w-8 h-8 text-purple-600" />
                <div>
                  <Typography variant="small" className="font-medium text-purple-600">
                    정답 수
                  </Typography>
                  <Typography variant="h6" weight="bold" className="text-purple-700">
                    {problem.answerCount.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="gradient"
                color="blue"
                size="large"
                className="flex-1"
                icon={<ArrowRightIcon className="w-5 h-5" />}
                iconPosition="right"
                onClick={onSolve}
              >
                문제 풀어보기
              </Button>
              <Button
                variant="outlined"
                color="gray"
                size="large"
                className="sm:w-auto"
                onClick={onViewDetail}
              >
                문제 상세보기
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </FadeInSection>
  );
}
