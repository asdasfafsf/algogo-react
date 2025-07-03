import { Typography } from '@components/common';
import {
  ClockIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TodayProblemHeaderProps {
  totalProblems: number;
}

const DateDisplay = memo(({ currentTime }: { currentTime: Date }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, [currentTime]);

  const formatDate = (d: Date) => new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(d);

  return (
    <span
      className={`text-sm font-medium text-slate-600 transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {formatDate(currentTime)}
    </span>
  );
});
DateDisplay.displayName = 'DateDisplay';

const CountdownTimer = memo(() => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeUntilMidnight = () => {
    const utcMidnight = new Date();
    utcMidnight.setUTCHours(24, 0, 0, 0);
    const diff = utcMidnight.getTime() - currentTime.getTime();
    const h = Math.floor(diff / 3600000)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((diff % 3600000) / 60000)
      .toString()
      .padStart(2, '0');
    const s = Math.floor((diff % 60000) / 1000)
      .toString()
      .padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="font-mono text-sm font-bold text-slate-800">
      {getTimeUntilMidnight()}
    </div>
  );
});
CountdownTimer.displayName = 'CountdownTimer';

export const TodayProblemHeader = memo(
  ({ totalProblems }: TodayProblemHeaderProps) => {
    const [searchParam, setSearchParam] = useSearchParams();
    const day = Number(searchParam.get('day') ?? 0);

    const calcDate = (d: number) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + d);
      return date;
    };

    const [currentTime, setCurrentTime] = useState(calcDate(day));

    useEffect(() => {
      setCurrentTime(calcDate(day));
    }, [day]);

    const handleNextDay = () => {
      // 오늘(day=0)보다 미래로는 이동할 수 없도록 제한
      if (day >= 0) return;

      setSearchParam((prev) => {
        const v = Number(prev.get('day') ?? 0) + 1;
        prev.set('day', v.toString());
        return prev;
      });
    };

    const handlePrevDay = () => {
      setSearchParam((prev) => {
        const v = Number(prev.get('day') ?? 0) - 1;
        prev.set('day', v.toString());
        return prev;
      });
    };

    return (
      <div className="relative px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/60 to-purple-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full shadow-sm bg-white/80 backdrop-blur-sm border-slate-200/50">
            <button
              type="button"
              className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-slate-100 transition-colors"
              onClick={handlePrevDay}
            >
              <ChevronLeftIcon className="w-3 h-3 text-slate-500" />
            </button>
            <CalendarDaysIcon className="w-4 h-4 text-slate-500" />
            <DateDisplay currentTime={currentTime} />
            <button
              type="button"
              onClick={handleNextDay}
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                day >= 0
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-slate-100'
              }`}
              disabled={day >= 0}
            >
              <ChevronRightIcon className="w-3 h-3 text-slate-500" />
            </button>
          </div>

          <div className="mb-8">
            <Typography
              variant="h1"
              className="mb-2 text-4xl font-bold md:text-5xl text-slate-900"
              weight="bold"
            >
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
                <CountdownTimer />
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 border shadow-sm bg-white/90 backdrop-blur-sm rounded-xl border-slate-200/50">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                <span className="text-sm font-bold text-purple-600">
                  {totalProblems}
                </span>
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
    );
  },
);
TodayProblemHeader.displayName = 'TodayProblemHeader';
