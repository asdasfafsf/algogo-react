import { Typography } from '@components/common';
import { FadeInSection } from '@components/common/FadeInSection';
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface TodayProblemHeaderProps {
  totalProblems: number;
}

export function TodayProblemHeader({
  totalProblems,
}: TodayProblemHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);

  const getTimeUntilMidnight = () => {
    const now = new Date();
    // UTC 기준 다음 날 자정 계산
    const utcMidnight = new Date();
    utcMidnight.setUTCHours(24, 0, 0, 0);
    const diff = utcMidnight.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <FadeInSection>
      <div className="relative px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/60 to-purple-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full shadow-sm bg-white/80 backdrop-blur-sm border-slate-200/50">
            <CalendarDaysIcon className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">
              {formatDate(currentTime)}
            </span>
          </div>

          <div className="mb-8">
            <Typography variant="h1" className="mb-2 text-4xl font-bold md:text-5xl text-slate-900" weight="bold">
              오늘의 문제
            </Typography>
            <div className="w-20 h-1 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <Typography variant="small" className="text-slate-500">
              매일 UTC 기준 자정에 새로운 문제로 갱신됩니다
            </Typography>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-3 px-6 py-3 border shadow-sm bg-white/90 backdrop-blur-sm rounded-xl border-slate-200/50">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <ClockIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-medium tracking-wide uppercase text-slate-500">
                  새로운 문제까지
                </div>
                <div className="font-mono text-sm font-bold text-slate-800">
                  {getTimeUntilMidnight()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 border shadow-sm bg-white/90 backdrop-blur-sm rounded-xl border-slate-200/50">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                <span className="text-sm font-bold text-purple-600">{totalProblems}</span>
              </div>
              <div className="text-left">
                <div className="text-xs font-medium tracking-wide uppercase text-slate-500">
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
