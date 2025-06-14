import { Typography, Tooltip } from '@components/common';
import { Card } from '@components/Card';
import {
  useState, useMemo, useCallback, memo,
} from 'react';
import {
  ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon,
} from '@heroicons/react/24/outline';

interface ContributionData {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  data: ContributionData[];
}

const ContributionDay = memo(({ day, index, getContributionColor }: {
  day: ContributionData | null;
  index: number;
  getContributionColor: (count: number) => string;
}) => {
  if (!day) {
    return <div key={index} className="w-3 h-3 opacity-0 sm:w-4 sm:h-4" />;
  }

  const date = new Date(day.date);
  const tooltipContent = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일: ${day.count}개 활동`;

  return (
    <Tooltip key={index} content={tooltipContent}>
      <div
        className={`w-3 h-3 sm:w-4 sm:h-4 border transition-all duration-200 hover:scale-110 cursor-pointer ${getContributionColor(day.count)}`}
      />
    </Tooltip>
  );
});

const ContributionGraph = memo(({ data }: ContributionGraphProps) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [viewMode, setViewMode] = useState<'current' | 'yearly'>('current');

  const formatDateString = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const getCurrentYearData = useCallback(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    const currentData = [];
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = formatDateString(d);
      const existingData = data.find((item) => item.date === dateStr);
      currentData.push({
        date: dateStr,
        count: existingData ? existingData.count : Math.floor(Math.random() * 5),
      });
    }
    return currentData;
  }, [data, formatDateString]);

  const getYearData = useCallback((year: number) => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const yearData = [];

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = formatDateString(currentDate);
      const existingData = data.find((item) => item.date === dateStr);
      yearData.push({
        date: dateStr,
        count: existingData ? existingData.count : Math.floor(Math.random() * 5),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return yearData;
  }, [data, formatDateString]);

  const displayData = useMemo(
    () => (viewMode === 'current' ? getCurrentYearData() : getYearData(selectedYear)),
    [viewMode, getCurrentYearData, getYearData, selectedYear],
  );

  const getContributionColor = useCallback((count: number) => {
    if (count === 0) return 'bg-gray-100 border-gray-200';
    if (count === 1) return 'bg-emerald-200 border-emerald-300';
    if (count === 2) return 'bg-emerald-400 border-emerald-500';
    if (count === 3) return 'bg-emerald-600 border-emerald-700';
    return 'bg-emerald-800 border-emerald-900';
  }, []);

  const groupByWeeks = useCallback((contributionData: ContributionData[]) => {
    if (contributionData.length === 0) return [];

    const weeks: (ContributionData | null)[][] = [];

    if (viewMode === 'current') {
      const today = new Date();
      const startDate = new Date(contributionData[0].date);

      const startDayOfWeek = startDate.getDay();

      const firstSunday = new Date(startDate);
      firstSunday.setDate(startDate.getDate() - startDayOfWeek);

      const todayDayOfWeek = today.getDay();
      const lastSaturday = new Date(today);
      lastSaturday.setDate(today.getDate() + (6 - todayDayOfWeek));

      const currentDate = new Date(firstSunday);
      while (currentDate <= lastSaturday) {
        const week: (ContributionData | null)[] = [];

        for (let i = 0; i < 7; i += 1) {
          const dateStr = formatDateString(currentDate);
          const dayData = contributionData.find((item) => item.date === dateStr);

          if (dayData) {
            week.push(dayData);
          } else {
            week.push(null);
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        weeks.push(week);
      }
    } else {
      const year = selectedYear;
      const jan1 = new Date(year, 0, 1);
      const jan1DayOfWeek = jan1.getDay();

      const firstSunday = new Date(jan1);
      if (jan1DayOfWeek === 0) {
        firstSunday.setDate(1);
      } else {
        firstSunday.setDate(1 + (7 - jan1DayOfWeek));
      }

      const dec31 = new Date(year, 11, 31);
      const dec31DayOfWeek = dec31.getDay();
      const lastSaturday = new Date(dec31);
      lastSaturday.setDate(dec31.getDate() + (6 - dec31DayOfWeek));

      const currentDate = new Date(year, 0, 1);

      let week: (ContributionData | null)[] = [];

      for (let i = 0; i < jan1DayOfWeek; i += 1) {
        week.push(null);
      }

      while (currentDate.getFullYear() === year) {
        const dateStr = formatDateString(currentDate);
        const dayData = contributionData.find((item) => item.date === dateStr);
        week.push(dayData || null);

        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      while (week.length > 0 && week.length < 7) {
        week.push(null);
      }
      if (week.length > 0) {
        weeks.push(week);
      }
    }

    return weeks;
  }, [viewMode, selectedYear, formatDateString]);

  const weeks = useMemo(() => groupByWeeks(displayData), [groupByWeeks, displayData]);

  const getMonthPositions = useCallback((): Array<{ weekIndex: number; monthName: string }> => {
    if (weeks.length === 0) return [];

    const positions: Array<{ weekIndex: number; monthName: string }> = [];

    if (viewMode === 'current') {
      let currentMonth = -1;

      weeks.forEach((week, weekIndex) => {
        const firstValidDay = week.find((day) => day !== null);
        if (firstValidDay) {
          const date = new Date(firstValidDay.date);
          const month = date.getMonth();

          if (month !== currentMonth) {
            currentMonth = month;
            const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
            positions.push({
              weekIndex,
              monthName: monthNames[month],
            });
          }
        }
      });
    } else {
      let currentMonth = -1;

      weeks.forEach((week, weekIndex) => {
        const firstValidDay = week.find((day) => day !== null);
        if (firstValidDay) {
          const date = new Date(firstValidDay.date);
          const month = date.getMonth();

          if (month !== currentMonth) {
            currentMonth = month;
            const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
            positions.push({
              weekIndex,
              monthName: monthNames[month],
            });
          }
        }
      });
    }

    return positions;
  }, [weeks, viewMode]);

  const monthPositions = useMemo(() => getMonthPositions(), [getMonthPositions]);

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  const handlePrevYear = useCallback(() => {
    setSelectedYear((prev) => Math.max(2020, prev - 1));
  }, []);

  const handleNextYear = useCallback(() => {
    setSelectedYear((prev) => Math.min(currentYear, prev + 1));
  }, [currentYear]);

  const stats = useMemo(() => {
    const totalContributions = displayData.reduce((sum, day) => sum + day.count, 0);
    const activeDays = displayData.filter((day) => day.count > 0).length;
    const maxStreak = displayData.reduce((max, day, index) => {
      if (day.count === 0) return max;
      let streak = 1;
      for (let i = index + 1; i < displayData.length && displayData[i].count > 0; i += 1) {
        streak += 1;
      }
      return Math.max(max, streak);
    }, 0);

    return {
      total: totalContributions,
      activeDays,
      maxStreak,
    };
  }, [displayData]);

  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode('current')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                viewMode === 'current'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="hidden sm:inline">최근 1년</span>
              <span className="sm:hidden">최근</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('yearly')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                viewMode === 'yearly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              연도별
            </button>
          </div>

          {viewMode === 'yearly' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevYear}
                disabled={selectedYear <= 2020}
                className="p-1.5 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <Typography variant="medium" weight="semibold" className="min-w-[4rem] text-center text-gray-900">
                {selectedYear}
                년
              </Typography>
              <button
                type="button"
                onClick={handleNextYear}
                disabled={selectedYear >= currentYear}
                className="p-1.5 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="items-center justify-between hidden lg:flex">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <Typography variant="small" weight="regular" className="text-gray-600">
                총
                {' '}
                {stats.total}
                개 활동
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-500" />
              <Typography variant="small" weight="regular" className="text-gray-600">
                {stats.activeDays}
                일 활동
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Typography variant="small" weight="regular" className="text-gray-500">
              적음
            </Typography>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 border ${getContributionColor(level)}`}
                />
              ))}
            </div>
            <Typography variant="small" weight="regular" className="text-gray-500">
              많음
            </Typography>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="relative">
              <div className="flex gap-1 mb-2">
                <div className="flex-shrink-0 w-8" />
                {monthPositions.map((month) => (
                  <div
                    key={month.weekIndex}
                    className="text-xs font-medium text-gray-500"
                    style={{
                      position: 'absolute',
                      left: `${32 + month.weekIndex * 12}px`,
                      width: '12px',
                      textAlign: 'center',
                    }}
                  >
                    {month.monthName}
                  </div>
                ))}
              </div>

              <div className="flex gap-1">
                <div className="flex flex-col flex-shrink-0 w-8 gap-1">
                  {dayLabels.map((day, index) => (
                    <div
                      key={day}
                      className={`h-3 sm:h-4 flex items-center justify-center text-xs text-gray-500 font-medium ${
                        index % 2 === 1 ? '' : 'opacity-0'
                      }`}
                      style={{ width: '32px', textAlign: 'center' }}
                    >
                      {index % 2 === 1 ? day : ''}
                    </div>
                  ))}
                </div>

                <div className="flex gap-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1" style={{ width: '12px' }}>
                      {week.map((day, dayIndex) => (
                        <ContributionDay key={`${weekIndex}-${dayIndex}`} day={day} index={dayIndex} getContributionColor={getContributionColor} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <Typography variant="small" weight="regular" className="text-gray-600">
                  총
                  {' '}
                  {stats.total}
                  개 활동
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500" />
                <Typography variant="small" weight="regular" className="text-gray-600">
                  {stats.activeDays}
                  일 활동
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Typography variant="small" weight="regular" className="text-gray-500">
                적음
              </Typography>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 border ${getContributionColor(level)}`}
                  />
                ))}
              </div>
              <Typography variant="small" weight="regular" className="text-gray-500">
                많음
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

ContributionGraph.displayName = 'ContributionGraph';

export default ContributionGraph;
