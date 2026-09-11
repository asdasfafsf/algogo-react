import { Link } from "react-router-dom";
import Logo from "@components/brand/Logo";

function UpcomingItem({ children }: { children: string }) {
  return (
    <span className="text-muted-foreground" aria-disabled="true">
      {children}
    </span>
  );
}

export default function LandingFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="space-y-3">
            <Link
              to="/"
              className="inline-flex transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="알고고 홈"
            >
              <Logo size="sm" />
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">
              여러 온라인 저지의 문제를 한 곳에서 찾아 풀어보세요.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:pt-1">
            <Link
              to="/problem"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary/65"
            >
              문제 목록
            </Link>
            <Link
              to="/problem/today"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary/65"
            >
              오늘의 문제
            </Link>
            <UpcomingItem>대회 · 곧 열려요</UpcomingItem>
            <UpcomingItem>랭킹 · 곧 열려요</UpcomingItem>
          </div>
        </div>
        <p className="mt-10 border-t border-border/70 pt-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Algogo
        </p>
      </div>
    </footer>
  );
}
