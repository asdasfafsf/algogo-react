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

const ContributionDay = memo(({
  day,
  index,
  getContributionColor,
}: {
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
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm border transition-all duration-200 hover:scale-110 cursor-pointer ${getContributionColor(day.count)}`}
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
        count: existingData ? existingData.count : 0,
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
        count: existingData ? existingData.count : 0,
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

  return (
    <Card className="overflow-hidden transition-all duration-300 border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <Typography variant="h4" weight="bold" className="mb-2 text-gray-900">
              활동 기록
            </Typography>
            <Typography variant="medium" weight="regular" className="text-gray-600">
              {viewMode === 'current'
                ? '최근 1년간의 문제 해결 활동을 확인해보세요'
                : `${selectedYear}년 문제 해결 활동을 확인해보세요`}
            </Typography>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center p-1 bg-white border border-gray-200 shadow-sm rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('current')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'current'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <span className="hidden sm:inline">최근 1년</span>
                <span className="sm:hidden">1년</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('yearly')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'yearly'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden sm:inline">연도별</span>
                <span className="sm:hidden">연도</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              {viewMode === 'yearly' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevYear}
                    disabled={selectedYear <= 2020}
                    className="p-2 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <Typography variant="medium" weight="semibold" className="text-gray-900">
                      {selectedYear}
                      년
                    </Typography>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextYear}
                    disabled={selectedYear >= currentYear}
                    className="p-2 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}

              <div className="items-center hidden gap-2 text-sm text-gray-500 lg:flex">
                <Typography variant="small" weight="regular">적음</Typography>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-gray-100 border-gray-200 rounded-sm" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-200 border-emerald-300" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-400 border-emerald-500" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-600 border-emerald-700" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-800 border-emerald-900" />
                </div>
                <Typography variant="small" weight="regular">많음</Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 overflow-x-auto bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-6">
          <div className="flex gap-1 mb-2 ml-12 w-[1050px]">
            {weeks.map((_, weekIndex) => {
              const monthPos = monthPositions.find((pos) => pos.weekIndex === weekIndex);
              return (
                <div key={weekIndex} className="relative w-4 h-4 overflow-visible text-xs text-center text-gray-600">
                  <Typography variant="small" weight="regular" className="absolute top-0 text-gray-600 transform -translate-x-1/2 left-1/2 whitespace-nowrap">
                    {monthPos ? monthPos.monthName : ''}
                  </Typography>
                </div>
              );
            })}
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col gap-1 mr-2">
              {dayLabels.map((day, index) => (
                <div key={index} className="flex items-center h-3 sm:h-4">
                  <Typography variant="small" weight="regular" className="w-6 text-xs text-center text-gray-500 sm:w-8">
                    {day}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="flex justify-center flex-1 gap-1 overflow-visible">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1 overflow-visible">
                  {week.map((day, dayIndex) => (
                    <ContributionDay
                      key={`${weekIndex}-${dayIndex}`}
                      day={day}
                      index={dayIndex}
                      getContributionColor={getContributionColor}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4 mt-4 text-sm text-gray-500 border-t border-gray-100 lg:hidden">
            <Typography variant="small" weight="regular">적음</Typography>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-100 border-gray-200 rounded-sm" />
              <div className="w-3 h-3 rounded-sm bg-emerald-200 border-emerald-300" />
              <div className="w-3 h-3 rounded-sm bg-emerald-400 border-emerald-500" />
              <div className="w-3 h-3 rounded-sm bg-emerald-600 border-emerald-700" />
              <div className="w-3 h-3 rounded-sm bg-emerald-800 border-emerald-900" />
            </div>
            <Typography variant="small" weight="regular">많음</Typography>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default ContributionGraph;
