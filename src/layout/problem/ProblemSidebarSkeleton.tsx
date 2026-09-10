export default function ProblemSidebarSkeleton() {
  return (
    <aside
      className="relative z-10 flex h-full bg-background sm:w-screen"
      style={{
        width: "100%",
        gridRow: "span 2",
        gridColumn: 1,
      }}
    >
      <div className="w-full px-5 py-8 space-y-4 overflow-y-auto">
        {/* 제목 스켈레톤 */}
        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />

        {/* 제출, 정답, 맞힌 사람 등 스켈레톤 */}
        <div className="flex flex-wrap items-center gap-1">
          <div className="h-6 w-20 animate-pulse rounded bg-muted" />
          <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
        </div>

        {/* 카테고리 스켈레톤 */}
        <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />

        {/* 내용 스켈레톤 */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-muted" />
        </div>

        {/* 입력 스켈레톤 */}
        <div>
          <div className="mb-2 h-5 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>

        {/* 출력 스켈레톤 */}
        <div>
          <div className="mb-2 h-5 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>

        {/* 예시 스켈레톤 */}
        <div>
          <div className="mb-2 h-5 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted" />
        </div>

        {/* 출처 스켈레톤 */}
        <div>
          <div className="h-5 w-20 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* 사이드바 드래그 핸들 */}
      <div className="absolute -right-2.5 z-10 h-full w-5 cursor-col-resize" />
    </aside>
  );
}
