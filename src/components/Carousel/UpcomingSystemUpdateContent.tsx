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
      <div className="relative z-10 w-full max-w-3xl">
        <h2 className="max-w-2xl break-keep font-billboard text-2xl font-normal leading-[1.15] tracking-tight text-pretty text-white sm:text-3xl lg:text-4xl">
          백준 풀이 기록, 준비 중이에요
        </h2>
        <p className="mt-4 max-w-xl break-keep text-sm leading-relaxed text-pretty text-white/70 sm:text-base">
          푼 문제와 풀이 현황을 한곳에서 확인할 수 있도록 준비하고 있어요.
        </p>
      </div>
    </div>
  );
}
