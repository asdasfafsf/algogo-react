import { Progress } from "@/components/ui/progress";
import { Typography } from "@components/common";
import { Card } from "@components/Card";
import { FadeInSection } from "@components/common/FadeInSection";
import { todayProblemProgress } from "@/domain/problems";

interface TodayProblemProgressSectionProps {
  currentIndex: number;
  totalProblems: number;
}

export function TodayProblemProgressSection({
  currentIndex,
  totalProblems,
}: TodayProblemProgressSectionProps) {
  const progressPercentage = todayProblemProgress(currentIndex, totalProblems);

  return (
    <FadeInSection className="px-6 mb-12">
      <div className="max-w-4xl mx-auto">
        <Card className="border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h6" weight="bold" className="text-blue-900">
                오늘의 진행 상황
              </Typography>
              <Typography variant="small" className="text-blue-600">
                {currentIndex + 1} / {totalProblems} 완료
              </Typography>
            </div>
            <Progress
              value={progressPercentage}
              aria-label="오늘의 진행 상황"
              className="h-3"
            />
          </div>
        </Card>
      </div>
    </FadeInSection>
  );
}
