import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@components/ui/button";
import { LandingFooter, LandingHeader } from "@layout/landing";

const FLOW = [
  {
    number: "01",
    title: "풀 문제 찾기",
    description: "제목이나 난이도, 알고리즘 유형으로 문제를 찾아보세요.",
    href: "/problem",
    action: "문제 목록 보기",
  },
  {
    number: "02",
    title: "바로 코드 작성하기",
    description: "문제 화면에서 코드를 작성하고 예제로 실행해 볼 수 있어요.",
    href: "/problem",
    action: "문제 찾아보기",
  },
  {
    number: "03",
    title: "매일 한 문제씩",
    description: "무엇을 풀지 고민된다면 오늘의 문제부터 시작해 보세요.",
    href: "/problem/today",
    action: "오늘의 문제 보기",
  },
] as const;

function HeroSection() {
  return (
    <section className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl lg:text-6xl">
          오늘은 어떤 문제를
          <br />
          풀어 볼까요?
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
          여러 온라인 저지의 문제를 난이도와 유형별로 찾고, 브라우저에서 바로
          풀어보세요.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="cursor-pointer px-6 active:bg-primary/80"
          >
            <Link to="/problem">
              문제 둘러보기
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="cursor-pointer px-6 active:bg-accent"
          >
            <Link to="/problem/today">오늘의 문제 보기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-xl">
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            문제를 찾았다면 바로 시작하세요
          </h2>
        </div>
        <ol className="mt-10 divide-y border-y border-border/70">
          {FLOW.map(({ action, description, href, number, title }) => (
            <li
              key={number}
              className="grid gap-4 py-6 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
            >
              <span className="font-mono text-sm font-semibold text-primary/70">
                {number}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>
              <Link
                to={href}
                className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary/65"
              >
                {action}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StartSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="border-l-2 border-primary pl-5 sm:pl-6">
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            무엇을 풀지 고민되나요?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            오늘의 문제에서 한 문제를 골라 시작해 보세요. 로그인하면 풀이 기록도
            이어서 볼 수 있어요.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="cursor-pointer active:bg-primary/80">
              <Link to="/problem/today">오늘의 문제 열기</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="cursor-pointer active:bg-accent"
            >
              <Link to="/signup">계정 만들기</Link>
            </Button>
          </div>
        </div>
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
        <FlowSection />
        <StartSection />
      </main>
      <LandingFooter />
    </div>
  );
}
