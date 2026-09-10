import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Code2, Search, Tags } from "lucide-react";
import { Button } from "@components/ui/button";
import { LandingFooter, LandingHeader } from "@layout/landing";
import { cn } from "@lib/utils";

const STEPS = [
  {
    number: "01",
    title: "탐색",
    description: "문제 목록에서 제목, 난이도, 유형과 풀이 상태를 살펴보세요.",
  },
  {
    number: "02",
    title: "풀이",
    description:
      "브라우저 에디터에서 코드를 작성하고 테스트 케이스를 실행하세요.",
  },
  {
    number: "03",
    title: "성장",
    description: "풀이 기록과 오늘의 문제를 바탕으로 다음 도전을 이어가세요.",
  },
] as const;

const FEATURES = [
  {
    icon: Tags,
    title: "한곳에서 찾는 문제",
    description:
      "외부 저지의 문제를 난이도와 알고리즘 유형으로 좁혀 필요한 문제를 빠르게 찾습니다.",
  },
  {
    icon: Code2,
    title: "브라우저 코드 에디터",
    description:
      "별도 환경을 준비하지 않고 문제 옆에서 코드를 작성하고 실행 결과를 확인합니다.",
  },
  {
    icon: BarChart3,
    title: "이어지는 풀이 기록",
    description:
      "맞힌 문제와 시도한 문제를 구분하고, 오늘의 문제로 꾸준한 풀이 흐름을 만듭니다.",
  },
] as const;

function HeroCodePreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950 text-slate-100 shadow-2xl shadow-slate-950/20">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <span className="ml-2 font-mono text-xs text-white/40">
          editor preview
        </span>
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-white/90">
            최장 증가 부분 수열 <span className="text-white/35">· 예시</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-tier-diamond/25 bg-tier-diamond/15 px-2 py-0.5 font-medium text-tier-diamond">
              예시 난이도
            </span>
            <span className="text-white/40">다이나믹 프로그래밍</span>
          </div>
        </div>
        <div className="space-y-1 rounded-lg bg-white/5 p-4 font-mono text-[13px] leading-relaxed">
          <p>
            <span className="mr-4 select-none text-white/20">1</span>
            <span className="text-blue-300">function</span>{" "}
            <span className="text-violet-300">lis</span>
            <span className="text-white/50">(arr) {"{"}</span>
          </p>
          <p>
            <span className="mr-4 select-none text-white/20">2</span>
            <span className="text-white/30">{"  "}</span>
            <span className="text-blue-300">const</span>{" "}
            <span className="text-white/60">dp</span>{" "}
            <span className="text-white/40">=</span>{" "}
            <span className="text-orange-300">Array</span>
            <span className="text-white/50">(arr.length).fill(1)</span>
          </p>
          <p>
            <span className="mr-4 select-none text-white/20">3</span>
            <span className="text-white/30">{"  "}</span>
            <span className="text-blue-300">for</span>{" "}
            <span className="text-white/50">
              (let i = 1; i &lt; arr.length; i++)
            </span>
          </p>
          <p>
            <span className="mr-4 select-none text-white/20">4</span>
            <span className="text-white/25">{"    // 풀이를 이어가세요"}</span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 pt-1 text-xs">
          <span className="text-white/30">에디터에서 바로 실행</span>
          <span className="font-medium text-white/40">샘플 화면</span>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-48 size-[34rem] rounded-full bg-primary/5 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="animate-fadeIn">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            알고리즘 학습 플랫폼
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.14] tracking-tight sm:text-5xl lg:text-6xl">
            문제를 풀며
            <br />
            성장하는 가장
            <br />
            확실한 방법
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
            문제를 찾고, 코드를 작성하고, 실행하세요. 준비하는 시간은 줄이고
            풀이에 집중할 수 있는 공간을 제공합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 font-semibold shadow-sm transition-shadow hover:shadow-md"
            >
              <Link to="/signup">
                무료로 시작하기
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full px-8 font-semibold"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              자세히 알아보기
            </Button>
          </div>
          <div className="mt-10 lg:hidden" aria-hidden>
            <HeroCodePreview />
          </div>
        </div>
        <div className="hidden animate-fadeIn lg:block" aria-hidden>
          <HeroCodePreview />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-y border-border/60 bg-muted/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.16em] text-primary">
            BUILT FOR YOUR FLOW
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            풀이에 필요한 흐름을 한곳에
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className={cn(
                "rounded-xl border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1",
                index === 1 ? "border-primary/25" : "border-border/50",
              )}
            >
              <div className="mb-5 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon aria-hidden className="size-5" />
              </div>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-primary">
          <Search aria-hidden className="size-5" />
          <p className="text-sm font-semibold tracking-[0.14em]">
            HOW IT WORKS
          </p>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          시작은 간단합니다
        </h2>
        <div className="mt-10 max-w-2xl">
          {STEPS.map((step, index) => (
            <article
              key={step.number}
              className={cn(
                "flex items-start gap-5 py-7 sm:gap-8",
                index < STEPS.length - 1 && "border-b border-border/50",
              )}
            >
              <span
                aria-hidden
                className="w-14 shrink-0 text-4xl font-bold leading-none text-primary/15 sm:w-20 sm:text-5xl"
              >
                {step.number}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 max-w-md text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(59,130,246,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          오늘의 한 문제부터 시작하세요
        </h2>
        <p className="mt-4 text-base text-white/60">
          가입하고 첫 번째 문제를 나만의 에디터에서 풀어보세요.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 rounded-full bg-white px-8 font-semibold text-slate-950 shadow-lg shadow-white/10 hover:bg-white/90"
        >
          <Link to="/signup">
            무료로 시작하기
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <LandingHeader />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
