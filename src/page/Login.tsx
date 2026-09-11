import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@components/brand/Logo";
import { Button } from "@components/ui/button";
import { createPreservedAuthSearch } from "@/domain/account/authDestination";
import { createOAuthEntryUrl } from "@/domain/account/oauth";

const { VITE_ENV } = import.meta.env;

type AuthMode = "login" | "signup";
type AuthProvider = "google" | "kakao";

interface LoginProps {
  mode?: AuthMode;
}

export default function Login({ mode = "login" }: LoginProps) {
  const location = useLocation();
  const destination =
    new URLSearchParams(location.search).get("destination") ?? "";
  const [pendingProvider, setPendingProvider] = useState<AuthProvider | null>(
    null,
  );
  const isSignup = mode === "signup";
  const preservedSearch = createPreservedAuthSearch(destination);

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
    <main className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-12">
        <header>
          <Link
            to="/"
            aria-label="알고고 홈"
            className="inline-flex rounded-md p-1 text-primary transition-colors hover:bg-accent active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Logo size="sm" />
          </Link>
        </header>

        <section className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12 sm:py-16">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              {isSignup ? "회원가입" : "로그인"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Google 또는 Kakao 계정으로 {isSignup ? "회원가입" : "로그인"}
              하세요.
            </p>
          </div>

          <nav
            className="mt-8 grid grid-cols-2 border-b border-border"
            aria-label="인증 화면"
          >
            <Link
              to={`/login${preservedSearch}`}
              aria-current={isSignup ? undefined : "page"}
              className={`-mb-px flex min-h-11 items-center justify-center border-b-2 px-3 text-sm font-semibold transition-colors hover:text-foreground active:bg-muted focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSignup
                  ? "border-transparent text-muted-foreground hover:border-border"
                  : "border-primary text-foreground"
              }`}
            >
              로그인
            </Link>
            <Link
              to={`/signup${preservedSearch}`}
              aria-current={isSignup ? "page" : undefined}
              className={`-mb-px flex min-h-11 items-center justify-center border-b-2 px-3 text-sm font-semibold transition-colors hover:text-foreground active:bg-muted focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSignup
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border"
              }`}
            >
              회원가입
            </Link>
          </nav>

          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full gap-3 active:bg-accent/80"
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
              className="h-12 w-full gap-3 bg-[#FEE500] text-black hover:bg-[#FEE500]/90 hover:text-black active:bg-[#FEE500]/80"
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
        </section>
      </div>
    </main>
  );
}
