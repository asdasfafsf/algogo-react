import { Link } from "react-router-dom";
import { LogoWithText } from "@components/common";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <LogoWithText size="small" />
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            외부 저지 사이트의 문제를 한곳에서 탐색하고, 에디터와 실행 환경에서
            바로 풀어보세요.
          </p>
        </div>
        <nav
          aria-label="하단 메뉴"
          className="flex items-start gap-6 text-sm text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-foreground">
            전체 문제
          </Link>
          <Link
            to="/problem/today"
            className="transition-colors hover:text-foreground"
          >
            오늘의 문제
          </Link>
          <Link to="/me" className="transition-colors hover:text-foreground">
            내 계정
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/70">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} AlgoGo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
