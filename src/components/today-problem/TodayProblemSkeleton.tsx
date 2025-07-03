import { memo } from 'react';
import { FadeInSection } from '@components/common/FadeInSection';
import { Card } from '@components/Card';

const NavigationTabsSkeleton = memo(() => (
  <FadeInSection className="px-6 mt-8 mb-12">
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border-2 border-slate-200 bg-white animate-pulse"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="w-12 h-3 bg-slate-200 rounded" />
                <div className="w-8 h-4 bg-slate-200 rounded-full" />
              </div>
              <div className="space-y-1">
                <div className="w-full h-4 bg-slate-200 rounded" />
                <div className="w-3/4 h-4 bg-slate-200 rounded" />
              </div>
              <div className="w-16 h-3 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </FadeInSection>
));
NavigationTabsSkeleton.displayName = 'NavigationTabsSkeleton';

const ProblemCardSkeleton = memo(() => (
  <FadeInSection className="px-6 mb-12">
    <div className="mx-auto max-w-4xl">
      <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl animate-pulse">
        <div className="p-8">
          {/* 헤더 부분 */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex gap-2 items-center mb-3">
                <div className="w-16 h-6 bg-slate-200 rounded-full" />
                <div className="w-12 h-4 bg-slate-200 rounded" />
                <div className="w-12 h-6 bg-slate-200 rounded-full" />
                <div className="w-16 h-6 bg-slate-200 rounded-full" />
              </div>
              <div className="w-3/4 h-8 bg-slate-200 rounded mb-3" />
            </div>
            <div className="flex flex-col gap-2 items-center ml-6">
              <div className="w-12 h-12 bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* 통계 카드들 */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-3 items-center p-4 bg-slate-100 rounded-xl">
                <div className="w-8 h-8 bg-slate-200 rounded-full" />
                <div className="flex-1">
                  <div className="w-16 h-4 bg-slate-200 rounded mb-1" />
                  <div className="w-12 h-6 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* 버튼들 */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 h-12 bg-slate-200 rounded-lg" />
            <div className="sm:w-32 h-12 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </Card>
    </div>
  </FadeInSection>
));
ProblemCardSkeleton.displayName = 'ProblemCardSkeleton';

const DotsSkeleton = memo(() => (
  <div className="px-6 mb-20">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
));
DotsSkeleton.displayName = 'DotsSkeleton';

export const TodayProblemSkeleton = memo(() => (
  <div className="min-h-screen bg-white">
    {/* 헤더는 실제 헤더를 보여주되, totalProblems만 0으로 */}
    <div className="relative px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/60 to-purple-50/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full shadow-sm bg-white/80 backdrop-blur-sm border-slate-200/50">
          <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-slate-200 rounded animate-pulse" />
          <div className="w-32 h-4 bg-slate-200 rounded animate-pulse" />
          <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse" />
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl text-slate-900">
            오늘의 문제
          </h1>
          <div className="w-20 h-1 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <p className="text-slate-500 text-sm">
            매일 UTC 기준 자정에 새로운 문제로 갱신됩니다
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex items-center gap-3 px-6 py-3 border shadow-sm bg-white/90 backdrop-blur-sm rounded-xl border-slate-200/50">
            <div className="w-8 h-8 bg-blue-100 rounded-lg" />
            <div className="text-left">
              <div className="text-xs font-medium tracking-wide uppercase text-slate-500 mb-1">
                새로운 문제까지
              </div>
              <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 border shadow-sm bg-white/90 backdrop-blur-sm rounded-xl border-slate-200/50">
            <div className="w-8 h-8 bg-purple-100 rounded-lg animate-pulse" />
            <div className="text-left">
              <div className="text-xs font-medium tracking-wide uppercase text-slate-500 mb-1">
                총 문제 수
              </div>
              <div className="w-20 h-4 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <NavigationTabsSkeleton />

    <div className="relative">
      {/* 네비게이션 버튼들 */}
      <div className="absolute z-10 w-10 h-10 bg-slate-200 rounded-full left-4 top-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute z-10 w-10 h-10 bg-slate-200 rounded-full right-4 top-1/2 -translate-y-1/2 animate-pulse" />

      <ProblemCardSkeleton />
    </div>

    <DotsSkeleton />
  </div>
));

TodayProblemSkeleton.displayName = 'TodayProblemSkeleton';
