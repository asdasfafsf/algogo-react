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
      <div className="relative z-10 flex w-full items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="mb-3 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            추천
          </span>
          <h2 className="font-billboard text-2xl font-normal leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
            백준 계정 연동 준비중
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            백준(BOJ) 계정을 연동하여 풀이 현황을 자동으로 동기화할 수 있도록
            준비하고 있습니다.
          </p>
          <span
            role="button"
            aria-disabled="true"
            className="mt-6 inline-flex cursor-not-allowed rounded-full bg-white/10 px-7 py-2.5 text-[15px] font-medium text-white/40"
          >
            준비중
          </span>
        </div>
        <div
          aria-hidden="true"
          className="relative hidden h-64 w-72 shrink-0 items-center justify-center lg:flex xl:w-96"
        >
          <div className="absolute size-48 rounded-full bg-white/[0.03] blur-[60px]" />
          <div className="absolute size-44 rounded-full border border-white/10" />
          <div className="absolute size-28 translate-x-8 -translate-y-4 rounded-full border border-white/[0.07]" />
          <div className="absolute size-3 -translate-x-16 translate-y-12 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}
