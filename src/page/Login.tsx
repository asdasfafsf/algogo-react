import { useState } from "react";
import { BookOpen, Code2, Loader2, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@components/brand/Logo";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@components/ui/card";
import { createOAuthEntryUrl } from "@/domain/account/oauth";

const { VITE_ENV } = import.meta.env;

type AuthMode = "login" | "signup";
type AuthProvider = "google" | "kakao";

interface LoginProps {
  mode?: AuthMode;
}

const featureItems = [
  {
    icon: BookOpen,
    title: "나에게 맞는 문제 탐색",
    description: "난이도와 유형을 살펴보고 다음 문제를 선택하세요.",
  },
  {
    icon: Code2,
    title: "브라우저에서 바로 풀이",
    description: "코드를 작성하고 실행 결과를 한 화면에서 확인하세요.",
  },
  {
    icon: Users,
    title: "꾸준한 알고리즘 학습",
    description: "오늘의 문제와 함께 학습 흐름을 이어가세요.",
  },
] as const;

export default function Login({ mode = "login" }: LoginProps) {
  const location = useLocation();
  const destination =
    new URLSearchParams(location.search).get("destination") ?? "";
  const [pendingProvider, setPendingProvider] = useState<AuthProvider | null>(
    null,
  );
  const isSignup = mode === "signup";
  const preservedSearch = destination
    ? `?destination=${encodeURIComponent(destination)}`
    : "";

  const handleOAuth = (provider: AuthProvider) => {
    if (pendingProvider) return;

    setPendingProvider(provider);
    window.location.assign(
      createOAuthEntryUrl({
        environment: VITE_ENV,
        provider,
        destination: encodeURIComponent(destination),
      }),
    );
  };

  return (
    <main className="flex min-h-dvh bg-background">
      <aside className="relative hidden w-[45%] overflow-hidden bg-[#101a2d] p-12 text-primary-foreground md:flex md:flex-col md:justify-between">
        <div
          className="absolute inset-0 overflow-hidden opacity-20"
          aria-hidden="true"
        >
          <div className="absolute left-[10%] top-[15%] size-32 rounded-full bg-white/30 blur-sm" />
          <div className="absolute right-[15%] top-[40%] size-24 rotate-12 rounded-2xl bg-white/20" />
          <div className="absolute bottom-[20%] left-[20%] size-28 rounded-full bg-white/25 blur-sm" />
          <div className="absolute bottom-[15%] right-[10%] size-20 -rotate-12 rounded-2xl bg-white/30" />
        </div>

        <div className="relative z-10 space-y-8">
          <Link to="/" aria-label="알고고 홈" className="inline-flex">
            <Logo size="md" className="text-white" />
          </Link>
          <p className="max-w-sm font-display text-3xl font-semibold leading-tight text-white/95">
            알고리즘의 새로운 흐름
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          {featureItems.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Icon className="size-6 text-white" />
              </div>
              <div>
                <h2 className="mb-1 font-display text-lg font-semibold text-white">
                  {title}
                </h2>
                <p className="text-sm leading-relaxed text-white/80">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="relative z-10 text-sm text-white/60">© 2026 Algogo</p>
      </aside>

      <section className="relative flex flex-1 items-center justify-center p-6 md:w-[55%] md:p-12">
        <Link
          to="/"
          aria-label="알고고 홈"
          className="absolute left-6 top-6 md:hidden"
        >
          <Logo size="sm" className="text-primary" />
        </Link>

        <Card className="w-full max-w-md border-border/60 shadow-lg">
          <CardHeader className="space-y-2 pb-6 text-center">
            <h1 className="font-display text-2xl font-semibold">시작하기</h1>
            <CardDescription>
              {isSignup
                ? "간편하게 계정을 만들고 학습을 시작하세요."
                : "다시 만나 반가워요. 이어서 문제를 풀어보세요."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="grid grid-cols-2 rounded-lg bg-muted p-1"
              aria-label="인증 방식"
            >
              <Button
                asChild
                variant="ghost"
                className={
                  isSignup ? "text-muted-foreground" : "bg-background shadow-sm"
                }
              >
                <Link to={`/login${preservedSearch}`}>로그인</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className={
                  isSignup ? "bg-background shadow-sm" : "text-muted-foreground"
                }
              >
                <Link to={`/signup${preservedSearch}`}>회원가입</Link>
              </Button>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full gap-3"
                disabled={pendingProvider !== null}
                onClick={() => handleOAuth("google")}
              >
                {pendingProvider === "google" ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <img src="/google-mark.png" alt="" className="size-5" />
                )}
                {pendingProvider === "google"
                  ? "Google로 이동 중..."
                  : `Google로 ${isSignup ? "가입" : "계속"}하기`}
              </Button>
              <Button
                size="lg"
                className="h-12 w-full gap-3 bg-[#FEE500] text-black hover:bg-[#FEE500]/90 hover:text-black"
                disabled={pendingProvider !== null}
                onClick={() => handleOAuth("kakao")}
              >
                {pendingProvider === "kakao" ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <img src="/kakao_icon.png" alt="" className="size-5" />
                )}
                {pendingProvider === "kakao"
                  ? "Kakao로 이동 중..."
                  : `Kakao로 ${isSignup ? "가입" : "계속"}하기`}
              </Button>
            </div>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Google 또는 Kakao 계정으로 안전하게 시작할 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
