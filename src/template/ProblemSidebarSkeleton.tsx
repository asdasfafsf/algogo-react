export default function ProblemSidebarSkeleton() {
  return (
    <aside
      className="relative z-30 flex bg-white sm:w-screen"
      style={{
        height: 'calc(100vh - 96px)',
        width: '100%',
        gridRow: 'span 2',
        gridColumn: 1,
      }}
    >
      <div className="w-full px-5 py-8 space-y-4 overflow-y-auto">
        {/* 제목 스켈레톤 */}
        <div className="w-3/4 h-8 bg-gray-300 rounded animate-pulse" />

        {/* 제출, 정답, 맞힌 사람 등 스켈레톤 */}
        <div className="flex flex-wrap items-center gap-1">
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-16 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-16 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-16 h-6 bg-gray-300 rounded animate-pulse" />
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* 카테고리 스켈레톤 */}
        <div className="w-1/2 h-6 bg-gray-300 rounded animate-pulse" />

        {/* 내용 스켈레톤 */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse" />
          <div className="w-11/12 h-4 bg-gray-300 rounded animate-pulse" />
          <div className="w-10/12 h-4 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* 입력 스켈레톤 */}
        <div>
          <div className="w-20 h-5 mb-2 bg-gray-300 rounded animate-pulse" />
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* 출력 스켈레톤 */}
        <div>
          <div className="w-20 h-5 mb-2 bg-gray-300 rounded animate-pulse" />
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* 예시 스켈레톤 */}
        <div>
          <div className="w-24 h-5 mb-2 bg-gray-300 rounded animate-pulse" />
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse" />
          <div className="w-full h-4 mt-2 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* 출처 스켈레톤 */}
        <div>
          <div className="w-20 h-5 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      {/* 사이드바 드래그 핸들 */}
      <div
        className="z-10 h-[calc(100vh-96px)] text-white -right-5 absolute w-5 cursor-col-resize"
      />
    </aside>
  );
}
