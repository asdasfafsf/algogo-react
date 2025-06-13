import { Typography } from '@components/common';
import { Card } from '@components/Card';
import { FadeInSection } from '@components/common/FadeInSection';
import { TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface TodayProblemInfoCardsProps {
  currentIndex: number;
  totalProblems: number;
}

export function TodayProblemInfoCards({ currentIndex, totalProblems }: TodayProblemInfoCardsProps) {
  const progressPercentage = Math.round(((currentIndex + 1) / totalProblems) * 100);

  return (
    <FadeInSection className="px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 도전 현황 */}
          <Card className="text-white border-0 bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrophyIcon className="w-6 h-6" />
                <Typography variant="h6" weight="bold" className="text-white">
                  오늘의 도전
                </Typography>
              </div>
              <Typography variant="paragraph" className="mb-4 text-indigo-100">
                {totalProblems}
                개의 다양한 난이도 문제로 실력을 키워보세요!
              </Typography>
              <div className="flex items-center gap-2">
                <div className="w-full h-2 rounded-full bg-white/20">
                  <div
                    className="h-2 transition-all duration-500 bg-white rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {progressPercentage}
                  %
                </span>
              </div>
            </div>
          </Card>

          {/* 팁 */}
          <Card className="text-white border-0 bg-gradient-to-br from-amber-500 to-orange-600">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <SparklesIcon className="w-6 h-6" />
                <Typography variant="h6" weight="bold" className="text-white">
                  오늘의 팁
                </Typography>
              </div>
              <Typography variant="paragraph" className="text-amber-100">
                입문 → 중급 → 고급 순서로 도전하며 점진적으로 실력을 늘려가세요!
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </FadeInSection>
  );
}
