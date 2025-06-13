import { Typography } from '@components/common';
import { FadeInSection } from '@components/common/FadeInSection';
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface TodayProblemHeaderProps {
  currentTime: Date;
  getTimeUntilMidnight: () => string;
  totalProblems: number;
}

export function TodayProblemHeader({
  currentTime,
  getTimeUntilMidnight,
  totalProblems,
}: TodayProblemHeaderProps) {
  const formatDate = (date: Date) => new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);

  return (
    <FadeInSection>
      <div className="relative px-6 py-16 overflow-hidden">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/60 to-purple-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* 날짜 표시 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm">
            <CalendarDaysIcon className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">
              {formatDate(currentTime)}
            </span>
          </div>

          {/* 메인 타이틀 */}
          <div className="mb-8">
            <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-slate-900 mb-2" weight="bold">
              오늘의 문제
            </Typography>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </div>

          {/* 정보 카드들 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <ClockIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  새로운 문제까지
                </div>
                <div className="text-sm font-bold text-slate-800 font-mono">
                  {getTimeUntilMidnight()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                <span className="text-sm font-bold text-purple-600">{totalProblems}</span>
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  총 문제 수
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {totalProblems}
                  개의 문제
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
