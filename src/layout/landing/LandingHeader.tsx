import { Link } from "react-router-dom";
import Logo from "@components/brand/Logo";
import { Button } from "@/components/ui/button";
export default function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/landing"
          className="shrink-0 transition-opacity hover:opacity-85"
          aria-label="알고고 소개 홈"
        >
          <Logo size="sm" />
        </Link>
        <nav aria-label="시작 메뉴" className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">로그인</Link>
          </Button>
          <Button size="sm" className="rounded-full px-4 sm:px-5" asChild>
            <Link to="/signup">시작하기</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
