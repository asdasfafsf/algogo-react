import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Play,
  Layers,
  Check,
  Puzzle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useAlertModal from "@hook/useAlertModal";
import { LandingFooter, LandingHeader } from "@layout/landing";
const features = [
  {
    icon: Code2,
    title: "실시간 코드 실행",
    description:
      "개발 환경을 준비할 필요 없이, 문제 옆에서 바로 코드를 작성하고 실행하세요.",
  },
  {
    icon: Puzzle,
    title: "편리한 문제 풀이",
    description:
      "문제, 코드, 테스트 케이스를 한 화면에서 확인하고 다음 풀이에 집중하세요.",
  },
  {
    icon: Zap,
    title: "나만의 코드 템플릿",
    description:
      "자주 쓰는 코드를 저장하고 언어별 템플릿으로 빠르게 시작하세요.",
  },
];
export default function Landing() {
  const [alert] = useAlertModal();
  return (
    <>
      <LandingHeader />
      <main className="pt-16">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-6 text-blue-700">
              코딩 테스트를 위한 나만의 작업 공간
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.2] tracking-tight sm:text-6xl">
              생각은 깊게.
              <br />
              <span className="text-blue-600">시작은 가볍게.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
              알고고와 함께 문제를 찾고, 코드를 작성하고, 테스트하세요. 준비하는
              시간은 줄이고 풀이에 집중하세요.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/signup">
                  지금 시작하기
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => void alert("현재 준비중입니다")}
              >
                확장 프로그램 받기
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden border-slate-800 bg-slate-950 text-slate-100 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Code2 className="size-4 text-blue-400" />
                나의 풀이 공간
              </span>
              <Badge
                variant="outline"
                className="border-white/20 text-slate-300"
              >
                C++
              </Badge>
            </div>
            <CardContent className="p-6 sm:p-8">
              <p className="mb-6 text-lg font-semibold">
                작은 풀이가 쌓여, 실력이 됩니다.
              </p>
              <div className="rounded-lg bg-white/5 p-5 font-mono text-sm leading-8">
                <span className="text-blue-300">while</span> (learning) {"{"}
                <br />
                <span className="pl-6 text-slate-400">think();</span>
                <br />
                <span className="pl-6 text-slate-200">solve();</span>
                <br />
                <span className="pl-6 text-emerald-300">grow();</span>
                <br />
                {"}"}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-slate-400">
                  <Check className="size-4 text-emerald-400" />한 번의 도전, 한
                  걸음의 성장
                </span>
                <Play className="size-4 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <p className="mb-3 text-xs font-semibold tracking-widest text-blue-600">
              BUILT FOR YOUR FLOW
            </p>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight">
              풀이에 필요한 것만, 한곳에.
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="shadow-none">
                  <CardHeader>
                    <Icon className="mb-5 size-6 text-blue-600" />
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription className="pt-2 leading-7">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border bg-background p-8 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Layers className="size-4" />
                백준 Online Judge 지원
              </div>
              <h2 className="text-2xl font-semibold">
                다음 문제, 여기서 시작해보세요.
              </h2>
            </div>
            <Button size="lg" asChild>
              <Link to="/problem">
                문제 둘러보기
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
