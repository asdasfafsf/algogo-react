import { Typography } from '@components/common';
import { Card } from '@components/Card';
import { FadeInSection } from '@components/common/FadeInSection';

interface TodayProblemProgressSectionProps {
  currentIndex: number;
  totalProblems: number;
}

export function TodayProblemProgressSection({
  currentIndex,
  totalProblems,
}: TodayProblemProgressSectionProps) {
  const progressPercentage = ((currentIndex + 1) / totalProblems) * 100;

  return (
    <FadeInSection className="px-6 mb-12">
      <div className="max-w-4xl mx-auto">
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h6" weight="bold" className="text-blue-900">
                오늘의 진행 상황
              </Typography>
              <Typography variant="small" className="text-blue-600">
                {currentIndex + 1}
                {' '}
                /
                {' '}
                {totalProblems}
                {' '}
                완료
              </Typography>
            </div>
            <div className="w-full h-3 bg-blue-200 rounded-full">
              <div
                className="h-3 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    </FadeInSection>
  );
}
