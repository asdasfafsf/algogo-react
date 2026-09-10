import { useState } from "react";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@components/brand/Logo";
import { ProfileMenu } from "@components/Dropdown";
import ThemeToggle from "@components/ThemeToggle";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import useMeStore from "@zustand/MeStore";

const problemItems = [
  {
    title: "모든 문제",
    href: "/",
    description: "전체 알고리즘 문제 목록을 탐색합니다.",
  },
  {
    title: "오늘의 문제",
    href: "/problem/today",
    description: "매일 엄선된 새로운 문제에 도전하세요.",
  },
  {
    title: "유형별 문제",
    description: "자료구조 및 알고리즘 유형별로 학습합니다.",
    disabled: true,
  },
] as const;

const preparedItems = ["대회", "랭킹", "커뮤니티"] as const;

function PreparedNavItem({ label }: { label: string }) {
  return (
    <span
      aria-disabled="true"
      aria-label={`${label}, 준비중`}
      title="준비중"
      className="inline-flex h-9 cursor-not-allowed items-center rounded-md px-4 text-sm font-medium text-muted-foreground"
    >
      {label}
      <span className="sr-only"> 준비중</span>
    </span>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const me = useMeStore((state) => state.me);
  const logout = useMeStore((state) => state.logout);
  const [open, setOpen] = useState(false);

  const navigateAndClose = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label="알고고 홈"
        >
          <Logo
            size="sm"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav
          aria-label="주 메뉴"
          className="hidden flex-1 justify-center md:flex"
        >
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 gap-1 bg-transparent px-4 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground"
                >
                  문제
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[600px] p-4">
                <div className="grid grid-cols-2 gap-3">
                  {problemItems.map((item) =>
                    "disabled" in item ? (
                      <div
                        key={item.title}
                        aria-disabled="true"
                        className="space-y-1 rounded-lg p-3 opacity-50"
                      >
                        <div className="text-sm font-medium">
                          {item.title}
                          <span className="sr-only"> 준비중</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-snug text-muted-foreground/80">
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <DropdownMenuItem key={item.title} asChild>
                        <Link
                          to={item.href}
                          className="flex cursor-pointer flex-col items-start rounded-lg p-3 focus:bg-accent/50"
                        >
                          <div className="text-sm font-medium">
                            {item.title}
                          </div>
                          <p className="mt-1.5 text-sm leading-snug text-muted-foreground/80">
                            {item.description}
                          </p>
                        </Link>
                      </DropdownMenuItem>
                    ),
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {preparedItems.map((item) => (
              <PreparedNavItem key={item} label={item} />
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {me ? (
            <ProfileMenu me={me} />
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/login")}
              >
                로그인
              </Button>
              <Button
                size="sm"
                className="rounded-full px-6 font-semibold shadow-sm transition-shadow hover:shadow-md"
                onClick={() => navigate("/signup")}
              >
                시작하기
              </Button>
            </>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[300px] flex-col p-0">
              <div className="border-b p-6">
                <SheetHeader className="text-left">
                  <SheetTitle>
                    <Logo size="sm" />
                  </SheetTitle>
                </SheetHeader>
              </div>
              <nav
                aria-label="모바일 메뉴"
                className="flex-1 overflow-y-auto px-6 py-4"
              >
                <details className="border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-medium [&::-webkit-details-marker]:hidden">
                    문제
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </summary>
                  <div className="flex flex-col gap-1 pb-4 pl-4">
                    {problemItems.map((item) =>
                      "disabled" in item ? (
                        <span
                          key={item.title}
                          aria-disabled="true"
                          className="flex items-center justify-between rounded-md py-2 text-sm text-muted-foreground opacity-50"
                        >
                          {item.title}
                          <span className="text-xs">준비중</span>
                        </span>
                      ) : (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => navigateAndClose(item.href)}
                          className="flex items-center justify-between rounded-md py-2 text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {item.title}
                          <ChevronRight className="size-4" />
                        </button>
                      ),
                    )}
                  </div>
                </details>
                {preparedItems.map((item) => (
                  <div
                    key={item}
                    aria-disabled="true"
                    className="flex items-center justify-between border-b py-4 text-base font-medium text-muted-foreground"
                  >
                    {item}
                    <span className="text-xs font-normal">준비중</span>
                  </div>
                ))}
              </nav>
              <div className="mt-auto border-t bg-muted/30 p-6">
                {me ? (
                  <div className="grid gap-3">
                    <Button
                      variant="outline"
                      onClick={() => navigateAndClose("/me")}
                    >
                      마이페이지
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                    >
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigateAndClose("/login")}
                      >
                        로그인
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => navigateAndClose("/signup")}
                      >
                        시작하기
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
