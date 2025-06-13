import { Typography } from '@components/common';
import { FadeInSection } from '@components/common/FadeInSection';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export function TodayProblemEmptyState() {
  return (
    <div className="min-h-screen bg-white">
      <FadeInSection>
        <div className="px-6 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full">
                <CalendarDaysIcon className="w-10 h-10 text-slate-400" />
              </div>
            </div>

            <Typography variant="h2" className="mb-4 text-slate-800" weight="bold">
              오늘의 문제가 없습니다
            </Typography>

            <Typography variant="paragraph" className="text-slate-600 mb-8">
              현재 등록된 오늘의 문제가 없습니다.
              <br />
              새로운 문제가 등록될 때까지 조금만 기다려주세요.
            </Typography>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
              <span className="text-sm text-slate-600">
                문제는 매일 UTC 기준 자정에 갱신됩니다
              </span>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
