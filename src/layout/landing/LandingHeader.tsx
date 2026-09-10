import { Link } from "react-router-dom";
import { LogoWithText } from "@components/common";
import { Button } from "@/components/ui/button";
export default function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <LogoWithText size="medium" />
        <nav aria-label="시작 메뉴" className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/login">로그인</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">시작하기</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
