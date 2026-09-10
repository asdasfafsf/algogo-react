import { Card as SurfaceCard } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Typography, Tooltip } from "@components/common";
import { Card } from "@components/Card";
import { useState, useMemo, useCallback, memo } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  contributionLevel,
  createCalendarYearData,
  createRecentYearData,
  getMonthPositions,
  groupRecentDataByWeeks,
  groupYearDataByWeeks,
  type ContributionData,
} from "@/domain/account/contribution";

const contributionColors = [
  "bg-gray-100 border-gray-200",
  "bg-emerald-200 border-emerald-300",
  "bg-emerald-400 border-emerald-500",
  "bg-emerald-600 border-emerald-700",
  "bg-emerald-800 border-emerald-900",
] as const;

const getContributionColor = (count: number): string =>
  contributionColors[contributionLevel(count)];

interface ContributionGraphProps {
  data: ContributionData[];
  now?: Date;
}

const ContributionDay = memo(
  ({
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
  },
);

const ContributionGraph = memo(
  ({ data, now = new Date() }: ContributionGraphProps) => {
    const currentYear = now.getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [viewMode, setViewMode] = useState<"current" | "yearly">("current");

    const displayData = useMemo(
      () =>
        viewMode === "current"
          ? createRecentYearData(data, now)
          : createCalendarYearData(data, selectedYear),
      [viewMode, data, now, selectedYear],
    );
    const weeks = useMemo(
      () =>
        viewMode === "current"
          ? groupRecentDataByWeeks(displayData, now)
          : groupYearDataByWeeks(displayData, selectedYear),
      [displayData, now, selectedYear, viewMode],
    );

    const monthPositions = useMemo(() => getMonthPositions(weeks), [weeks]);

    const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

    const handlePrevYear = useCallback(() => {
      setSelectedYear((prev) => Math.max(2020, prev - 1));
    }, []);

    const handleNextYear = useCallback(() => {
      setSelectedYear((prev) => Math.min(currentYear, prev + 1));
    }, [currentYear]);

    return (
      <Card className="overflow-hidden transition-all duration-300 border-gray-100 bg-linear-to-br from-white to-gray-50 hover:shadow-lg">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div>
              <Typography
                variant="h4"
                weight="bold"
                className="mb-2 text-gray-900"
              >
                활동 기록
              </Typography>
              <Typography
                variant="medium"
                weight="regular"
                className="text-gray-600"
              >
                {viewMode === "current"
                  ? "최근 1년간의 문제 해결 활동을 확인해보세요"
                  : `${selectedYear}년 문제 해결 활동을 확인해보세요`}
              </Typography>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center p-1 bg-white border border-gray-200 shadow-xs rounded-xl">
                <ShadcnButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setViewMode("current")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "current"
                      ? "bg-blue-500 text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <ClockIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">최근 1년</span>
                  <span className="sm:hidden">1년</span>
                </ShadcnButton>
                <ShadcnButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setViewMode("yearly")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "yearly"
                      ? "bg-blue-500 text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">연도별</span>
                  <span className="sm:hidden">연도</span>
                </ShadcnButton>
              </div>

              <div className="flex items-center gap-4">
                {viewMode === "yearly" && (
                  <div className="flex items-center gap-2">
                    <ShadcnButton
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={handlePrevYear}
                      disabled={selectedYear <= 2020}
                      className="p-2 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                    </ShadcnButton>
                    <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-xs">
                      <Typography
                        variant="medium"
                        weight="semibold"
                        className="text-gray-900"
                      >
                        {selectedYear}년
                      </Typography>
                    </div>
                    <ShadcnButton
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={handleNextYear}
                      disabled={selectedYear >= currentYear}
                      className="p-2 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                    </ShadcnButton>
                  </div>
                )}

                <div className="items-center hidden gap-2 text-sm text-gray-500 lg:flex">
                  <Typography variant="small" weight="regular">
                    적음
                  </Typography>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-100 border-gray-200 rounded-sm" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-200 border-emerald-300" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-400 border-emerald-500" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-600 border-emerald-700" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-800 border-emerald-900" />
                  </div>
                  <Typography variant="small" weight="regular">
                    많음
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <SurfaceCard className="block gap-0 py-0 p-4 overflow-x-auto bg-white border border-gray-100 shadow-xs rounded-2xl sm:p-6">
            <div className="flex gap-1 mb-2 ml-12 w-[1050px]">
              {weeks.map((_, weekIndex) => {
                const monthPos = monthPositions.find(
                  (pos) => pos.weekIndex === weekIndex,
                );
                return (
                  <div
                    key={weekIndex}
                    className="relative w-4 h-4 overflow-visible text-xs text-center text-gray-600"
                  >
                    <Typography
                      variant="small"
                      weight="regular"
                      className="absolute top-0 text-gray-600 transform -translate-x-1/2 left-1/2 whitespace-nowrap"
                    >
                      {monthPos ? monthPos.monthName : ""}
                    </Typography>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-1">
              <div className="flex flex-col gap-1 mr-2">
                {dayLabels.map((day, index) => (
                  <div key={index} className="flex items-center h-3 sm:h-4">
                    <Typography
                      variant="small"
                      weight="regular"
                      className="w-6 text-xs text-center text-gray-500 sm:w-8"
                    >
                      {day}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="flex justify-center flex-1 gap-1 overflow-visible">
                {weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="flex flex-col gap-1 overflow-visible"
                  >
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
              <Typography variant="small" weight="regular">
                적음
              </Typography>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-100 border-gray-200 rounded-sm" />
                <div className="w-3 h-3 rounded-sm bg-emerald-200 border-emerald-300" />
                <div className="w-3 h-3 rounded-sm bg-emerald-400 border-emerald-500" />
                <div className="w-3 h-3 rounded-sm bg-emerald-600 border-emerald-700" />
                <div className="w-3 h-3 rounded-sm bg-emerald-800 border-emerald-900" />
              </div>
              <Typography variant="small" weight="regular">
                많음
              </Typography>
            </div>
          </SurfaceCard>
        </div>
      </Card>
    );
  },
);

export default ContributionGraph;
