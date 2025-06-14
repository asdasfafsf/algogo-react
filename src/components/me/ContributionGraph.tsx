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

const ContributionGraph = memo(({ data }: ContributionGraphProps) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [viewMode, setViewMode] = useState<'current' | 'yearly'>('current');

  // 날짜를 YYYY-MM-DD 형식으로 변환 (로컬 시간대 기준)
  const formatDateString = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // 현재 날짜 기준 365일 데이터 생성 (현재 날짜가 마지막)
  const getCurrentYearData = useCallback(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // 364일 전부터 시작해서 오늘까지 365일

    const currentData = [];
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = formatDateString(d);
      const existingData = data.find((item) => item.date === dateStr);
      currentData.push({
        date: dateStr,
        count: existingData ? existingData.count : Math.floor(Math.random() * 5), // 임시 랜덤 데이터
      });
    }
    return currentData;
  }, [data, formatDateString]);

  // 선택된 연도의 데이터만 필터링
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
        count: existingData ? existingData.count : Math.floor(Math.random() * 5), // 임시 랜덤 데이터
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return yearData;
  }, [data, formatDateString]);

  const displayData = useMemo(
    () => (viewMode === 'current' ? getCurrentYearData() : getYearData(selectedYear)),
    [viewMode, getCurrentYearData, getYearData, selectedYear],
  );

  // 기여도에 따른 색상 결정
  const getContributionColor = useCallback((count: number) => {
    if (count === 0) return 'bg-gray-100 border-gray-200';
    if (count === 1) return 'bg-emerald-200 border-emerald-300';
    if (count === 2) return 'bg-emerald-400 border-emerald-500';
    if (count === 3) return 'bg-emerald-600 border-emerald-700';
    return 'bg-emerald-800 border-emerald-900';
  }, []);

  // GitHub 스타일 주별 그룹화 (1월 1일 요일 기준으로 정확한 배치)
  const groupByWeeks = useCallback((contributionData: ContributionData[]) => {
    if (contributionData.length === 0) return [];

    const weeks: (ContributionData | null)[][] = [];

    if (viewMode === 'current') {
      // 현재 날짜 기준: 오늘이 마지막이 되도록
      const today = new Date();
      const startDate = new Date(contributionData[0].date);

      // 시작일의 요일 구하기 (0: 일요일, 6: 토요일)
      const startDayOfWeek = startDate.getDay();

      // 첫 번째 일요일 찾기 (시작일이 포함된 주의 일요일)
      const firstSunday = new Date(startDate);
      firstSunday.setDate(startDate.getDate() - startDayOfWeek);

      // 오늘이 포함된 주의 토요일 찾기
      const todayDayOfWeek = today.getDay();
      const lastSaturday = new Date(today);
      lastSaturday.setDate(today.getDate() + (6 - todayDayOfWeek));

      // 주별로 그룹화
      const currentDate = new Date(firstSunday);
      while (currentDate <= lastSaturday) {
        const week: (ContributionData | null)[] = [];

        for (let i = 0; i < 7; i += 1) {
          const dateStr = formatDateString(currentDate);
          const dayData = contributionData.find((item) => item.date === dateStr);

          if (dayData) {
            week.push(dayData);
          } else {
            // 데이터 범위 밖의 날짜는 null로 처리
            week.push(null);
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        weeks.push(week);
      }
    } else {
      // 연도별: 1월 1일부터 12월 31일까지만 표시
      const year = selectedYear;
      const jan1 = new Date(year, 0, 1); // 1월 1일
      const jan1DayOfWeek = jan1.getDay(); // 1월 1일의 요일

      // 1월 1일이 포함된 주의 일요일 찾기 (단, 해당 연도 내에서만)
      const firstSunday = new Date(jan1);
      if (jan1DayOfWeek === 0) {
        // 1월 1일이 일요일인 경우 그대로 사용
        firstSunday.setDate(1);
      } else {
        // 1월 1일 이후 첫 번째 일요일 찾기
        firstSunday.setDate(1 + (7 - jan1DayOfWeek));
      }

      // 12월 31일이 포함된 주의 토요일 찾기
      const dec31 = new Date(year, 11, 31);
      const dec31DayOfWeek = dec31.getDay();
      const lastSaturday = new Date(dec31);
      lastSaturday.setDate(dec31.getDate() + (6 - dec31DayOfWeek));

      // 1월 1일부터 시작하는 주별 그룹화
      const currentDate = new Date(year, 0, 1); // 1월 1일부터 시작

      // 첫 번째 주 처리 (1월 1일이 일요일이 아닌 경우 앞부분은 null)
      let week: (ContributionData | null)[] = [];

      // 1월 1일 이전 요일들을 null로 채우기
      for (let i = 0; i < jan1DayOfWeek; i += 1) {
        week.push(null);
      }

      // 실제 날짜 데이터 추가
      while (currentDate.getFullYear() === year) {
        const dateStr = formatDateString(currentDate);
        const dayData = contributionData.find((item) => item.date === dateStr);
        week.push(dayData || null);

        // 주가 완성되면 weeks에 추가하고 새로운 주 시작
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      // 마지막 주가 7개 미만이면 null로 채우기
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

  // 월 라벨 위치 계산 (각 월의 1일 위치를 정확히 계산)
  const getMonthPositions = useCallback((): Array<{ weekIndex: number; monthName: string }> => {
    if (weeks.length === 0) return [];

    const positions: Array<{ weekIndex: number; monthName: string }> = [];

    if (viewMode === 'current') {
      // 현재 날짜 기준: 실제 데이터에서 월 변경 지점 찾기
      let currentMonth = -1;

      weeks.forEach((week, weekIndex) => {
        const firstValidDay = week.find((day) => day !== null);
        if (firstValidDay) {
          const date = new Date(firstValidDay.date);
          const month = date.getMonth();

          if (month !== currentMonth) {
            currentMonth = month;
            const monthName = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'][month];

            positions.push({
              weekIndex,
              monthName,
            });
          }
        }
      });
    } else {
      // 연도별: 실제 weeks 구조에서 월 변경 지점 찾기
      let currentMonth = -1;

      weeks.forEach((week, weekIndex) => {
        const firstValidDay = week.find((day) => day !== null);
        if (firstValidDay) {
          const date = new Date(firstValidDay.date);
          const month = date.getMonth();

          if (month !== currentMonth) {
            currentMonth = month;
            const monthName = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'][month];

            positions.push({
              weekIndex,
              monthName,
            });
          }
        }
      });
    }

    return positions;
  }, [weeks, viewMode, selectedYear]);

  const monthPositions = useMemo(() => getMonthPositions(), [getMonthPositions]);

  // 요일 라벨 (한글로 통일)
  const dayLabels = useMemo(() => ['일', '월', '화', '수', '목', '금', '토'], []);

  // 이전/다음 연도 이동
  const handlePreviousYear = useCallback(() => {
    setSelectedYear((prev) => prev - 1);
  }, []);

  const handleNextYear = useCallback(() => {
    setSelectedYear((prev) => prev + 1);
  }, []);

  // 사용 가능한 연도 범위 (예: 2020년부터 현재까지)
  const minYear = useMemo(() => 2020, []);
  const maxYear = useMemo(() => currentYear, [currentYear]);

  // 통계 계산
  const stats = useMemo(() => ({
    activeDays: displayData.filter((d) => d.count > 0).length,
    maxDaily: displayData.length > 0 ? Math.max(...displayData.map((d) => d.count)) : 0,
    activityRate: displayData.length > 0
      ? Math.round((displayData.filter((d) => d.count > 0).length / displayData.length) * 100)
      : 0,
  }), [displayData]);

  return (
    <Card className="overflow-hidden transition-all duration-300 border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* 헤더 */}
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

          {/* 컨트롤 영역 */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* 보기 모드 선택 */}
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
              {/* 연도 선택 (연도별 모드일 때만 표시) */}
              {viewMode === 'yearly' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousYear}
                    disabled={selectedYear <= minYear}
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
                    disabled={selectedYear >= maxYear}
                    className="p-2 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}

              {/* 범례 */}
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

        {/* 잔디 그래프 */}
        <div className="p-4 overflow-x-auto bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-6">
          {/* 월 라벨 */}
          <div className="flex gap-1 mb-2 ml-12 w-[1050px]">
            {weeks.map((week, weekIndex) => {
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
            {/* 요일 라벨 */}
            <div className="flex flex-col gap-1 mr-2">
              {dayLabels.map((day, index) => (
                <div key={index} className="flex items-center h-3 sm:h-4">
                  <Typography variant="small" weight="regular" className="w-6 text-xs text-center text-gray-500 sm:w-8">
                    {day}
                  </Typography>
                </div>
              ))}
            </div>

            {/* 잔디 그리드 */}
            <div className="flex justify-center flex-1 gap-1 overflow-visible">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1 overflow-visible">
                  {week.map((day, dayIndex) => (
                    <Tooltip
                      key={day ? day.date : `empty-${weekIndex}-${dayIndex}`}
                      content={day ? `${new Date(day.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })} - ${day.count}개 활동` : ''}
                      placement="top"
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm border transition-all duration-200 hover:scale-110 hover:shadow-sm ${
                          day
                            ? `cursor-pointer ${getContributionColor(day.count)}`
                            : 'bg-transparent border-transparent'
                        }`}
                      />
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 모바일 범례 */}
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

        {/* 통계 정보 */}
        <div className="flex flex-col items-start justify-between gap-6 mt-6 sm:mt-8 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="text-center">
              <Typography variant="h3" weight="bold" className="mb-1 text-blue-600">
                {stats.activeDays}
              </Typography>
              <Typography variant="small" weight="regular" className="text-gray-500">
                활동한 날
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" weight="bold" className="mb-1 text-purple-600">
                {stats.maxDaily}
              </Typography>
              <Typography variant="small" weight="regular" className="text-gray-500">
                최대 일일 해결
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" weight="bold" className="mb-1 text-emerald-600">
                {stats.activityRate}
                %
              </Typography>
              <Typography variant="small" weight="regular" className="text-gray-500">
                활동률
              </Typography>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <Typography variant="medium" weight="regular" className="text-gray-600">
              {viewMode === 'current'
                ? '꾸준한 활동으로 실력을 키워나가고 있어요! 🔥'
                : selectedYear === currentYear
                  ? '꾸준한 활동으로 실력을 키워나가고 있어요! 🔥'
                  : `${selectedYear}년의 활동 기록입니다 📊`}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default memo(ContributionGraph);
