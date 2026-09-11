export default function UpcomingSystemUpdateContent() {
  return (
    <div className="relative flex h-full items-center overflow-hidden bg-[#111827] px-8 py-12 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20 dark:bg-[#1f2937]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, hsla(208,55%,50%,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      <div className="relative z-10 max-w-2xl">
        <div>
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            계정 연동
          </span>
          <h2 className="font-billboard text-2xl font-normal leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
            백준 풀이 기록 연동
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            백준(BOJ) 계정을 연결하면 풀이 현황을 Algogo에 자동으로 동기화할 수
            있습니다.
          </p>
          <div className="mt-6 border-l border-white/25 pl-3 text-sm font-medium text-white/55">
            연동 기능 개발 예정
          </div>
        </div>
      </div>
    </div>
  );
}
